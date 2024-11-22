import { HostDbClient } from "../../database/dbClient.db"
import { CreateAccount, VendorObject } from "./vendor.schema"
import vendorService from "./vendor.service"

export const vendorGroup = (app: any) =>
    app
    .group('/:vendorId', (app: any) => 
    app.get('/',
        async ({
            params,
            hostDb,}:{
            params: any,
            hostDb: any
        }) => {
            const {vendorId} = params;
            return await vendorService.getVendorById(vendorId, hostDb)
        }) 
        
       .put('/',
        async ({
            params,
            body,
            hostDb,}:{
            params: any,
            body: VendorObject
            hostDb: any
        }) => {
            const {vendorId} = params;
            vendorService.updateVendor(vendorId, body, hostDb)
            return {message: 'Vendor updated'}
        })
        .delete('/',
        async ({
            params,
            hostDb,}:{
            params: any,
            hostDb: any
        }) => {
            const {vendorId} = params;
            return await vendorService.deleteVendor(vendorId, hostDb)
        })
    )
    .post('/:hostId',
        async ({
            params,
            body,
            hostDb,}:{
            params: any,
            body: any
            hostDb: HostDbClient
        }) => {
            const {hostId} = params;
            const register = vendorService.createVendor(hostId, body, hostDb)
            return register
        },{
            body: CreateAccount
        }
       )
        .get('host/:hostId',
        async ({
            params,
            hostDb,}:{
            params: any,
            hostDb: HostDbClient
        }) => {
            const {hostId} = params;
            return await vendorService.getVendorByIdHost(hostId, hostDb)
        }
    
)