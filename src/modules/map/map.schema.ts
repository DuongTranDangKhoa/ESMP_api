import { LocationType,Location } from "../../../prisma/clients/postgres/hostdb";
import { EventObject } from "../event/event.schema";
export type LocationTypeType = Location
export class ShapeObject {
    name: string
    x: number 
    y: number 
    rotation: number
    height: number | null
    width: number 
    constructor( 
        name: string,
        height: number,
        width: number,
        x: number,
        y: number,
        rotation: number,
        shape: string,
         typeId?: string,
    ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.height = height;
        this.width = width;
    }
}
export class BoothObject {
    typeId: string
    x: number 
    y: number 
    rotation: number
    height: number | null
    width: number 
    constructor( 
        typeId: string,
        height: number,
        width: number,
        x: number,
        y: number,
        rotation: number,
    ) {
        this.typeId = typeId;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.height = height;
        this.width = width;
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
    typeId?: string
    typeName: string
    price: number
    status: string 
    constructor(data: any){
        this.typeId = data.typeId
        this.typeName = data.name
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
    status: string
    booths: LocationGetObject[]
    shapes:  LocationGetObject[]
    textElements: LocationGetObject[]
    mainTemplate: MainTemplateObject
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
export class MapCreateObject {
    eventId: string
    booths: BoothObject[]
    shapes:  ShapeObject[]
    textElements: ShapeObject[]
    mainTemplate: MainTemplateObject

    constructor(data: any){
      this.eventId = data.eventId
      this.booths = data.booths
      this.shapes = data.shapes
      this.textElements = data.textElements
      this.mainTemplate = data.mainTemplate
    }
}
export class LocationObject {
    locationId: string
    typeId: string
    x: number 
    y: number 
    rotation: number
    height: number 
    width: number 
    constructor( 
        locationId: string,
        typeId: string,
        height: number,
        width: number,
        x: number,
        y: number,
        rotation: number,
    ) {
        this.locationId = locationId;
        this.typeId = typeId;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.height = height;
        this.width = width;
    }
}