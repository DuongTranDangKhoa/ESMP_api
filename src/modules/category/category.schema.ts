import { Category } from "../../../prisma/clients/postgres/hostdb";

export type CategoryType = Category
export class CategoryObject {
    categoryId?: string
    name: string
    description: string
    status?: boolean
    constructor(data: any) {
        this.categoryId = data.categoryId
        this.name = data.name
        this.description = data.description
        this.status = data.status
    }
}