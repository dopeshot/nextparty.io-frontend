
describe.only('Editor', () => {
    describe('Navigate', () => {
        beforeEach(() => {
            cy.visit('/account/login')
            cy.getProfileVerified()
            cy.getSetsFromUser()
            cy.login()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.wait('@login')
            cy.wait('@getSetsFromUser')
            cy.wait('@getProfileVerified')
        })

        it('should open create set page when click new on empty set page', () => {
            cy.visit('/account/login')
            cy.getProfileVerified()
            cy.getEmptySetsFromUser()
            cy.login()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.wait('@login')
            cy.wait('@getEmptySetsFromUser')
            cy.wait('@getProfileVerified')

            cy.contains('Start creating awesome sets!').should('be.visible')

            cy.contains('New').click()

            cy.contains('Create Set').should('be.visible')
        })

        it.only('should open edit set when click on set', () => {
            cy.getOneSet()
            cy.get('[data-cy="profile-set-item"]').first().click()

            cy.wait('@getOneSet')
        })

        it('should open editor with new set when click new button', () => {

        })
    })
})