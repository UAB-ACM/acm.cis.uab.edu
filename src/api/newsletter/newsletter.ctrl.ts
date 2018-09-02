export const NewsletterController = ({newsletterService, list}) => ({

    /**
     * Adds an email to our mailing list. Powered by MailGun.
     */
    subscribe: (req, res, next) => {

        let {email, name = '[Not Provided]'} = req.body

        if (!email || !name)
            return res.status(400).json({msg: "Invalid Params. Must provide email and name"})

        newsletterService.addToMailingList(list)({ name, email })
            .then(r => res.json(r))
            .catch(e => res.status(400).json({ err: e }))
    }

})
