window.API = {

    subscribeToNewsletter: (email) => $.post('/api/newsletter/subscribe', {email}),

    requestTutoring: (ticket) => $.post('/api/tutoring/request', ticket)
}