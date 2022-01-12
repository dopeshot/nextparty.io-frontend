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
             * Custom command to intercept login when credentials are wrong
             * @getOneSet cy.login()
             */
            loginWrongCredentials(): void

            /**
             * Custom command to intercept register
             * @getOneSet cy.register()
             */
            register(): void

            /**
             * Custom command to intercept register when email is duplicated
             * @getOneSet cy.registerDuplicateEmail()
             */
            registerDuplicateEmail(): void

            /**
             * Custom command to intercept register when username is duplicated
             * @getOneSet cy.registerDuplicateUsername()
             */
            registerDuplicateUsername(): void

            /**
             * Custom command to intercept getSetsFromUser
             * @getOneSet cy.getSetsFromUser()
             */
            getSetsFromUser(): void

            /**
             * Custom command to intercept getSetsFromUser with empty array return
             * @getOneSet cy.getEmptySetsFromUser()
             */
            getEmptySetsFromUser(): void

            /**
             * Custom command to intercept all request to database and simulate timeout
             * @getOneSet cy.databasedown()
             */
            databasedown(): void

            getMail(response: "fail" | "success"): void
        }
    }
}

export { }

