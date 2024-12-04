import { Payment } from './../../../prisma/clients/postgres/hostdb/index.d';
import { t } from "elysia"
import { ProductItem } from "../../../prisma/clients/postgres/hostdb"
export type ProductItemType = ProductItem
export class ProductItemObject {
  productItemId?:      string  
  vendorId:           string
  name:        string   
  description: string 
  price:       number
  details:  ProductInProductItemObject[]
  createAt?: Date 
  updateAt?: Date   
  status?: boolean 
  constructor( data: any) {
    this.productItemId = data.productItemId
    this.vendorId = data.vendorId
    this.name = data.name
    this.description = data.description
    this.details = data.details
    this.createAt = new Date(data.createAt)
    this.updateAt = new Date(data.updateAt)  
    this.price = data.price || 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    this.status = data.status  
  }
}
export class ProductInProductItemObject {
  productId : string 
  quantity: number
  unit : string
  constructor(productItem: any) {
    this.productId = productItem.productId
    this.quantity = productItem.quantity
    this.unit = productItem.unit
  }
}
export const ProductItemObjectSchema = t.Object({
  name: t.String(),
  description: t.String(),
  price: t.Number(),
  details: t.Array(
    t.Object({
      productId: t.String(),
      quantity: t.Number(),
      unit: t.String(),
    })
  ),
});

export const ProductInProductItemObjectSchema = t.Object({
    productId: t.String(),
    quantity: t.Number(),
    unit: t.String(),
});       
export const ProductItemObjectSchemaUpdate = t.Object({
  name: t.Optional(t.String()),            
  description: t.Optional(t.String()),   
  price: t.Optional(t.Number()),           
  details: t.Optional(
    t.Array(
      t.Object({
        productId: t.String(),
        quantity: t.Number(),
        unit: t.String(),
      })
    )
  ),
  createAt: t.Optional(t.Date()),          
  status: t.Optional(t.Boolean()),        
});