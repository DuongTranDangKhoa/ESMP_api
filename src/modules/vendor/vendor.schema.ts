import { error, t } from 'elysia'
import { Vendor } from '../../../prisma/clients/postgres/hostdb'

export type VendorType = Pick<
  Vendor,
  'vendorId' | 'username' | 'password' | 'vendorName' 
>

export class VendorObject {
  vendorId: string
  username: string
  vendorName: string

  constructor(vendor: Vendor | VendorType) {
    this.vendorId = vendor.vendorId
    this.username = vendor.username
    this.vendorName = vendor.vendorName ?? ''

  }
}

export const GetVendorParams = t.Required(
  t.Object(
    {
      vendorId: t.String({ format: 'uuid', error: 'Invalid Vendor ID' }),
    },
    {
      error: 'Vendor ID not provived',
    },
  ),
)
