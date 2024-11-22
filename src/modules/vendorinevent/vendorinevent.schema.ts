import { t } from "elysia"

  export class VendorInEvent  {
    vendorinEventId?: string
    vendorId: string
    eventId: string
    status?: string 
    constructor(data: any){
        this.vendorinEventId = data.vendorinEventId
        this.vendorId = data.vendorId
        this.eventId = data.eventId
        this.status = data.status
    }
}

export const GetEventPaymentInEventParams = t.Required(
  t.Object(
    {
      vendorInEventId: t.String({
        format: 'uuid',
        error: 'VendorInEventId ID is invalid',
      }),
    },
    {
      error: 'VendorInEventId ID not provided',
    },
  ),
)