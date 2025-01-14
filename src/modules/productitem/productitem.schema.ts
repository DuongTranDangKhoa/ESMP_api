import { t } from "elysia"
import { ProductItem } from "../../../prisma/clients/postgres/hostdb"
export type ProductItemType = ProductItem
export class ProductItemObject {
  productItemId?:      string 
  productId:   string   
  vendorid:    string  
  name:        string   
  description: string 
  productOrigin:        string
  outofstock?: boolean    
  price:       number
  unit : string
  createAt?: Date 
  updateAt?: Date   
  status?: boolean 
  constructor(productId: string, data: any) {
    this.productId = productId
    this.productItemId = data.guid
    this.vendorid = data.vendorid
    this.name = data.name
    this.description = data.description
    this.productOrigin = data.type
    this.outofstock = true
    this.unit = data.unit
    this.createAt = new Date(data.createAt)
    this.updateAt = new Date(data.updateAt)  
    this.price = data.price || 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    this.status = true  
  }
}
export const GetProuctPramas = t.Required(
    t.Object(
      {
        productId: t.String({ format: 'uuid', error: 'Invalid Product ID' }),
        vendorId: t.String({ format: 'uuid', error: 'Invalid Vendor ID' }),
    },
    {
        error: 'Product Item not work'
    },
    ),
  )