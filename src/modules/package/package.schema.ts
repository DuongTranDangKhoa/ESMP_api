export class PackageObject {
    id?: string
    name: string
    price: number
    description?: string
    status?: boolean
    eventstoragetime?: number
    constructor(data: any) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.description = data.description
        this.status = data.status
        this.eventstoragetime = data.eventstoragetime
    }
}