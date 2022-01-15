import { interceptIndefinitely } from "../support/utils"

describe('Mail Verify', () => {
    it('should display loading while waiting for mail verification', () => {
        const interception = interceptIndefinitely('GET', `${Cypress.env('apiUrl')}/users/verify-account?code=*`, "verifyCodeIndefinitely", {
            statusCode: 200
        })
        cy.visit('/account/verify-account/1234')
        cy.get('[data-cy="email-verify-progress-bar"]').should('be.visible').then(() => {
            interception.sendResponse()
            cy.wait('@verifyCodeIndefinitely')
            cy.get('[data-cy="email-verify-progress-bar"]').should('not.exist')
        })
    })

    it('should display success message when code is correct', () => {
        cy.getMail("success")
        cy.visit('/account/verify-account/1234')
        cy.contains("Success").should("be.visible")
    })

    it('should display fail message when code is incorrect', () => {
        cy.getMail("fail")
        cy.visit('/account/verify-account/1234')
        cy.contains("Failed").should("be.visible")
    })

    it('should display email verify text instead of no data component when email isnt verified', () => {
        cy.visit('/account/login')
        cy.getProfileUnverified()
        cy.getEmptySetsFromUser()
        cy.login()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@login')
        cy.wait('@getEmptySetsFromUser')
        cy.wait('@getProfileUnverified')

        cy.contains('Verification Email has been send!').should('be.visible')
    })

    it('should display no data component when email is verified', () => {
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
    })
})


export { }

