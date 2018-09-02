import {Application} from "./Application";

const randomString = require('randomstring')

export interface ApplicationsService {
    createApplication: (data: any) => Application
}

export const ApplicationsService: ApplicationsService = ({

    createApplication: (data): Application => ({
        ID: randomString.generate({ length: 6, charset: 'alphanumeric' }).toUpperCase(),
        ...data
    })

})