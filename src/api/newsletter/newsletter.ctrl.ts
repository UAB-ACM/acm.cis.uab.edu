export const NewsletterController = ({mailgun, newsletterList}) => ({

    /**
     * Adds an email to our mailing list. Powered by MailGun.
     */
    subscribe: (req, res, next) => {

        let {email, name = '[Not Provided]'} = req.body

        if (!email || !name)
            return res.status(400).json({msg: "Invalid Params. Must provide email and name"})

        return mailgun.lists(newsletterList)
            .members()
            .create({
                subscribed: true,
                address: email,
                name,
                upsert: 'yes',
                vars: {} // custom data here
            })
            .then(reply => res.json(reply))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

})
