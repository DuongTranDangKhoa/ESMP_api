import { error, t } from 'elysia'
import { Account, Vendor } from '../../../prisma/clients/postgres/hostdb'

export type VendorType = Pick<
  Vendor, |
  'vendorId' |  'urlQr' | 'hostid'
>
export type AccountType = Pick< Account,| 'name' >
export class VendorAccountType {
  account: AccountType
  vendor: VendorType
  constructor(account: Account, vendor: Vendor) {
    this.account = account
    this.vendor = vendor
  }
} 
export class VendorObject {
  vendorId: string
  name?: string 
  phone?: string
  email?: string
  address?: string
  urlQr?: string
  status?: boolean
  constructor(data: any) {
    this.vendorId = data.vendorId
    this.name = data.name
    this.phone = data.phone
    this.email = data.email
    this.address = data.address
    this.urlQr = data.urlQr
    this.status = data.status
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
