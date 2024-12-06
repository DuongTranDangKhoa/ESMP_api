import { HostDbClient } from "../../database/dbClient.db";
import { LocationTypeObject, MapCreateObject, LocationObject } from "./map.schema";

export const mapRepo = {
  // Create Location Type
  async createLocationType(eventId: string, inputData: LocationTypeObject, hostDb: HostDbClient) {
    return await hostDb.locationType.createMany({
      data: {
        eventId,
        color: inputData.color,
        typeName: inputData.typeName,
        price: inputData.price,
        status: inputData.status,
      },
    });
  },

  // Get Location Types
  async getLocationType(eventId: string, hostDb: HostDbClient) {
    return await hostDb.locationType.findMany({
      where: {
        eventId
        // NOT: { status: "blocked" },
      },
    });
  },
  async findLocationTypeMap(eventId: string, allTypeNames:  Set<string> , hostDb: HostDbClient) {
 return await hostDb.locationType.findMany({
            where: {
                eventId: eventId,
                typeName: { in: Array.from(allTypeNames) }
            }
        })
  },
  async createShapesOrTexts(eventId: string, newTypeNames: string[]  , hostDb: HostDbClient) {
       return await hostDb.locationType.createMany({
                data: newTypeNames.map(name => ({
                    eventId: eventId,
                    typeName: name,
                    price: '0',
                    status: 'blocked'
                }))
            });
  },
  async findLocationTypesCreated(eventId: string, newTypeNames: string[]  , hostDb: HostDbClient){
       return  await hostDb.locationType.findMany({
                where: {
                    eventId: eventId,
                    typeName: { in: newTypeNames }
                }
            });
  },
  async createMap(boothData: any, shapeData: any,  textData: any ,hostDb: HostDbClient){
    return await hostDb.location.createMany({
            data: [...boothData, ...shapeData, ...textData]
        });
  },
  async getLocationTypeByID(locationTypeId: string, hostDb: HostDbClient) {
    return await hostDb.locationType.findFirst({
      where: { typeId: locationTypeId },
    });
  },

  // Create Map
  async createMapLocations(locationData: any[], hostDb: HostDbClient) {
    return await hostDb.location.createMany({
      data: locationData,
    });
  },

  // Update Location Type
  async updateLocationType(locationTypeId: string, inputData: LocationTypeObject, hostDb: HostDbClient) {
    return await hostDb.locationType.update({
      where: { typeId: locationTypeId },
      data: {
        color: inputData.color,
        typeName: inputData.typeName,
        price: inputData.price,
        status: inputData.status,
      },
    });
  },

  // Delete Location Type
  async deleteLocationType(locationTypeId: string, hostDb: HostDbClient) {
    return await hostDb.locationType.delete({
      where: { typeId: locationTypeId },
    });
  },

  // Delete Map
  async deleteMap(locationId: string, hostDb: HostDbClient) {
    return await hostDb.location.delete({
      where: { locationId },
    });
  },

  // Update Map
  async updateMap(locationId: string, updateData: LocationObject, hostDb: HostDbClient) {
    return await hostDb.location.updateMany({
      where: { locationId },
      data: {
        typeId: updateData.typeId,
        x: updateData.x,
        y: updateData.y,
        rotation: updateData.rotation,
        height: updateData.height,
        width: updateData.width,
        status: updateData.status,
      },
    });
  },
  async findLocationbyLocationTypeId(locationTypeId: string, hostDb: HostDbClient) {
    return await hostDb.location.findMany({
            where: {
                typeId: locationTypeId,
            },
        });
  },
  async findLocationbyLocationId(locationId: string, hostDb: HostDbClient) {
  return await hostDb.location.findUnique({
            where: {
                locationId: locationId,
            },
        });
  },
  // Get Map Data
  async getMapData(locationTypeIds: string[], hostDb: HostDbClient) {
    return await hostDb.location.findMany({
      where: {
        typeId: { in: locationTypeIds },
      },
    });
  },
};
