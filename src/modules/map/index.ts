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
                hostDb,}:{
                    params: any
                    body: any
                    hostDb: HostDbClient
                }) => {
                    const {hostId, eventId} = params;
                    return await mapService.createLocationType(hostId, eventId, body, hostDb)
                }) 
                         
        )
            .post('submit/:hostId',
                async ({
                    hostId,
                    body,
                    hostDb,
                }: {
                    hostId: string
                    body: any
                    hostDb: HostDbClient
                }) => {
                    return await mapService.createMap(hostId, body, hostDb)
                }
            )
            