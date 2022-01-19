
describe.only('Editor', () => {
    describe('Navigate', () => {
        beforeEach(() => {
            cy.visit('/account/profile')
            cy.overmind().its('actions').invoke('profile.setTestUser')

            cy.getSetsFromUser()
            cy.wait('@getSetsFromUser')
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
        })

        it('should open edit set when click on set', () => {

        })

        it('should open editor with new set when click new button', () => {

        })
    })
})