import { Location } from './../../../prisma/prismabox/postgres/hostdb/Location';
import { HostDbClient } from "../../database/host.db";
import eventService from "../event/event.service";
import { LocationGetObject, LocationObject, LocationTypeObject, LocationTypeType, MainTemplateObject, MapObject } from "./map.schema"

const createLocationType = async (hostId: string, eventId: string, inputData: LocationTypeObject, hostDb: HostDbClient) => {
    try {
      const locationType = await hostDb.locationType.create({
        data: {
          eventId: eventId,
          typeName: inputData.name,
          price : inputData.price,
          status: inputData.status,
        },
      });
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    } finally {
        await hostDb.$disconnect();
    }
}
const getLocationType = async (hostId: string, eventId: string, hostDb: HostDbClient) => {
  
    try {
      const locationType = await hostDb.locationType.findMany({
        where: {
          eventId: eventId
        }
      });
        await hostDb.$disconnect();
        return locationType;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    } 
}
const getLocationTypeByID = async (hostId: string, locationTypeid: string, hostDb: HostDbClient) => { 
    try {
        const location = await hostDb.locationType.findFirst({
            where: {
                typeId: locationTypeid
            }
        });
        await hostDb.$disconnect();
        return location;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    } 
}
const getMap = async (hostId: string, eventId: string, hostDb: HostDbClient): Promise<MapObject> => {
    try {
        const event = await eventService.getEventById(eventId, hostDb);
        const mainTemplate = new MainTemplateObject(event);
        const locationTypes = await getLocationType(hostId, eventId, hostDb);

        const locations: LocationGetObject[] = [];
        const shapes: LocationGetObject[] = [];
        for (const type of locationTypes) {
            const locationData = await hostDb.location.findMany({
                where: {
                    typeId: type.typeId
                }
            });
           
            for (const loc of locationData) {
                if (loc.shape =='booth' ) {
                    const name = await getLocationTypeByID(hostId, loc.typeId, hostDb);
                    let booth = new LocationGetObject(loc, name?.typeName ?? '');
                    locations.push(booth);;
                }else{
                     const name = await getLocationTypeByID(hostId, loc.typeId, hostDb);
                    let booth = new LocationGetObject(loc, name?.typeName ?? '');
                    shapes.push(booth);
                }

            }
        }
        
        const map: MapObject = {
            eventId: event.eventId,
            typeId: locationTypes[0]?.typeId ?? '',
            booths: locations,
            shapes: shapes, 
            mainTemplate: mainTemplate,
            status: event.status ?? 'Unknown',
            textElements: [], 
            imageElements: [event.thumbnail ?? '', event.stageValue ?? ''] 
        };
         await hostDb.$disconnect();
        return map;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to get map');
    } 
}
const createMap = async (hostId: string, inputData: MapObject, hostDb: HostDbClient) => {
    try {
    const mainTemplate: MainTemplateObject = new MainTemplateObject(inputData.mainTemplate);
    const updateEvent = await hostDb.event.update({
        where: {
            eventId: inputData.eventId,
        }, data: {
            x: mainTemplate.x,
            y: mainTemplate.y,
            width: mainTemplate.width,
            height: mainTemplate.height,
        }
    });
    const location: LocationGetObject[] = inputData.booths;
    const shapes: LocationGetObject[] = inputData.booths;
    for (const loc of location) {
        await hostDb.location.createMany({
            data: {
                typeId: loc.location.typeId,
                x: loc.location.x,
                y: loc.location.y,
                shape: "booth",
                rotation: loc.location.rotation,
                heigth: loc.location.heigth,
                width: loc.location.width,
                status: 'active'
            }
        });
    }
    for (const shape of shapes) {
            const locationType = await hostDb.locationType.findMany({where: {eventId: inputData.eventId}});
            //  if(locationType.
            await hostDb.location.createMany({
                data: {
                    typeId: shape.location.typeId,
                    x: shape.location.x,
                    y: shape.location.y,
                    shape: "shape",
                    rotation: shape.location.rotation,
                    heigth: shape.location.heigth,
                    width: shape.location.width,
                    status: 'blocked'
                }
            });
            
        }
    await hostDb.$disconnect();
    return "Successfully created main template";
   } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    }
}
const mapService = {
    getMap,
    getLocationType,
    createMap,
    createLocationType
}
export default mapService