import { VendorObject } from "./vendor.schema"
import vendorService from "./vendor.service"

export const vendorGroup = (app: any) =>
    app.group('/:vendorId', (app: any) => 
    app.get('/',
        async ({
            params,
            hostDb,}:{
            params: any,
            hostDb: any
        }) => {
            return {message: 'Vendor route'}
        }) 
        .post('/',
        async ({
            hostDb,}:{
            hostDb: any
        }) => {
            return {message: 'Vendor route'}
        }
       )
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
            return {message: 'Vendor route'}
        })
    )