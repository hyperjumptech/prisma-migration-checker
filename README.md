# Prisma Migration Checker

## About

Prisma Migration Checker is a CLI tool to check if new Prisma migrations can be applied safely to the database.

## Motivation

When you use Prisma in your web app, you might have encountered [failed migrations](https://www.prisma.io/docs/guides/database/production-troubleshooting#failed-migration) when deploying the migrations to the production database. While Prisma has documented the methods to fix this issue, it's not easy and straightforward. 

It'd have much better if you can check if the new migrations will succeed **before** actually deploying the migrations, say in your CI/CD pipeline. This is where Prisma Migration Checker comes to play.

# Installation

Prisma Migration Checker is developed using Node.js and TypeScript. So you can install it from the NPM as follows

```
npm install -g @hyperjumptech/prisma-migration-checker
```

# Usage

## Directly

You need to provide two schema files which are the schema file with the new migrations and another schema file without the new migrations.

```
prisma-migration-checker --new <path_to_the_new_schema> --current <path_to_the_existing_schema>
```

Note that before running Prisma Migration Checker, you need to:
- have the database used in your prisma.schema running (Postgres, MongoDB, SQLite, etc).
- if there is no `.env` file, you have to create empty `.env` file first, in the directory where you run this command

## In CI Pipeline

To check if a schema.prisma file that was changed in a pull request, you can checkout first the schema.prisma from the main branch before running Prisma Migration Checker in your CI pipeline.

```
git show main:prisma/schema.prisma > prisma/schema-main.prisma
prisma-migration-checker --new prisma/schema.prisma --current prisma/schema-main.prisma
```

# Development
clone the repo.

if you want to use `prisma-seeder` locally, you can build it by running `npm pack --pack-destination ~` in the `prisma-seeder` directory.
Then find the generated file on `~/hyperjumptech-prisma-seeder-0.0.3.tgz` (version is defined in package.json). Then update your `package.json > dependences`

```
"dependencies": {
    ...
    "@hyperjumptch/prisma-seeder": "file:~/hyperjumptech-prisma-seeder-0.0.3.tgz",
    ...
  }
```

then install dependencies using

```
npm install
```

then run this to start the package

```
./bin/dev --new <path_to_the_new_schema> --current <path_to_the_existing_schema> --database-url <url_of_the_database>
```

# How It Works

1. Prisma Migration Checker will apply the current migrations to the database.
2. It will then populate the database with fake data.
3. Finally it will apply the new migrations from the new schema file.

# License 

MIT
