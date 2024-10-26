-- CreateTable
CREATE TABLE "event" (
    "eventid" UUID NOT NULL,
    "eventname" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "logo" VARCHAR,
    "startdate" DATE,
    "enddate" DATE,
    "location" VARCHAR(500),
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "x" INTEGER,
    "y" INTEGER,
    "onweb" BYTEA,
    "price" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'On-going',

    CONSTRAINT "event_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "eventpayment" (
    "eventPaymentId" UUID NOT NULL,
    "menuId" UUID NOT NULL,
    "locationid" UUID NOT NULL,
    "deposit" DECIMAL(10,2) NOT NULL,
    "depositpaymentdate" DATE,
    "total" DECIMAL(10,2) NOT NULL,
    "totalpaymentdate" DATE,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) DEFAULT 'Pending',

    CONSTRAINT "eventpayment_pkey" PRIMARY KEY ("eventPaymentId")
);

-- CreateTable
CREATE TABLE "vendorinevent" (
    "vendorinEventId" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "vendorinevent_pkey" PRIMARY KEY ("vendorinEventId","eventId","vendorId")
);

-- CreateTable
CREATE TABLE "location" (
    "locationid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "typeid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "shape" VARCHAR(50) NOT NULL,
    "direction" VARCHAR(50) NOT NULL,
    "x" INTEGER,
    "y" INTEGER,
    "length" INTEGER,
    "width" INTEGER,
    "status" VARCHAR(50),

    CONSTRAINT "location_pkey" PRIMARY KEY ("locationid")
);

-- CreateTable
CREATE TABLE "locationtype" (
    "typeid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "typename" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50),

    CONSTRAINT "locationtype_pkey" PRIMARY KEY ("typeid")
);

-- CreateTable
CREATE TABLE "theme" (
    "themeid" UUID NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "status" BOOLEAN DEFAULT false,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("themeid")
);

-- CreateTable
CREATE TABLE "vendor" (
    "vendorid" UUID NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "vendorname" VARCHAR(500),
    "phone" VARCHAR(10),
    "email" VARCHAR(100),
    "image" VARCHAR,
    "address" VARCHAR(500),
    "ulQr" VARCHAR,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("vendorid")
);

-- CreateTable
CREATE TABLE "order" (
    "orderid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "vendorid" VARCHAR(100) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "totalamount" INTEGER,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(10) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "orderdetail" (
    "orderdetailid" UUID NOT NULL,
    "productitemid" UUID NOT NULL,
    "orderid" UUID NOT NULL,
    "quantity" INTEGER,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalprice" DECIMAL(12,4) NOT NULL,

    CONSTRAINT "orderdetail_pkey" PRIMARY KEY ("orderdetailid")
);

-- CreateTable
CREATE TABLE "product" (
    "productid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "categoryid" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "quantity" INTEGER,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT false,
    "count" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("productid")
);

-- CreateTable
CREATE TABLE "config" (
    "configid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_duration" INTEGER DEFAULT 30,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined'
);

-- CreateTable
CREATE TABLE "productItem" (
    "productItemId" UUID NOT NULL,
    "name" VARCHAR(253) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "productItem_pkey" PRIMARY KEY ("productItemId")
);

-- CreateTable
CREATE TABLE "productinproductitem" (
    "productInProductItemId" UUID NOT NULL,
    "productitemid" UUID NOT NULL,
    "productid" UUID NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "productinproductitem_pkey" PRIMARY KEY ("productInProductItemId")
);

-- CreateTable
CREATE TABLE "payment" (
    "paymentId" UUID NOT NULL,
    "orderid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "transactiontype" VARCHAR,
    "paymentTime" DATE DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',

    CONSTRAINT "payment_pkey" PRIMARY KEY ("paymentId","orderid")
);

-- CreateTable
CREATE TABLE "category" (
    "categoryid" UUID NOT NULL,
    "categoryname" VARCHAR(100) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryid")
);

-- CreateTable
CREATE TABLE "productiteminmenu" (
    "productItemInMenu" UUID NOT NULL,
    "productitemid" UUID NOT NULL,
    "menuId" UUID NOT NULL,

    CONSTRAINT "productiteminmenu_pkey" PRIMARY KEY ("productItemInMenu")
);

-- CreateTable
CREATE TABLE "menu" (
    "menuId" UUID NOT NULL,
    "menuname" VARCHAR(100) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("menuId")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffid" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image" VARCHAR NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffid")
);

-- CreateIndex
CREATE UNIQUE INDEX "vendorinevent_vendorinEventId_key" ON "vendorinevent"("vendorinEventId");

-- CreateIndex
CREATE UNIQUE INDEX "location_locationid_key" ON "location"("locationid");

-- CreateIndex
CREATE UNIQUE INDEX "locationtype_typeid_key" ON "locationtype"("typeid");

-- CreateIndex
CREATE UNIQUE INDEX "theme_themeid_key" ON "theme"("themeid");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_pkey_unique" ON "vendor"("vendorid");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_username_key" ON "vendor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "config_pkey" ON "config"("configid");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_username_key" ON "Staff"("username");

-- AddForeignKey
ALTER TABLE "eventpayment" ADD CONSTRAINT "eventpayment_locationid_fkey" FOREIGN KEY ("locationid") REFERENCES "location"("locationid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventpayment" ADD CONSTRAINT "eventpayment_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "vendorinevent"("vendorinEventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendorinevent" ADD CONSTRAINT "vendorinevent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendorinevent" ADD CONSTRAINT "vendorinevent_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("vendorid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderdetail" ADD CONSTRAINT "orderdetail_productitemid_fkey" FOREIGN KEY ("productitemid") REFERENCES "productItem"("productItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderdetail" ADD CONSTRAINT "orderdetail_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "order"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_vendorid_fkey" FOREIGN KEY ("vendorid") REFERENCES "vendor"("vendorid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productinproductitem" ADD CONSTRAINT "productinproductitem_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("productid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productinproductitem" ADD CONSTRAINT "productinproductitem_productitemid_fkey" FOREIGN KEY ("productitemid") REFERENCES "productItem"("productItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productiteminmenu" ADD CONSTRAINT "productiteminmenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("menuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productiteminmenu" ADD CONSTRAINT "productiteminmenu_productitemid_fkey" FOREIGN KEY ("productitemid") REFERENCES "productItem"("productItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "vendorinevent"("vendorinEventId") ON DELETE RESTRICT ON UPDATE CASCADE;
