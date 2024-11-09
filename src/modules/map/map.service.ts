import { Location } from './../../../prisma/prismabox/postgres/hostdb/Location';
import { HostDbClient } from "../../database/host.db";
import eventService from "../event/event.service";
import { BoothObject, LocationGetObject, LocationObject, LocationTypeObject, LocationTypeType, MainTemplateObject, MapCreateObject, MapObject, ShapeObject } from "./map.schema"

const createLocationType = async (hostId: string, eventId: string, inputData: LocationTypeObject, hostDb: HostDbClient) => {
    try {
      const locationType = await hostDb.locationType.createMany({
        data: {
          eventId: eventId,
          typeName: inputData.name,
          price : inputData.price,
          status: inputData.status,
        },
      });
    } catch (error) {
        console.error("Error creating Loction Type:", error);
        throw new Error('Failed to create Loction Type');
    } finally {
        await hostDb.$disconnect();
    }
}
const getLocationType = async (hostId: string, eventId: string, hostDb: HostDbClient) => {
  
    try {
      const locationType = await hostDb.locationType.findMany({
        where: {
          eventId: eventId,
          NOT: {
      status: 'blocked',
    },
        }
      });
        await hostDb.$disconnect();
        return locationType;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    } 
}
const getLocationTypeofMap = async (hostId: string, eventId: string, hostDb: HostDbClient) => {
  
    try {
      const locationType = await hostDb.locationType.findMany({
        where: {
          eventId: eventId,   
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
        console.log('Input Data:', eventId);
        const event = await eventService.getEventById(eventId, hostDb);
        const mainTemplate = new MainTemplateObject(event);
        const locationTypes = await getLocationTypeofMap(hostId, eventId, hostDb);

        const locations: LocationGetObject[] = [];
        const shapes: LocationGetObject[] = [];
        const textElements: LocationGetObject[] = [];
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
                } else if (loc.shape =='text'){
                    const name = await getLocationTypeByID(hostId, loc.typeId, hostDb);
                    let booth = new LocationGetObject(loc, name?.typeName ?? '');
                    textElements.push(booth);
                }
                else{
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
            textElements: textElements, 
            imageElements: [ event.stageValue ?? ''] 
        };
         await hostDb.$disconnect();
        return map;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to get map');
    } 
}
const createMap = async (hostId: string, inputData: MapCreateObject, hostDb: HostDbClient) => {
    try {
    const mainTemplate: MainTemplateObject = new MainTemplateObject(inputData.mainTemplate);
    if(mainTemplate != null){
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
   }
    const location: BoothObject[] = inputData.booths;
    const shapes: ShapeObject[] = inputData.shapes;
    const textElements: ShapeObject[] = inputData.textElements;
    for (const loc of location) {
        await hostDb.location.createMany({
            data: {
                typeId: loc.typeId,
                x: loc.x,
                y: loc.y,
                shape: "booth",
                rotation: loc.rotation,
                heigth: loc.height,
                width: loc.width,
                status: 'active'
            }
        });
    }
    for (const shape of shapes) {
        const locationTypeId = await hostDb.locationType.findFirst({where: {typeName: shape.name, eventId: inputData.eventId}});
        if (locationTypeId != null) { 
             await hostDb.location.createMany({
                data: {
                    typeId: locationTypeId.typeId,
                    x: shape.x,
                    y: shape.y,
                    shape: shape.name,
                    rotation: shape.rotation,
                    heigth: shape.height,
                    width: shape.width,
                    status: 'blocked'
                }
            });
        } 
        else{
            const locationType = await hostDb.locationType.create({ 
                data: {
                    eventId: inputData.eventId,
                    typeName: shape.name,
                    price: '0',
                    status: 'blocked'
                }
            } );
            await hostDb.location.createMany({
                data: {
                    typeId: locationType.typeId,
                    x: shape.x,
                    y: shape.y,
                    shape: shape.name,
                    rotation: shape.rotation,
                    heigth: shape.height,
                    width: shape.width,
                    status: 'blocked'
                }
            });
            
        }
    }
        for (const text of textElements) {
        const locationTypeId = await hostDb.locationType.findFirst({where: {typeName: text.name,eventId: inputData.eventId}});
        if (locationTypeId != null) { 
             await hostDb.location.createMany({
                data: {
                    typeId: locationTypeId.typeId,
                    x: text.x,
                    y: text.y,
                    shape: 'text',
                    rotation: text.rotation,
                    heigth: text.height,
                    width: text.width,
                    status: 'blocked'
                }
            });
        } 
        else{
            const locationType = await hostDb.locationType.create({ 
                data: {
                    eventId: inputData.eventId,
                    typeName: text.name,
                    price: '0',
                    status: 'active'
                }
            } );
            await hostDb.location.createMany({
                data: {
                    typeId: locationType.typeId,
                    x: text.x,
                    y: text.y,
                    shape: 'text',
                    rotation: text.rotation,
                    heigth: text.height,
                    width: text.width,
                    status: 'blocked'
                }
            });
            
        }
    }
    await hostDb.$disconnect();
    return "Successfully created template";
   } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    }
}
const updateMap = async (updateDataArray: LocationObject[], hostDb: HostDbClient) => {
  try {
    for (const updateData of updateDataArray) {
      console.log("Updating locationId:", updateData.locationId);

      await hostDb.location.updateMany({
        where: {
          locationId: updateData.locationId,
        },
        data: {
          typeId: updateData.typeId,
          x: updateData.x,
          y: updateData.y,
          rotation: updateData.rotation,
          heigth: updateData.height, // Corrected spelling
          width: updateData.width,
        },
      });
    }
    
    await hostDb.$disconnect();
    return "Successfully updated all locations";
  } catch (error) {
    console.error("Error updating map:", error);
    throw new Error("Failed to update map");
  }
};
const deleteMap = async (locationId: string, hostDb: HostDbClient) => {
    try {
        await hostDb.location.delete({
        where: {
            locationId,
        },
        });
        await hostDb.$disconnect();
        return "Successfully deleted location";
    } catch (error) {
        console.error("Error deleting location:", error);
        throw new Error("Failed to delete location because location have bought after");
    }
}
const mapService = {
    getMap,
    getLocationType,
    createMap,
    updateMap,
    deleteMap,
    createLocationType
}
export default mapService