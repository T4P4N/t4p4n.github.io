---
layout: post
tags: [ai, work, json, postgres, sql]
categories: [work, ai, json, postgres, sql]
title: "AI generates suboptimal code, most of the time!"
---

Recently I got a ticket assigned to me, a fairly detailed one actually.
So it goes like this, we have a file named hsn_gst_master_list.json

It contains data like this:

```json
[
  {
    "hsn_code": "6101",
    "description": "Articles of apparel and clothing accessories, knitted or crocheted",
    "chapter_number": "61",
    "chapter_name": "Articles of apparel and clothing accessories, knitted or crocheted",
    "type": "HSN",
    "has_value_based_rates": true,
    "tax_slabs": [
      {
        "rate": 5.0,
        "effective_date": "2017-07-01",
        "min_value": null,
        "max_value": 1000,
        "raw_description": "MEN'S OR BOYS OVERCOATS, CARCOATS, CAPES, CLOAKS, ANORAKS (INCLUDING SKIJACKETS), WIND-CHEATERS, WINDJACKETS AND SIMILAR ARTICLES, KNITTED OR CROCHETED, OTHER THAN THOSE OF HEADING 6103(sale value not exceeding Rs 1000 per piece)"
      },
      {
        "rate": 12.0,
        "effective_date": "2017-07-01",
        "min_value": 1000,
        "max_value": null,
        "raw_description": "MEN'S OR BOYS OVERCOATS, CARCOATS, CAPES, CLOAKS, ANORAKS (INCLUDING SKIJACKETS), WIND-CHEATERS, WINDJACKETS AND SIMILAR ARTICLES, KNITTED OR CROCHETED, OTHER THAN THOSE OF HEADING 6103(sale value exceeding Rs 1000 per piece)"
      },
      {
        "rate": 18.0,
        "effective_date": "2025-09-22",
        "min_value": 2500,
        "max_value": null,
        "raw_description": "MEN'S OR BOYS OVERCOATS, CARCOATS, CAPES, CLOAKS, ANORAKS (INCLUDING SKIJACKETS), WIND-CHEATERS, WINDJACKETS AND SIMILAR ARTICLES, KNITTED OR CROCHETED, OTHER THAN THOSE OF HEADING 6103(sale value exceeding Rs 2500 per piece)"
      }
    ],
    "default_rate": 5.0
  }
]
```

It is like 441k lines. Currently we are importing the file, parsing the entire file, then running a filter on it to query whatever the user searches.
In the ticket it was mentioned that I need to create a table in the db, seed this data to the table & add indexes if required, and make sure the endpoint returns performant results.

Now the data was not normalized, it contained some repeated data like description was there in the parent object as well as inside the `tax_slabs` array.
And there was a boolean (has_value_based_rates) on the parent object, which mentions if there are slabs. If it's true then the `tax_slabs` will have more than one entry plus there will be min, max values and the GST rate.

While prompting I referenced the relevant files, added one sample entry from the json file, and pasted the ticket contents.

It wrote a script for seeding the db and a prisma schema. And asked to run prisma migrate, I did it without giving much attention, thinking let it cook for some time.
Upon checking the schema, it was using CUID for Primary Key in the table, created columns for all fields, added an index on the hsnCode field, even though it was already marked as a unique field, and a unique constraint cannot work without being indexed.

After seeing this, I still let it go, then I ran the migrate cmd, ran the seed script, inspected the table by checking all the columns, and doing some sorting stuff to figure out what can be removed and what can be improved.

After I prompted again to first make the `tax_slabs` json column null, cause only 52 rows had data, it did that. However, it made it null as in putting "null" in the json column and not null as in Postgres NULL. This is pretty deceptive actually but it caught my eye somehow.

After this I prompted again to change from CUID to integer based IDs which are more performant as well as good fit the use case here perfectly. Even though integer based IDs are guessable, but since this data is already public, nothing sensitive in there, so integer based IDs are naturally a perfect fit for this use case.

And prompted again to remove the redundant description from the `tax_slabs` object, (i know its not that redudant actually, only 52 rows, but still i removed it though XD.).

After this point the table started looking good to me. Then I prompted again to replace the json file import with a db call in endpoint for querying the hsn master table via prisma.

Now it's done and working just fine. I still think things can be improved here like putting tax slabs in another table and referencing that in the hsn master table. But I think that's optimization for another day. Postgres is already good enough to handle this small amount of data. At this point I think the time & effort to optimise further won't give much of a meaningful performance improvement.
