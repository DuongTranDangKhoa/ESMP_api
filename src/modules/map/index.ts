import { HostDbClient } from "../../database/host.db"
import menuService from "../menu/menu.service"
import mapService from "./map.service";

export const mapGroup = (app: any) =>
app.group('/:hostId/:eventId', (app: any) => 
           app
            .get('/',
                async ({
                params,
                hostDb,}:{
                   params: any
                    hostDb: HostDbClient
                }) => {
                    const {hostId, eventId} = params;
                    return await mapService.getMap(hostId, eventId, hostDb)
                }) 
                .post('/',
                async ({
                    params,
                    body,
                    hostDb,
                }: {
                    params: any
                    body: any
                    hostDb: HostDbClient
                }) => {
                    const {hostId, eventId} = params;
                    return await mapService.createMap(hostId,eventId, body, hostDb)
                }
            )                                   
        )
            
      .group('locationTyple/:hostId/:eventId', (app: any) => 
           app
            .get('/',
                async ({
                params,
                hostDb,}:{
                   params: any
                    hostDb: HostDbClient
                }) => {
                    const {hostId, eventId} = params;
                    return await mapService.getLocationType(hostId, eventId, hostDb)
                })
               .post('/',
                async ({
                params,
                body,
                hostDb,}:{
                    params: any
                    body: any
                    hostDb: HostDbClient
                }) => {
                    const {hostId, eventId} = params;
                    return await mapService.createLocationType(hostId, eventId, body, hostDb)
                }) 
                         
        )  
        .put('/',
            async ({
                body,
                hostDb,
            }: {
                body: any
                hostDb: HostDbClient
            }) => {
                return await mapService.updateMap(body, hostDb)
            },

        ) 
        .delete('/:locationId',
            async ({
                params,
                hostDb,
            }: {
                params: any
                hostDb: HostDbClient
            }) => {
                const {locationId} = params;
                return await mapService.deleteMap(locationId, hostDb)
            },

        )
            