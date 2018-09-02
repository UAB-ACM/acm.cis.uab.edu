
export const NewsletterService = (mailgun) => ({

    addToMailingList: (list) => ({ email, name }) => {
        return mailgun
            .lists(list)
            .members()
            .create({
                subscribed: true,
                address: email,
                name,
                upsert: 'yes',
                vars: {}
            })
    }

})