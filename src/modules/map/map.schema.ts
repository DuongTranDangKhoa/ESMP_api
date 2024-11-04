import { LocationType,Location } from "../../../prisma/clients/postgres/hostdb";
import { EventObject } from "../event/event.schema";
export type LocationTypeType = Location
export class LocationObject{
    locationId: string
    typeId: string
    shape?: string   
    x?: number 
    y?: number 
    rotation?: number
    height: number | null
    width: number | null
    status?: string 
    constructor(data: any){
        this.locationId = data.locationId
        this.status = data.status
        this.x = data.x
        this.y = data.y
        this.typeId = data.typeId
        this.shape = data.shape
        this.rotation = data.rotation
        this.height = data.height
        this.width = data.width
    }
}
export class LocationTypeObject{
    typeId: string
    name: string
    price: string
    status: string 
    constructor(data: any){
        this.typeId = data.typeId
        this.name = data.name
        this.price = data.price
        this.status = data.status
    }
}
export class MainTemplateObject {
    eventId: string
    name: string
    x: number
    y: number
    width: number
    height: number
    rotation: number
    constructor(data: any){
        this.eventId = data.eventId
        this.name = data.name
        this.x = data.x
        this.y = data.y
        this.width = data.width
        this.height = data.height
        this.rotation = 0
    }
}
export type EventMapObject = EventObject
export class MapObject {
    eventId: string
    typeId: string
    booths: LocationObject[]
    shapes:  LocationObject[]
    mainTemplate: MainTemplateObject
    status: string
    textElements: string[]
    imageElements: string[]
    constructor(data: any){
      this.eventId = data.eventId
      this.typeId = data.typeId
      this.booths = data.booths
      this.shapes = data.shapes
      this.mainTemplate = data.mainTemplate
      this.status = data.status
      this.textElements = data.textElements
    this.imageElements = data.imageElements
    }
}