import { interceptIndefinitely } from "../support/utils"

describe('Mail Verify', () => {
    it('should display loading while waiting for mail verification', () => {
        const interception = interceptIndefinitely('GET', `${Cypress.env('apiUrl')}/users/verify-account?code=*`)
        cy.visit('/account/verify-account/1234')
        cy.get('[data-cy="email-verify-progress-bar"]').should('be.visible').then(() => {
            interception.sendResponse()
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
})


export { }

