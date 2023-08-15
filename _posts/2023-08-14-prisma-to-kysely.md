---
layout: post
title: Migrating from prisma to kysely (nestjs)
description: Dumping Prisma in favour of kysely
summary: Migrating from prisma orm to kysely query builder
tags: [sql, orm, postgresql, kysely, prisma, nestjs]
---

## Backstory

I recently got assigned a ticket to implement kysely sql query builder in a production app, as prisma was hitting our Pg instance way too much than it should, which is why our Pg instance is using more than 15GB ram.

Though, our usecase is very read & write heavy,
so that's why we're switching to kysely that too partially, cause a full shift to kysely will take about a month or more than that.

But never jump on the hype train, always consider your usecase first.

### Important Notes

1. if this is your first using a sql query builder\* then it will be a bit hard to digest at first, for me its been a week since i'm dealing with kysely and sql query builders in general, and please consider my advice as a grain of salt. (\* not to confuse with an orm. query builders are like sql written in a functional programming fashion which is also called a builder pattern, or method chaining.)

2. You'll be writing sql in js, and if you're like me who is well proficient in prisma but a dumbo in raw sql, than trust me its hard man, you'll be plucking eyelids hairs in no time.
   (though i'll add some handy queries at end of this post)

3. chatgpt does not know anything about kysely, but you can ask it for knex query builder & since kysely is loosely inspired from it, you can take the code from there and apply accordingly to the docs of kysely, (which are kind of incomplete tbh).

4. Be extra careful, if your data is having datetime data like createdAt and updatedAt datetime fields.

Prisma does some black magic fuckery to converts your timestamps to utc, and kysely is barebones so you need to use a lib like dayjs to convert your datetime to utc.

### Tutorial

So, start by installing [kysely](https://kysely.dev/docs/getting-started) & [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen)

kysely-codegen will inspect your existing database & generate a file with types based upon table structures in db.

Now after generating types, create a dir. inside src of server workspace and name whatever you like, i'll be using `kysely-orm` and create few files & dir:

- migrations
  - initial-migration.ts
- migrator.ts
- schema.b.ts(copy the generated types from kysely-codegen dir & paste it here.)

---

- initial-migration.ts

```typescript
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  console.log("Creatng table Order");
  await db.schema
    .createTable("Order")
    .addColumn("shop", "varchar")
    .addColumn("id", "varchar", (col) => col.primaryKey())
    .addColumn("orderId", "varchar", (col) => col.unique())
    .addColumn("orderNumber", "varchar")
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updatedAt", "timestamp")
    .addColumn("orderJSON", "json")
    .execute();

  console.log("Creatng table Refund");

  await db.schema
    .createTable("Refund")
    .addColumn("id", "varchar", (col) => col.primaryKey())
    .addColumn("refundId", "varchar", (col) => col.unique())
    .addColumn("orderId", "varchar", (col) =>
      col.references("Order.id").onDelete("cascade")
    )
    .addColumn("shop", "varchar")
    .addColumn("createdAt", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Order").execute();
  await db.schema.dropTable("Refund").execute();
}
```

---

<br>
- migrator.ts

```typescript
import { Migrator } from "kysely";

export async function migrateToLatest(migrator: Migrator) {
  const { error, results } = await migrator.migrateToLatest();

  if (results.length > 0) {
    console.log("RESULT: ", results);
  }

  if (error) {
    console.error("ERROR: ", error);
  }

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
}
```

---

<br>
- schema.b.ts

```typescript
import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;
export type JsonArray = JsonValue[];
export type JsonObject = {
  [K in string]?: JsonValue;
};
export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Order {
  id: string;
  shop: string;
  orderId: string;
  orderNumber: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  orderJSON: Json;
}

export interface Refund {
  id: string;
  orderId: string;
  shop: string;
  refundId: string;
  createdAt: Timestamp;
}

export interface DB {
  Order: Order;
  Refund: Refund;
}
```

---

<br>

- src/modules/shared/kysely.service

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { migrateToLatest } from "src/kysely-orm/migrator";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "src/kysely-orm/schema.b";
import { ConfigService } from "./config.service";

@Injectable()
export class KyselyService implements OnModuleInit {
  db: Kysely<DB>;
  dialect: PostgresDialect;

  constructor(private readonly configService: ConfigService) {
    const { dbName, user, pass, port, host } = this.configService.kyselyConfig;
    this.dialect = new PostgresDialect({
      pool: new Pool({
        database: dbName,
        host: host,
        user: user,
        password: pass,
        port: port,
        max: 10,
      }),
    });

    this.db = new Kysely<DB>({
      dialect: this.dialect,
    });
  }

  public get DB() {
    return this.db;
  }

  async onModuleInit() {
    migrateToLatest(this.db);
  }
}
```

---

<br>
### Some sample queries implemented in a order service

- src/modules/order/order.service.ts

```typescript
import { Injectable } from "@nestjs/common";
import { createId } from "@paralleldrive/cuid2";
import { Order } from "@shopify/shopify-api/rest/admin/2023-04/order";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { KyselyService } from "src/shared/services/kysely.service";

@Injectable()
export class OrderService {
  constructor(private readonly kyselyService: KyselyService) {}

  async upsertOrder(order: Order, shopName: string) {
    try {
      console.log(`Upserting record: ${order.name}`);
      const res = await this.kyselyService.db
        .insertInto("Order")
        .values({
          id: createId(),
          orderId: String(order.id),
          shop: shopName,
          orderNumber: String(order.order_number),
          createdAt: order.created_at,
          updatedAt: order.updated_at,
          orderJSON: JSON.stringify(order),
        })
        .onConflict((oc) =>
          oc.column("orderId").doUpdateSet({
            orderNumber: String(order.order_number),
            shop: shopName,
            createdAt: order.created_at,
            updatedAt: order.updated_at,
            orderJSON: JSON.stringify(order),
          })
        )
        .returning("id")
        .executeTakeFirst();

      return res.id;
    } catch (error) {
      console.error("Error upserting records: ", error);
      return false;
    }
  }

  async getRefundedOrdersByDate(
    shopName: string,
    dates: { start: Date; end: Date }
  ) {
    try {
      const results = await this.kyselyService.db
        .selectFrom("Refund")
        .selectAll("Refund")
        .where("shop", "=", shopName)
        .where("createdAt", ">=", dates.start)
        .where("createdAt", "<=", dates.end)
        .orderBy("createdAt", "asc")
        .select((eb) => [
          jsonObjectFrom(
            eb
              .selectFrom("Order")
              .selectAll("Order")
              .whereRef("Refund.orderId", "=", "Order.id")
          ).as("Order"),
        ])
        .execute();

      console.log(results);
      return results;
    } catch (error) {
      console.error("Error fetching refunded orders: ", error);
      return [];
    }
  }

  async getOrdersByDate(shopName: string, dates: { start: Date; end: Date }) {
    try {
      const results = await this.kyselyService.db
        .selectFrom("Order")
        .selectAll("Order")
        .where("shop", "=", shopName)
        .where("createdAt", ">=", dates.start)
        .where("createdAt", "<=", dates.end)
        .orderBy("createdAt", "asc")
        .execute();

      console.log(results);
      return results;
    } catch (error) {
      console.error("Error fetching orders: ", error);
      return [];
    }
  }

  async deleteOrder(shopName: string, orderId: string) {
    try {
      await this.kyselyService.db
        .deleteFrom("Order")
        .where("orderId", "=", orderId)
        .where("shop", "=", shopName)
        .execute();
      return true;
    } catch (error) {
      console.error("Error deleting order: ", error);
      return false;
    }
  }
}
```

also note we migrate on module initialization, but i suggest using kysely-migrator-cli if you want more control over migrations.
