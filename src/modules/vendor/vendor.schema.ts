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
  vendorId?: string
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
export class RegisterVendorObject {
  username: string
  password: string
  name: string 
  phone: string
  email: string
  address: string
  urlQr: string
  status: boolean
  constructor(data: any) {
    this.username = data.username
    this.password = data.password
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
export const CreateAccount = t.Object({
  username: t.String({
    minLength: 8,
    maxLength: 40,
    default: '',
    pattern: '^[A-Za-z][A-Za-z0-9_-]{7,39}$',
    error:
      'Username must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
  password: t.String({
    default: '',
    minLength: 8,
    maxLength: 40,
    pattern: '^[A-Za-z][.@A-Za-z0-9_-]{7,39}$',
    error:
      'Password must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
  name: t.String({
    default: '',
    error: 'Name must be a valid string',
  }),
  phone: t.String({
    pattern: '^[0-9]{10,15}$',
    error: 'Phone number must contain only digits and be 10 to 15 characters long',
  }),
  email: t.String({
    format: 'email',
    error: 'Email must be a valid email address',
  }),
  urlQr: t.String({
    default: '',
    error: 'URL QR must be a valid string',
  }),
  address: t.String({
    default: '',
    error: 'Address must be a valid string',
  }),
});