import { NotFoundError } from 'elysia';
import { Location } from './../../../prisma/prismabox/postgres/hostdb/Location';
import { HostDbClient } from "../../database/dbClient.db";
import eventService from "../event/event.service";
import { BoothObject, LocationGetObject, LocationObject, LocationTypeObject, LocationTypeType, MainTemplateObject, MapCreateObject, MapObject, ShapeObject } from "./map.schema"
import { LocationStatus } from '../../common/constant/common.constant';
import { mapRepo } from './map.repo';
import { eventRepo } from '../event/event.repo';

const createLocationType = async (hostId: string, eventId: string, inputData: LocationTypeObject, hostDb: HostDbClient) => {
    try {
      const locationType = await mapRepo.createLocationType(eventId, inputData, hostDb);
      
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
      const locationType = await mapRepo.getLocationType(eventId, hostDb);
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
// const getMap = async (hostId: string, eventId: string, hostDb: HostDbClient): Promise<MapObject> => {
//     try {
//         const event = await eventService.getEventById(eventId, hostDb);
//         const mainTemplate = new MainTemplateObject(event);
//         const locationTypes = await getLocationTypeofMap(hostId, eventId, hostDb);

//         const locations: LocationGetObject[] = [];
//         const shapes: LocationGetObject[] = [];
//         const textElements: LocationGetObject[] = [];
//         for (const type of locationTypes) {
//             const locationData = await hostDb.location.findMany({
//                 where: {
//                     typeId: type.typeId
//                 }
//             });
           
//             for (const loc of locationData) {
//                 if (loc.shape =='booth' ) {
//                     const name = await getLocationTypeByID(hostId, loc.typeId, hostDb);
//                     let booth = new LocationGetObject(loc, name?.typeName ?? '');
//                     locations.push(booth);;
//                 } else if (loc.shape =='text'){
//                     const name = await getLocationTypeByID(hostId, loc.typeId, hostDb);
//                     let booth = new LocationGetObject(loc, name?.typeName ?? '');
//                     textElements.push(booth);
//                 }
//                 else{
//                     const name = await getLocationTypeByID(hostId, loc.typeId, hostDb);
//                     let booth = new LocationGetObject(loc, name?.typeName ?? '');
//                     shapes.push(booth);
//                 }

//             }
//         }
        
//         const map: MapObject = {
//             eventId: event.eventId,
//             typeId: locationTypes[0]?.typeId ?? '',
//             booths: locations,
//             shapes: shapes, 
//             mainTemplate: mainTemplate,
//             status: event.status ?? 'Unknown',
//             textElements: textElements, 
//             imageElements: event.stageValue ? [event.stageValue] : []

//         };
//         //  await hostDb.$disconnect();
//         return map;
//     } catch (error) {
//         console.error("Error creating map:", error);
//         throw new Error('Failed to get map');
//     } 
// }
const getMap = async (hostId: string, eventId: string, hostDb: HostDbClient): Promise<MapObject> => {
    try {
        const event = await eventService.getEventById(eventId, hostDb);
        const mainTemplate = new MainTemplateObject(event);
        const locationTypes = await getLocationTypeofMap(hostId, eventId, hostDb);

        const locationTypeMap = new Map<string, string>();
        const locationTypeMapColor = new Map<string, string>();
        for (const type of locationTypes) {
            locationTypeMap.set(type.typeId, type.typeName ?? '');
            locationTypeMapColor.set(type.typeId, type.color ?? '');
        }

        const locationTypeIds = locationTypes.map((type) => type.typeId);
        const locationData = await mapRepo.getMapData(locationTypeIds, hostDb);

        const locations: LocationGetObject[] = [];
        const shapes: LocationGetObject[] = [];
        const textElements: LocationGetObject[] = [];

        for (const loc of locationData) {
            const typeName = locationTypeMap.get(loc.typeId) ?? '';
            const color = locationTypeMapColor.get(loc.typeId) ?? '';
            const locationObject = new LocationGetObject(loc, typeName,color);

            if (loc.shape === 'booth') {
                locations.push(locationObject);
            } else if (loc.shape === 'text') {
                textElements.push(locationObject);
            } else {
                shapes.push(locationObject);
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
            imageElements: event.stageValue ? [event.stageValue] : []
        };

        return map;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to get map');
    }
};
// const createMap = async (hostId: string,eventId: string, inputData: MapCreateObject, hostDb: HostDbClient) => {
//     try {
//     const mainTemplate: MainTemplateObject = new MainTemplateObject(inputData.mainTemplate);
//     console.log("Creating map:", inputData.imageElements[0]);
//     if(mainTemplate != null){
//     const updateEvent = await hostDb.event.update({
//         where: {
//             eventId: eventId,
//         }, data: {
//             x: mainTemplate.x,
//             y: mainTemplate.y,
//             width: mainTemplate.width,
//             height: mainTemplate.height,
//             stageValue: inputData.imageElements[0],
//         }
//     });
//    }
   
//     const location: BoothObject[] = inputData.booths;
//     const shapes: ShapeObject[] = inputData.shapes;
//     const textElements: ShapeObject[] = inputData.textElements;
//     for (const loc of location) {
//         await hostDb.location.createMany({
//             data: {
//                 typeId: loc.typeId,
//                 x: loc.x,
//                 y: loc.y,
//                 shape: "booth",
//                 rotation: loc.rotation,
//                 height: loc.height,
//                 width: loc.width,
//                 status: 'Available'
//             }
//         });
//     }
//     for (const shape of shapes) {
//         const locationTypeId = await hostDb.locationType.findFirst({where: {typeName: shape.name, eventId: eventId}});
//         if (locationTypeId != null) { 
//              await hostDb.location.createMany({
//                 data: {
//                     typeId: locationTypeId.typeId,
//                     x: shape.x,
//                     y: shape.y,
//                     shape: shape.name,
//                     rotation: shape.rotation,
//                     height: shape.height,
//                     width: shape.width,
//                     status: 'blocked'
//                 }
//             });
//         } 
//         else{
//             const locationType = await hostDb.locationType.create({ 
//                 data: {
//                     eventId: eventId,
//                     typeName: shape.name,
//                     price: '0',
//                     status: 'blocked'
//                 }
//             } );
//             await hostDb.location.createMany({
//                 data: {
//                     typeId: locationType.typeId,
//                     x: shape.x,
//                     y: shape.y,
//                     shape: shape.name,
//                     rotation: shape.rotation,
//                     height: shape.height,
//                     width: shape.width,
//                     status: 'blocked'
//                 }
//             });
            
//         }
//     }
//         for (const text of textElements) {
//         const locationTypeId = await hostDb.locationType.findFirst({where: {typeName: text.name,eventId: eventId}});
//         if (locationTypeId != null) { 
//              await hostDb.location.createMany({
//                 data: {
//                     typeId: locationTypeId.typeId,
//                     x: text.x,
//                     y: text.y,
//                     shape: 'text',
//                     rotation: text.rotation,
//                     height: text.height,
//                     width: text.width,
//                     status: 'blocked'
//                 }
//             });
//         } 
//         else{
//             const locationType = await hostDb.locationType.create({ 
//                 data: {
//                     eventId: eventId,
//                     typeName: text.name,
//                     price: '0',
//                     status: 'blocked'
//                 }
//             } );
//             await hostDb.location.createMany({
//                 data: {
//                     typeId: locationType.typeId,
//                     x: text.x,
//                     y: text.y,
//                     shape: 'text',
//                     rotation: text.rotation,
//                     height: text.height,
//                     width: text.width,
//                     status: 'blocked'
//                 }
//             });
            
//         }
//     }
//     // await hostDb.$disconnect();
//     return "Successfully created template";
//    } catch (error) {
//         console.error("Error creating map:", error);
//         throw new Error('Failed to create map');
//     }
// }
const createMap = async (hostId: string, eventId: string, inputData: MapCreateObject, hostDb: HostDbClient) => {
    try {
        // Cập nhật main template nếu tồn tại
        const mainTemplate: MainTemplateObject = new MainTemplateObject(inputData.mainTemplate);
        if (mainTemplate) {
            await eventRepo.updateEventMap(eventId, mainTemplate, hostDb);
        }
        const allShapesAndTexts = [...inputData.shapes, ...inputData.textElements];
        const allTypeNames = new Set(allShapesAndTexts.map(item => item.name));
        
        const existingLocationTypes = await hostDb.locationType.findMany({
            where: {
                eventId: eventId,
                typeName: { in: Array.from(allTypeNames) }
            }
        });

        // Tạo Map cho tra cứu nhanh
        const locationTypeMap = new Map(existingLocationTypes.map(type => [type.typeName, type.typeId]));

        // Xác định typeName chưa tồn tại
        const newTypeNames = Array.from(allTypeNames).filter(name => !locationTypeMap.has(name));
        if (newTypeNames.length > 0) {
            const newLocationTypes = await hostDb.locationType.createMany({
                data: newTypeNames.map(name => ({
                    eventId: eventId,
                    typeName: name,
                    price: '0',
                    status: 'blocked'
                }))
            });

            // Lấy lại các loại locationType vừa tạo
            const createdLocationTypes = await hostDb.locationType.findMany({
                where: {
                    eventId: eventId,
                    typeName: { in: newTypeNames }
                }
            });

            // Cập nhật Map
            for (const type of createdLocationTypes) {
                locationTypeMap.set(type.typeName, type.typeId);
            }
        }

        // Gom tất cả dữ liệu cần tạo
        const boothData = inputData.booths.map(loc => ({
            typeId: loc.typeId,
            x: loc.x,
            y: loc.y,
            shape: "booth",
            rotation: loc.rotation,
            height: loc.height,
            width: loc.width,
            status: 'Available'
        }));

        const shapeData = inputData.shapes.map(shape => ({
            typeId: locationTypeMap.get(shape.name)!,
            x: shape.x,
            y: shape.y,
            shape: shape.name,
            rotation: shape.rotation,
            height: shape.height,
            width: shape.width,
            status: 'blocked'
        }));

        const textData = inputData.textElements.map(text => ({
            typeId: locationTypeMap.get(text.name)!,
            x: text.x,
            y: text.y,
            shape: 'text',
            rotation: text.rotation,
            height: text.height,
            width: text.width,
            status: 'blocked'
        }));

        // Tạo dữ liệu trong một lần gọi
        await hostDb.location.createMany({
            data: [...boothData, ...shapeData, ...textData]
        });

        return "Successfully created template";
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to create map');
    }
};
const updateMap = async (updateData: LocationObject, hostDb: HostDbClient) => {
  try {

        await hostDb.location.updateMany({
            where: {
                locationId: updateData.locationId,
            },
            data: {
                typeId: updateData.typeId,
                x: updateData.x,
                y: updateData.y,
                rotation: updateData.rotation,
                height: updateData.height, 
                width: updateData.width,
                status: updateData.status,
            },
    })
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
const deleteLocationType = async (locationTypeId: string, hostDb: HostDbClient) => {
    
    if (!locationTypeId) {
        throw new Error("LocationTypeId is required");
    }
    try {
        const checkLocationinLocationTypeId = await hostDb.location.findMany({
            where: {
                typeId: locationTypeId,
            },
        });
        if (checkLocationinLocationTypeId.length > 0) {
            throw new Error("Cannot delete locationType because it has associated locations.");
        }

        await hostDb.locationType.delete({
            where: {
                typeId: locationTypeId,
            },
        });

      return "Successfully deleted locationType";
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting locationType:", error.message);
            if (error.message.includes("associated locations")) {
                throw new Error(error.message); 
            } else if(error.message.includes("required")){
                throw new Error(error.message);
            }

            throw new Error("Failed to delete locationType");
        }

        throw new Error("An unexpected error occurred.");
    } finally {
        await hostDb.$disconnect();
          
    }
};
const updateLocationType = async (locationTypeId: string, inputData: LocationTypeObject, hostDb: HostDbClient) => {
    try {
        if (!locationTypeId) {
        throw new Error("LocationTypeId is required");
    }
        await hostDb.locationType.update({
            where: {
                typeId: locationTypeId,
            },
            data: {
                color: inputData.color,
                typeName: inputData.typeName,
                price: inputData.price,
                status: inputData.status,
            },
        });
        await hostDb.$disconnect();
        return "Successfully updated locationType";
    } catch (error) {
        console.error("Error updating locationType:", error);
        throw new Error("Failed to update locationType");
    }
}
const getLocation = async (hostId:string, eventId: string, hostDb: HostDbClient) => {
 try {
        const event = await eventService.getEventById(eventId, hostDb);
        const locationTypes = await getLocationTypeofMap(hostId, eventId, hostDb);

        const locationTypeMap = new Map<string, string>();
        const locationTypeMapColor = new Map<string, string>();
        for (const type of locationTypes) {
            locationTypeMap.set(type.typeId, type.typeName ?? '');
            locationTypeMapColor.set(type.typeId, type.color ?? '');
        }

        // Fetch all location data in a single query
        const locationTypeIds = locationTypes.map((type) => type.typeId);
        const locationData = await hostDb.location.findMany({
            where: {
                typeId: { in: locationTypeIds }
            }
        });

        const locations: LocationGetObject[] = [];

        for (const loc of locationData) {
            const typeName = locationTypeMap.get(loc.typeId) ?? '';
            const color = locationTypeMapColor.get(loc.typeId) ?? '';
            const locationObject = new LocationGetObject(loc, typeName,color);

            if (loc.shape === 'booth') {
                locations.push(locationObject);
            } 
        }
        return locationData;
    } catch (error) {
        console.error("Error creating map:", error);
        throw new Error('Failed to get Location');
    }
}
const mapService = {
    getMap,
    getLocation,
    getLocationType,
    createMap,
    updateMap,
    updateLocationType,
    deleteLocationType,
    deleteMap,
    createLocationType
}
export default mapService