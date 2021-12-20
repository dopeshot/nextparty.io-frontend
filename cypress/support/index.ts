import './commands'
import '@cypress/code-coverage/support'

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to...
             * @example cy.example()
             */
            example(): void
        }
    }
}

export { }