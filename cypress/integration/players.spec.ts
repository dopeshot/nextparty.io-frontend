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

    it('should remove all inputs except last two when all are empty and you change site', () => {
        cy.get('[data-cy="player-add-button"]').click()

        cy.get('[data-cy="player-input-0"] input').should('be.visible').clear()
        cy.get('[data-cy="player-input-1"] input').should('be.visible').clear()
        cy.get('[data-cy="player-input-2"] input').should('be.visible').clear()

        cy.get('[data-cy="app-nav-game"]').click()
        cy.get('[data-cy="app-nav-player"]').click()

        cy.get('[data-cy="player-input-0"] input').should('have.value', '')
        cy.get('[data-cy="player-input-1"] input').should('have.value', '')
        cy.get('[data-cy="player-input-2"] input').should('not.exist')
    })

    it('should have female gender when add player', () => {
        cy.get('[data-cy="player-add-button"]').click()

        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-female-button"]').should('be.visible')
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-male-button"]').should('not.exist')
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-diverse-button"]').should('not.exist')
    })

    it('should toggle gender when click on gender button', () => {
        cy.get('[data-cy="player-add-button"]').click()
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-female-button"]').should('be.visible')

        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-female-button"]').click()
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-male-button"]').should('be.visible')

        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-male-button"]').click()
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-diverse-button"]').should('be.visible')

        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-diverse-button"]').click()
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-gender-female-button"]').should('be.visible')
    })

    it('should change player name', () => {
        cy.get('[data-cy="player-add-button"]').click()
        cy.get('[data-cy="player-input-2"] input').type('Maxi').should('have.value', 'Maxi')

        cy.get('[data-cy="player-input-2"] input').clear().type('Max').should('have.value', 'Max')
    })

    it('should remove empty inputs when leaving site', () => {
        cy.get('[data-cy="player-add-button"]').click()
        cy.get('[data-cy="player-input-2"]').should('be.visible')

        cy.get('[data-cy="app-nav-game"]').click()
        cy.get('[data-cy="app-nav-player"]').click()

        cy.get('[data-cy="player-input-2"]').should('not.exist')

        cy.get('[data-cy="player-input-0"]').should('be.visible')
        cy.get('[data-cy="player-input-1"]').should('be.visible')
    })
})

export { }

