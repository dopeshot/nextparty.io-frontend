
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

