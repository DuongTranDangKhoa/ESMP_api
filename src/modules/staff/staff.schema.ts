import { Staff } from './../../../prisma/clients/index.d';

import { Account, staff } from "../../../prisma/clients/postgres/hostdb";
import { t } from 'elysia';

export type AccountType = Pick< Account,| 'name' >
export class VendorAccountType {
  account: AccountType
  staff: staff
  constructor(account: Account, staff: staff) {
    this.account = account
    this.staff = staff
  }
} 
export class StaffObject {
    staffId?: string;
    username: string;
    password: string;
    urlQr: string;
    constructor(data: any) {
    this.staffId = data.staffId;
    this.username = data.username;
    this.password = data.password;
    this.urlQr = data.urlQr;
    }
}
export class RegisterVendorObject {
  username: string
  password: string
  name: string 
  phone: string
  email: string
  constructor(data: any) {
    this.username = data.username
    this.password = data.password
    this.name = data.name
    this.phone = data.phone
    this.email = data.email
  }
}
export const RegisterStaff = t.Object({
  username: t.String({
    minLength: 8,
    maxLength: 50,
    default: '',
    pattern: '^[A-Za-z][A-Za-z0-9_-]{7,39}$',
    error:
      'Username must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
  password: t.String({
    default: '',
    minLength: 8,
    maxLength: 50,
    pattern: '^[A-Za-z][.@A-Za-z0-9_-]{7,39}$',
    error:
      'Password must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
  name: t.String({
    minLength: 1,
    maxLength: 50,
    error: 'Name is required',
  }),
  email: t.String({
    minLength: 1,
    maxLength: 50,
    error: 'Email is required',
  }),
  phone: t.String({
    minLength: 1,
    maxLength: 10,
    error: 'Phone number is required',
  }),
})
export const UpdateStaffSchema = t.Object({
  password: t.String({
    default: '',
    minLength: 8,
    maxLength: 50,
    pattern: '^[A-Za-z][.@A-Za-z0-9_-]{7,39}$',
    error:
      'Password must be between 8 - 40 characters and start with only letters and contain only letters, numbers and underscores',
  }),
  name: t.String({
    minLength: 1,
    maxLength: 50,
    error: 'Name is required',
  }),
  email: t.String({
    minLength: 1,
    maxLength: 50,
    error: 'Email is required',
  }),
  phone: t.String({
    minLength: 1,
    maxLength: 10,
    error: 'Phone number is required',
  }),
  status: t.Optional(t.Boolean({ error: 'Status must be true or false' })),
});
export const GetStaffParams = t.Required(
  t.Object(
    {
      vendorId: t.String({ format: 'uuid', error: 'Invalid Vendor ID' }),  
    },
    {
      error: 'Product ID not provived',
    },
  ),
)