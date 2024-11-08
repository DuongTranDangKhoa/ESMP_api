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
