-- CreateTable
CREATE TABLE "admin" (
    "userid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "admin_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "config" (
    "configid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_duration" INTEGER DEFAULT 30,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "config_pkey" PRIMARY KEY ("configid")
);

-- CreateTable
CREATE TABLE "host" (
    "hostid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "hostname" VARCHAR(100) DEFAULT '',
    "contract_start_date" DATE,
    "contract_end_date" DATE,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',
    "hostcode" VARCHAR(8) NOT NULL,

    CONSTRAINT "host_pkey" PRIMARY KEY ("hostid")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "host_username_key" ON "host"("username");

-- CreateIndex
CREATE UNIQUE INDEX "host_hostcode_key" ON "host"("hostcode");
