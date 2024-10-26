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
export class ProductItemInMenuObject {
    menuName: string;
    productItem: { id: string }[]
    constructor(
    productItem: any
  ) {
    this.menuName = productItem.name
    this.productItem = productItem.productItem
  }
}
export class ViewMenu {
   menuName: string;
   productItem: string[]
constructor(
    productItem: any
  ) {
    this.menuName = productItem.name
    this.productItem = productItem.productItem
  }
}