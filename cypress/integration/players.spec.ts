describe('Players', () => {
    beforeEach(() => {
        cy.visit('/player')
    })

    it('should load two sample players on start', () => {
        cy.get('[data-cy="player-input-0"]').should('be.visible')
        cy.get('[data-cy="player-input-1"]').should('be.visible')

        cy.get('[data-cy="player-input-2"]').should('not.exist')
    })

    it('should add one player', () => {
        cy.get('[data-cy="player-add-button"]').click()

        cy.get('[data-cy="player-input-2"]').should('be.visible')
        cy.get('[data-cy="player-input-2"]').type('Maxi')


    })

    it('should remove one player', () => {
        cy.get('[data-cy="player-add-button"]').click()
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-close-button"]').click()

        cy.get('[data-cy="player-input-2"]').should('not.exist')
    })

    it('should only be possible to remove player when there are more than 2 players', () => {
        cy.get('[data-cy="player-input-0"]').should('be.visible')
        cy.get('[data-cy="player-input-1"]').should('be.visible')
        cy.get('[data-cy="player-input-2"]').should('not.exist')

        cy.get('[data-cy="player-input-0"] [data-cy="player-input-close-button"]').should('not.exist')
        cy.get('[data-cy="player-input-1"] [data-cy="player-input-close-button"]').should('not.exist')
    })
})