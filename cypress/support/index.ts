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
        }
    }
}

export { }

