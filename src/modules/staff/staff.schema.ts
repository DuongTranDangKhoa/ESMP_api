import { Staff } from './../../../prisma/clients/index.d';

import { Account, staff } from "../../../prisma/clients/postgres/hostdb";

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
