import { Theme } from "../../../prisma/clients";

export type Themetype = Theme
export class ThemeObject {
    themeId?: string
    name: string
    status: boolean
    hostid?: string
    constructor(data: any) {
        this.themeId = data.themeId
        this.name = data.name
        this.status = data.status
        this.hostid = data.hostid
    }
}