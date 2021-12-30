
const api = `${Cypress.env('apiUrl')}`

Cypress.Commands.add('getSets', () => {
    cy.intercept('GET', `${api}/set`, {
        fixture: 'sets.json'
    }).as('getSets')
})

Cypress.Commands.add('getOneSet', () => {
    cy.intercept('GET', `${api}/set/**`, {
        fixture: 'set.json'
    }).as('getOneSet')
})

Cypress.Commands.add('login', () => {
    cy.intercept('POST', `${api}/auth/login`, {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbGxvIiwic3ViIjoiNjFhN2YxMDQ1ZDk5MTA1MWIzOTVhNTk1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwODY5NzE3LCJleHAiOjE2NDA5MDU3MTd9.kiRFpaXTTXUuTjUFISm-lH5WLsQOBPEsDLzEBiC7B_Y"
    }).as('login')
})

Cypress.Commands.add('register', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbGxvIiwic3ViIjoiNjFhN2YxMDQ1ZDk5MTA1MWIzOTVhNTk1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwODY5NzE3LCJleHAiOjE2NDA5MDU3MTd9.kiRFpaXTTXUuTjUFISm-lH5WLsQOBPEsDLzEBiC7B_Y"
    }).as('register')
})

Cypress.Commands.add('getSetsFromUser', () => {
    cy.intercept('GET', `${api}/set/user/**`, [
        {
            "_id": "61cccfdd5094a2d623bfc749",
            "played": 0,
            "dareCount": 21,
            "truthCount": 0,
            "language": "de",
            "createdBy": {
                "_id": "61a7f1045d991051b395a595",
                "username": "Hello"
            },
            "category": "classic",
            "name": "Klassisch"
        },
        {
            "_id": "61cccfdd5094a2d623bfc74a",
            "played": 0,
            "dareCount": 22,
            "truthCount": 0,
            "language": "de",
            "createdBy": {
                "_id": "61a7f1045d991051b395a595",
                "username": "Hello"
            },
            "category": "hot",
            "name": "Versaut"
        },
        {
            "_id": "61cccfdd5094a2d623bfc74b",
            "played": 0,
            "dareCount": 1,
            "truthCount": 3,
            "language": "de",
            "createdBy": {
                "_id": "61a7f1045d991051b395a595",
                "username": "Hello"
            },
            "category": "classic",
            "name": "HdM Stuttgart Edition"
        },
        {
            "_id": "61cccfdd5094a2d623bfc74c",
            "played": 0,
            "dareCount": 4,
            "truthCount": 4,
            "language": "de",
            "createdBy": {
                "_id": "61a7f1045d991051b395a595",
                "username": "Hello"
            },
            "category": "sexy",
            "name": "Sex"
        }
    ]).as('getSetsFromUser')
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

