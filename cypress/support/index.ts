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
             * Custom command to intercept add set request
             * @addSet cy.addSet()
             */
            addSet(): void

            /**
             * Custom command to intercept get one set request
             * @getOneSet cy.getOneSet()
             */
            getOneSet(): void

            /**
             * Custom command to get overmind window object
             * @overmind cy.overmind()
             */
            overmind(): Chainable

            /**
             * Custom command to intercept login
             * @login cy.login()
             */
            login(): void

            /**
             * Custom command to intercept login when credentials are wrong
             * @loginWrongCredentials cy.loginWrongCredentials()
             */
            loginWrongCredentials(): void

            /**
             * Custom command to intercept login when user is banned
             * @loginBannedUser cy.loginBannedUser()
             */
            loginBannedUser(): void
            /**
             * Custom command to intercept register
             * @register cy.register()
             */
            register(): void

            /**
             * Custom command to intercept register when email is duplicated
             * @registerDuplicateEmail cy.registerDuplicateEmail()
             */
            registerDuplicateEmail(): void

            /**
             * Custom command to intercept register when username is duplicated
             * @registerDuplicateUsername cy.registerDuplicateUsername()
             */
            registerDuplicateUsername(): void

            /**
             * Custom command to intercept getSetsFromUser
             * @getSetsFromUser cy.getSetsFromUser()
             */
            getSetsFromUser(): void

            /**
             * Custom command to intercept getSetsFromUser with empty array return
             * @getEmptySetsFromUser cy.getEmptySetsFromUser()
             */
            getEmptySetsFromUser(): void

            /**
             * Custom command to intercept getProfile verified user
             * @getProfileVerified cy.getProfileVerified()
             */
            getProfileVerified(): void

            /**
             * Custom command to intercept getProfile unverified user
             * @getProfileUnverified cy.getProfileVerified()
             */
            getProfileUnverified(): void

            /**
             * Custom command to intercept all request to database and simulate timeout when post request
             * @databasedownPost cy.databasedownPost()
             */
            databasedownPost(): void

            /**
            * Custom command to intercept all request to database and simulate timeout when post request
            * @databasedownGet cy.databasedownGet()
              */
            databasedownGet(): void

            /**
             * Custom command to intercept all email verification requests with response fail and success
             * @getMail cy.getMail("success")
             */
            getMail(response: "fail" | "success"): void

            /**
             * Custom command to intercept all resend email verification requests with response fail and success
             * @resendMail cy.resendMail()
             */
            resendMail(): void
        }
    }
}

export { }

