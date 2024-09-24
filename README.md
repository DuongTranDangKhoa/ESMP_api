# Project: ESMS_api
A Web API for Application provide Events Management solution for domestics use of FPT Uni.

# Technology
# Elysia with Bun runtime
## Getting Started

Install packages via bun install:

```bash
bun install
```

## Development

To start the development server run:

```bash
bun dev
```

Request to GET - http://localhost:2510/healthcheck with your HttpClient to see the result.

## Prisma 

To generate database script run: bun db:migrate
or run these:
bunx prisma migrate dev --schema=./prisma/schemas/masterdb.postgres.prisma
bunx prisma migrate dev --schema=./prisma/schemas/hostdb.postgres.prisma
bunx prisma migrate dev --schema=./prisma/schemas/mongodb.prisma

To update latest database change to database script run: db:diff
or run these:
bunx prisma migrate diff --from-schema-datasource=./prisma/schemas/masterdb.postgres.prisma --to-schema-datamodel=./prisma/schemas/masterdb.postgres.prisma --script
bunx prisma migrate diff --from-schema-datasource=./prisma/schemas/hostdb.postgres.prisma --to-schema-datamodel=./prisma/schemas/hostdb.postgres.prisma --script
bunx prisma migrate diff  --from-schema-datasource=./prisma/schemas/mongodb.prisma --to-schema-datamodel=./prisma/schemas/mongodb.prisma --script

To pull database schema run: bun db:pull
or run these: 
bunx prisma db pull --schema=./prisma/schemas/masterdb.postgres.prisma
bunx prisma db pull --schema=./prisma/schemas/hostdb.postgres.prisma
bunx prisma db pull --schema=./prisma/schemas/mongodb.prisma

if conflict with existing schema, run: bun db:pull --force 
or run these: 
bunx prisma db pull --schema=./prisma/schemas/masterdb.postgres.prisma --force
bunx prisma db pull --schema=./prisma/schemas/hostdb.postgres.prisma --force
bunx prisma db pull --schema=./prisma/schemas/mongodb.prisma --force

To generate prisma client run this: bun db:generate
or run these: 
bunx prisma generate --schema=./prisma/schemas/masterdb.postgres.prisma
bunx prisma generate --schema=./prisma/schemas/hostdb.postgres.prisma
bunx prisma generate --schema=./prisma/schemas/mongodb.prisma



