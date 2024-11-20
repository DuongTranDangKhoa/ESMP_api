import { HostDbClient } from "../../database/host.db"
import menuService from "../menu/menu.service"
import mapService from "./map.service";
import * as commonSchema from '../../common/schema.common'
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
                    await mapService.createLocationType(hostId, eventId, body, hostDb)
                    return {message: 'Create Location Type success'}
                }
                ) 
                         
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
        .delete('/locationTyple/:locationTypeId',
            async ({
            params,
            hostDb,
            }: {
                params: any
                hostDb: HostDbClient
            }) => {
                const {locationTypeId} = params;
                return await mapService.deleteLocationType(locationTypeId, hostDb)
            }
        )
            