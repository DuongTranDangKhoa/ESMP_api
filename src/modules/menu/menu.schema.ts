import { Menu } from "../../../prisma/clients/postgres/hostdb"

export type MenuType = Menu
export class MenuObject {
    menuId: string;
    eventId: string;
    vendorId: string;
    menuName: string;

  constructor(
    menu: any,
  ) {
    this.eventId = menu.eventId
    this.vendorId = menu.vendorId
    this.menuId = menu.menuId
    this.menuName = menu.menuName
  }
}