---
layout: post
title: Setup postgresql for web development
description: Setting up postgresql for web development 
summary: postgresql setup for web development
tags: [ postgresql, databases, prisma, shell, linux ]
---

### Login into postgresql server using admin/root privileges  
- ```bash
sudo -u postgres psql
```    

### Inside postgresql root shell  

- Create a database
```bash
create database database_name;
```
_

- Create a new user
```bash
create user username_here with encrypted password 'password_here';
```  
_
- Grant all privileges to user on the database  
```bash
grant all privileges on database database_name to username_here;
```  
_  

So far this is enough for most cases like working with Ruby on Rails(Active record), Django(Django ORM), Flask(SQLAlchemy), Laravel(Eloquent), And Spring(Hibernate) etc. 

But things are a bit different in when it comes to prisma (ORM mostly popular in js ecosystem)
it requires us to make a new shadow database before every migrations.

You can read more about it [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database) 

Basically we need our database user to have permission to create new database in postgresql server. To do this run:

```bash
ALTER ROLE username_here CREATEDB;
``` 

To check if user has permission to create new databases run this:
```bash
\du
```
it should output a table something similar to this:
```
 Role name         |                         Attributes                         | Member of
-------------------+------------------------------------------------------------+-----------
 postgres          | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 username_here     | Create DB                                                  | {}
```

 Here are some common postgresql commands:
 - `\q` or `crtl` + `d` quits the postgresql shell
 - `\l` lists all available databases
 - `crtl` + `l` clears the console 
 - `crtl` + `c` quits currently typed command in the postgresql shell
 - `\?` for help


#### Thanks for reading & Keep coding!!! 

