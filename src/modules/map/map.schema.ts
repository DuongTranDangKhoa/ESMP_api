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
    width: number 
    status?: string 
    constructor(
        locationId: string,
        typeId: string,
        height: number,
        width: number,
        x?: number,
        y?: number,
        rotation?: number,
        shape?: string,
        status?: string
    ) {
        this.locationId = locationId;
        this.typeId = typeId;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.height = height;
        this.width = width;
        this.shape = shape;
        this.status = status;
    }
}
export class LocationGetObject {
   name : string
   location: LocationTypeType
   constructor(locationType: LocationTypeType, name: string){
         this.location = locationType
         this.name = name
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
    booths: LocationGetObject[]
    shapes:  LocationGetObject[]
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