import { Set } from "../../src/overmind/explore/state"
import setsfromuser from "../fixtures/setsfromuser.json"
import { interceptIndefinitely } from "../support/utils"

const api = `${Cypress.env('apiUrl')}`

describe('Profile', () => {
    beforeEach(() => {
        cy.visit('/account/login')
        cy.login()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@login')

        cy.getSetsFromUser()
        cy.wait('@getSetsFromUser')
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
            cy.get('#truths').contains(sets.truthCount).should('be.visible')
            cy.get('#dares').contains(sets.dareCount).should('be.visible')
            cy.get('#sets').contains(sets.setCount).should('be.visible')
            cy.get('#total-played').contains(sets.playedCount).should('be.visible')
        })
    })

    it('should display loading bar when load sets from user and should disapear and show sets when finished loading', () => {
        cy.visit('/account/login')
        cy.login()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        const interception = interceptIndefinitely('GET', `${api}/set/user/**`, { fixture: 'setsfromuser.json' })

        cy.get('[data-cy="login-button"]').click()
        cy.wait('@login')
        cy.get('h1').should('be.visible').contains("Hello")

        cy.get('[data-cy="profile-progress-bar"]').should('be.visible').then(() => {
            cy.get('[data-cy="profile-sets-container"]').should('not.exist')
            interception.sendResponse()
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

    it.only('should show no data component when user has no sets', () => {
        cy.visit('/account/login')
        cy.login()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@login')

        cy.getEmptySetsFromUser()
        cy.wait('@getEmptySetsFromUser')

        cy.get('[data-cy="profile-no-data"]').should('be.visible')
        cy.get('[data-cy="profile-set-item"]').should('not.exist')
        cy.get('[data-cy="profile-sets-container"]').should('not.exist')
    })
})

export { }

