import { notification } from "../../../prisma/clients";

export type NotificationType = notification

export class NotificationObject {
    id?: string
    userId: string
    source: string
    constructor(data: any) {
        this.id = data.id
        this.userId = data.userId 
        this.source = data.source
    }
}