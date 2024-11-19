import { t } from 'elysia'
import { Product } from '../../../prisma/clients/postgres/hostdb'

export type ProductType = Product

export class ProductObject {
  productId?: string
  vendorid?: string
  categoryId: string
  productName: string
  description: string
  quantity: number
  count?: number
  createAt?: Date 
  updateAt?: Date
  status: boolean

  // constructor(vendorId: string, data: any) {
  constructor( data: any) {
    this.productId = data.productId
    this.vendorid = data.vendorId
    this.categoryId = data.categoryId
    this.productName = data.productName
    this.description = data.description
    this.quantity = Number(data.quantity)
    this.count = Number(data.count)
    this.createAt = new Date()
    this.updateAt = new Date()  
    this.status = true 
  }
}

export const GetProductParams = t.Required(
  t.Object(
    {
      vendorId: t.String({ format: 'uuid', error: 'Invalid Vendor ID' }),
      productId: t.String({ format: 'uuid', error: 'Invalid Product ID' }),
      
    },
    {
      error: 'Product ID not provived',
    },
  ),
)
export const ProductSchema = t.Required(
  t.Object(
    {
      categoryId: t.String({ format: 'uuid', error: 'Invalid Category ID' }),
      productName: t.String({ minLength: 1, error: 'Product Name is required' }),
      description: t.Optional(t.String({ error: 'Invalid Description' })),
      quantity: t.Number({ min: 0, error: 'Quantity must be a non-negative number' }),
      count: t.Optional(t.Number({ min: 0, error: 'Count must be a non-negative number' })),
      status: t.Boolean({ error: 'Status must be true or false' }),
    },
    {
      error: 'Invalid product data',
    },
  ),
);