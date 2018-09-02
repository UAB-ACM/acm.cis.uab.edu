
export const getConfig = (env) => ({
    port: env.PORT,
    mailgun: {
        creds: {
            domain: env.MAILGUN_DOMAIN,
            apiKey: env.MAILGUN_SECRET
        },
        newsletter: env.MAILGUN_NEWSLETTER
    },
    trello: {
        creds: {
            key: env.TRELLO_KEY,
            token: env.TRELLO_TKN
        },
        lists: {
            tutoring: env.TRELLO_LIST_TUTORING,
            applications: env.TRELLO_LIST_APPLICATIONS
        }
    },
    tutoring: {
        notifyEmail: 'tutoring_tickets@mg.chrisroc.co'
    }
})