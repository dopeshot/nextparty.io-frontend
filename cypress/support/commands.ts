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

export { }

