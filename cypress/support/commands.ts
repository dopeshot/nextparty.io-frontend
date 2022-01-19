const api = `${Cypress.env('apiUrl')}`

Cypress.Commands.add('getSets', () => {
    cy.intercept('GET', `${api}/sets`, {
        fixture: 'sets.json'
    }).as('getSets')
})

Cypress.Commands.add('addSet', () => {
    cy.intercept('POST', `${api}/sets`, {
        fixture: 'set.json'
    }).as('addSet')
})


Cypress.Commands.add('getOneSet', () => {
    cy.intercept('GET', `${api}/sets/**`, {
        fixture: 'set.json'
    }).as('getOneSet')
})

Cypress.Commands.add('login', () => {
    cy.intercept('POST', `${api}/auth/login`, {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbGxvIiwic3ViIjoiNjFhN2YxMDQ1ZDk5MTA1MWIzOTVhNTk1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwODY5NzE3LCJleHAiOjE2NDA5MDU3MTd9.kiRFpaXTTXUuTjUFISm-lH5WLsQOBPEsDLzEBiC7B_Y"
    }).as('login')
})

Cypress.Commands.add('loginWrongCredentials', () => {
    cy.intercept('POST', `${api}/auth/login`, {
        statusCode: 401,
        body: {
            statusCode: 401,
            message: "Login Failed due to invalid credentials",
            error: "Unauthorized"
        },
    }).as('loginWrongCredentials')
})

Cypress.Commands.add('loginBannedUser', () => {
    cy.intercept('POST', `${api}/auth/login`,
        {
            statusCode: 401,
            body: {
                "statusCode": 401,
                "message": "This user is banned. Please contact the administrator",
                "error": "Unauthorized"
            },
        }).as('loginBannedUser')
})

Cypress.Commands.add('databasedownPost', () => {
    cy.intercept('POST', `${api}/**`, {
        forceNetworkError: true
    }).as('databasedownPost')
})

Cypress.Commands.add('databasedownGet', () => {
    cy.intercept('GET', `${api}/**`, {
        forceNetworkError: true
    }).as('databasedownGet')
})

Cypress.Commands.add('register', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbGxvIiwic3ViIjoiNjFhN2YxMDQ1ZDk5MTA1MWIzOTVhNTk1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwODY5NzE3LCJleHAiOjE2NDA5MDU3MTd9.kiRFpaXTTXUuTjUFISm-lH5WLsQOBPEsDLzEBiC7B_Y"
    }).as('register')
})

Cypress.Commands.add('registerDuplicateEmail', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        statusCode: 409,
        body: {
            statusCode: 409,
            message: "Email is already taken.",
            error: "Conflict"
        },
    }).as('registerDuplicateEmail')
})

Cypress.Commands.add('registerDuplicateUsername', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        statusCode: 409,
        body: {
            statusCode: 409,
            message: "Username is already taken.",
            error: "Conflict"
        },
    }).as('registerDuplicateUsername')
})

Cypress.Commands.add('getSetsFromUser', () => {
    cy.intercept('GET', `${api}/sets/user/**`, {
        fixture: 'setsfromuser.json'
    }).as('getSetsFromUser')
})

Cypress.Commands.add('getEmptySetsFromUser', () => {
    cy.intercept('GET', `${api}/sets/user/**`, []).as('getEmptySetsFromUser')
})

Cypress.Commands.add('getProfileVerified', () => {
    cy.intercept('GET', `${api}/users/profile`, {
        fixture: 'profile-verified.json'
    }).as('getProfileVerified')
})

Cypress.Commands.add('getProfileUnverified', () => {
    cy.intercept('GET', `${api}/users/profile`, {
        fixture: 'profile-unverified.json'
    }).as('getProfileUnverified')
})

Cypress.Commands.add('getMail', (response: "fail" | "success") => {
    cy.intercept('GET', `${api}/users/verify-account?code=*`, (req) => {
        const replyWith = response === "success" ? {
            statusCode: 200
        } : {
            statusCode: 401,
            body: {
                "statusCode": 401,
                "message": "Unauthorized"
            }
        }
        req.reply(replyWith)
    }).as('getMail')
})

Cypress.Commands.add('resendMail', () => {
    cy.intercept('GET', `${api}/users/resend-account-verification`, {
        statusCode: 200
    }).as('resendMail')
})

Cypress.Commands.add('overmind', () => {
    let overmind: any

    const cmd = Cypress.log({
        name: 'overmind',
        consoleProps() {
            return {
                Overmind: overmind
            }
        }
    })

    return (
        cy.window().then((window: any) => {
            overmind = window.overmind
            cmd.end()
            return overmind
        })
    )
})

export { }

