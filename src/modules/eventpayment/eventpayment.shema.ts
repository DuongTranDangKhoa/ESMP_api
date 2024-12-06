import { t } from "elysia";
import { EventPayment } from "../../../prisma/clients";
import { Decimal } from "@prisma/client/runtime/library";

export type EventPaymentType = EventPayment

export class EventPaymentObject {
  id?: string;
  vendorId: string | undefined ;
  locationtypename: string
  name: string
  depositpaymentdate: Date | null 
  deposit: Decimal
  totalprofit: Decimal
  profitpaymentdate: Date | null
  status: string

  constructor(
    id: string | undefined,
    vendorId: string | undefined,
    locationtypename: string,
    name: string,
    depositpaymentdate: Date | null,
    deposit: Decimal | 0.00,
    totalprofit: Decimal | 0.00,
    profitpaymentdate: Date | null,
    status: string
  ) {
    this.id = id;
    this.vendorId = vendorId;
    this.locationtypename = locationtypename;
    this.name = name;
    this.depositpaymentdate = depositpaymentdate;
    this.deposit =new Decimal(deposit);
    this.totalprofit = new Decimal(totalprofit);
    this.profitpaymentdate = profitpaymentdate;
    this.status = status;
  }
}
export class EventPaymentVendorObject {
  id?: string;
  locationtypename: string
  eventname: string
  depositpaymentdate: Date | null 
  deposit: Decimal
  totalprofit: Decimal
  profitpaymentdate: Date | null
  status: string

  constructor(
    id: string | undefined,
    locationtypename: string,
    eventname: string,
    depositpaymentdate: Date | null,
    deposit: Decimal | 0.00,
    totalprofit: Decimal | 0.00,
    profitpaymentdate: Date | null,
    status: string
  ) {
    this.id = id;
    this.locationtypename = locationtypename;
    this.eventname = eventname;
    this.depositpaymentdate = depositpaymentdate;
    this.deposit =new Decimal(deposit);
    this.totalprofit = new Decimal(totalprofit);
    this.profitpaymentdate = profitpaymentdate;
    this.status = status;
  }
}
export const EventPaymentSchema = t.Required(
  t.Object(
    {
      total: t.Number({
        min: 0,
        error: "Deposit must be a non-negative number",
      }),
      locationId: t.String({
        format: "uuid",
        error: "Invalid Location ID format",
      }),
      vendorinEventId: t.String({
        format: "uuid",
        error: "Invalid Vendor in Event ID format",
      }),
    },
    {
      error: "Invalid Event Payment data",
    }
  )
);
export const UpdateEventPayment = t.Required(
  t.Object(
    {
      status: t.Optional(
        t.String({ minLength: 1, error: "Status must be a non-empty string" })
      ),
    },
    {
      error: "Invalid Event Payment data",
    }
  ),
 
);

