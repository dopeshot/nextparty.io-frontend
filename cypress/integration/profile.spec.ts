import { Set } from "../../src/overmind/explore/state"
import setsfromuser from "../fixtures/setsfromuser.json"
import { interceptIndefinitely } from "../support/utils"

const api = `${Cypress.env('apiUrl')}`

describe('Profile', () => {
    beforeEach(() => {
        cy.visit('/account/login')
        cy.login()
        cy.getSetsFromUser()
        cy.getProfileVerified()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@login')
        cy.wait('@getSetsFromUser')
        cy.wait('@getProfileVerified')
    })

    it('should display correct name', () => {
        cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
            cy.get('h1').contains(name).should('be.visible')
        })
    })

    it('should display correct numbers', () => {
        cy.overmind().its('state.profile.sets').then((sets: {
            data: Set[] | null,
            truthCount: number
            dareCount: number
            setCount: number
            playedCount: number
        }) => {
            cy.contains(sets.truthCount).should('be.visible')
            cy.contains(sets.dareCount).should('be.visible')
            cy.contains(sets.setCount).should('be.visible')
            cy.contains(sets.playedCount).should('be.visible')
        })
    })

    it('should display loading bar when load sets from user and should disapear and show sets when finished loading', () => {
        cy.visit('/account/login')
        cy.login()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        const interception = interceptIndefinitely('GET', `${api}/sets/user/**`, "getSetsFromUserIndefinitely", { fixture: 'setsfromuser.json' })

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@login')

        cy.get('h1').contains("Hello").should('be.visible')

        cy.get('[data-cy="profile-progress-bar"]').should('be.visible').then(() => {
            cy.get('[data-cy="profile-sets-container"]').should('not.exist')
            interception.sendResponse()
            cy.wait('@getSetsFromUserIndefinitely')
            cy.get('[data-cy="profile-progress-bar"]').should('not.exist')
            cy.get('[data-cy="profile-sets-container"]').should('be.visible')
            cy.get('[data-cy="profile-set-item"]').should('have.length', setsfromuser.length)
        })
    })

    it('should open action sheet when click settings icon, when click logout should redirect to /account', () => {
        cy.get('[data-cy="profile-settings-button"]').click()
        cy.get('ion-action-sheet').should('be.visible')

        cy.get('ion-action-sheet .action-sheet-button').contains('Logout').should('be.visible').click({ force: true })

        cy.get('h1').should('be.visible').contains('Welcome back!')
    })
})

export { }

