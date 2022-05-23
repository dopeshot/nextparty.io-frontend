import { replaceStringWithIcon } from '../../src/services/Utilities'
import set from '../fixtures/set.json'
import sets from '../fixtures/sets.json'
import { interceptIndefinitely } from '../support/utils'

const api = `${Cypress.env('apiUrl')}/sets`

describe('Sets', () => {
    describe('All sets', () => {
        beforeEach(() => {
            cy.getSets()
            cy.visit('/')
        })

        it('should list all sets on explore page', () => {
            cy.get('[data-cy="explore-set-item"]').should('have.length', sets.length)
        })

        it('should list all properties of set on explore page', () => {
            cy.get('[data-cy="explore-set-item"]').contains(sets[0].name)
            cy.get('[data-cy="explore-set-item"]').contains(sets[0].createdBy.username)
            cy.get('[data-cy="explore-set-item"]').contains(sets[0].truthCount)
            cy.get('[data-cy="explore-set-item"]').contains(sets[0].dareCount)
        })

        it('should show loading bar when load sets and hide when loading finished on explore page', () => {
            const interception = interceptIndefinitely('GET', api, "getSetsIndefinitely", { fixture: 'sets.json' })
            cy.visit('/')

            cy.get('[data-cy="explore-progress-bar"]').should('be.visible').then(() => {
                interception.sendResponse()
                cy.wait('@getSetsIndefinitely')
                cy.get('[data-cy="explore-progress-bar"]').should('not.exist')
                cy.get('[data-cy="explore-set-item"]').should('have.length', sets.length)
            })
        })
    })

    describe('Detail Set', () => {
        beforeEach(() => {
            cy.getSets()
            cy.visit('/')

            cy.getOneSet()
            cy.get('[data-cy="explore-set-item"]').contains(sets[1].name).click()
        })

        it('should show all properties of set', () => {
            cy.get('[data-cy="set-detail-info-container"]').contains(set.name)
            cy.get('[data-cy="set-detail-info-container"]').contains(set.createdBy.username)
            cy.get('[data-cy="set-detail-info-container"]').contains(set.truthCount)
            cy.get('[data-cy="set-detail-info-container"]').contains(set.dareCount)
        })

        it('should show all tasks of set', () => {
            cy.get('[data-cy="set-detail-task"]').should('have.length', set.tasks.length)
        })

        it('should show loading bar when load tasks and hide when loading finished', () => {
            const interception = interceptIndefinitely('GET', `${api}/**`, "getTasksIndefinitely", { fixture: 'set.json' })
            cy.visit('/')
            cy.get('[data-cy="explore-set-item"]').contains(sets[1].name).click()

            cy.get('[data-cy="detail-set-progress-bar"]').should('be.visible').then(() => {
                interception.sendResponse()
                cy.wait('@getTasksIndefinitely')
                cy.get('[data-cy="detail-set-progress-bar"]').should('not.exist')
                cy.get('[data-cy="set-detail-task"]').should('have.length', set.tasks.length)
            })
        })

        it('should show modal when click on task', () => {
            cy.get('[data-cy="set-detail-task"]').contains(replaceStringWithIcon(set.tasks[0].message)).click()

            cy.get('.action-sheet-container').should('be.visible')
        })

        // This field is removed since we do not require it for the current version
        // it('should show toast when click on three dots in nav', () => {
        //     cy.get('[data-cy="set-details-threedot-icon"]').click()

        //     cy.get('ion-toast').shadow().contains('Clicked options button')
        // })

        // it('should close toast when click hide when toast is open', () => {
        //     cy.get('[data-cy="set-details-threedot-icon"]').click()
        //     cy.get('ion-toast').shadow().contains('Clicked options button')

        //     cy.get('ion-toast').shadow().find('.toast-button').contains('hide').click()
        //     cy.get('ion-toast').shadow().should('not.exist')
        // })

        it('should redirect to game page and add set to state when click play button', () => {
            cy.get('[data-cy="setdetails-play-button"]').click()

            cy.overmind().its('state.game.set.name').should('equal', set.name)

            cy.get('[data-cy="game-player-actionblock"]').should('be.visible')
            cy.get('[data-cy="game-set-actionblock"]').should('be.visible')
        })
    })
})

export { }

