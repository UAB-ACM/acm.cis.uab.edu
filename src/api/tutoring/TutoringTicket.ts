const randomString = require('randomstring')

export const TUTORING_TICKET = 'tutoring-ticket'

export interface TutoringTicket {
    ID: string
    blazer_id: string
    message: string
    topic: string
    time: string
    email: string
    preferred_email: string
}

export const makeTutoringTicket = (data): TutoringTicket => ({
    ID: randomString.generate({ length: 6, charset: 'alphanumeric' }).toUpperCase(),
    ...data
})