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

