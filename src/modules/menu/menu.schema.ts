import { t } from "elysia";
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
export class ProductItemInMenuUpdateObject {
    menuName: string;
    productItem  : { id: string, status: boolean }[]
    constructor(
    productItem: any
  ) {
    this.menuName = productItem.name
    this.productItem = productItem.productItem
  }
}
export const CreateMenuParams = t.Object({
  menuName: t.String({
    error: 'Menu name is required',
  }),
  productItem: t.Array(
    t.Object({
      id: t.String({
        format: 'uuid',
        error: 'Product item ID is invalid',
      }),
    })
  ),
});