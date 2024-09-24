import { t } from 'elysia'
import { Product } from '../../../prisma/clients/postgres/hostdb'

export type ProductType = Product

export class ProductObject {
  productId: string
  categoryId: string
  productName: string
  productPrice: number
  description: string
  quantity: number
  count: number
  createAt: Date 
  updateAt: Date
  status: boolean

  // constructor(vendorId: string, data: any) {
  constructor( data: any) {
    this.productId = data.productId
    this.categoryId = data.categoryId
    this.productName = data.productName
    this.productPrice = Number(data.productPrice)
    this.description = data.description
    this.quantity = Number(data.quantity)
    this.count = Number(data.count)
    this.createAt = new Date(data.createAt)
    this.updateAt = new Date(data.updateAt)
    this.status = true 
  }
}

export const GetProductParams = t.Required(
  t.Object(
    {
      // vendorId: t.String({ format: 'uuid', error: 'Invalid Vendor ID' }),
      productId: t.String({ format: 'uuid', error: 'Invalid Product ID' }),
      
    },
    {
      error: 'Product ID not provived',
    },
  ),
)
