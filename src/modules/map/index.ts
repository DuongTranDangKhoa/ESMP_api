import { HostDbClient } from "../../database/host.db"
import menuService from "../menu/menu.service"
import mapService from "./map.service";

export const mapGroup = (app: any) =>
app.group('/:hostId/:eventId', (app: any) => 
            app.guard({
                params: {
                    hostId: { type: 'string' },
                    eventId: { type: 'string' }
                }
            }, (app: any) => 
                app.resolve(
                    async ({
                        params,
                    }: {
                        params: any
                    }) => {
                        console.log('Params:', params);
                        const hostId = params.hostId
                        const eventId = params.eventId
                        return { hostId, eventId }
                    },
                ))
            .get('/',
                async ({
                hostId,
                eventId,
                hostDb,}:{
                    hostId: string
                    eventId: string
                    hostDb: HostDbClient
                }) => {
                    return await mapService.getMap(hostId, eventId, hostDb)
                })
            .post('/',
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
        )