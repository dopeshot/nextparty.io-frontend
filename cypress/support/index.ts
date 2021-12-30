import '@cypress/code-coverage/support'
import './commands'

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to intercept get sets request
             * @getSets cy.getSets()
             */
            getSets(): void

            /**
             * Custom command to intercept get one set request
             * @getOneSet cy.getOneSet()
             */
            getOneSet(): void

            /**
             * Custom command to get overmind window object
             * @getOneSet cy.overmind()
             */
            overmind(): Chainable

            /**
             * Custom command to intercept login
             * @getOneSet cy.login()
             */
            login(): void

            /**
             * Custom command to intercept register
             * @getOneSet cy.register()
             */
            register(): void

            /**
             * Custom command to intercept getSetsFromUser
             * @getOneSet cy.getSetsFromUser()
             */
            getSetsFromUser(): void
        }
    }
}

export { }

