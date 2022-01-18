describe('Players', () => {
    beforeEach(() => {
        cy.visit('/player')

        cy.overmind().its('actions').invoke('players.resetPlayer')
        cy.overmind().its('actions').invoke('players.addTestPlayer')
    })

    it('should load three sample players on start', () => {
        cy.get('[data-cy="player-input-0"]').should('be.visible')
        cy.get('[data-cy="player-input-1"]').should('be.visible')
        cy.get('[data-cy="player-input-2"]').should('be.visible')

        cy.get('[data-cy="player-input-3"]').should('not.exist')
    })

    it('should add one player when click add player button', () => {
        cy.get('[data-cy="player-add-button"]').click()

        cy.get('[data-cy="player-input-3"]').should('be.visible')
        cy.get('[data-cy="player-input-3"]').type('Maxi')
    })

    it('should remove one player', () => {
        cy.overmind().its('actions').invoke('players.addPlayer')

        cy.get('[data-cy="player-input-3"] [data-cy="player-input-close-button"]').click()

        cy.get('[data-cy="player-input-3"]').should('not.exist')
    })

    it('should only be possible to remove player when there are more than 2 players', () => {
        cy.get('[data-cy="player-input-2"] [data-cy="player-input-close-button"]').click()

        cy.get('[data-cy="player-input-0"]').should('be.visible')
        cy.get('[data-cy="player-input-1"]').should('be.visible')
        cy.get('[data-cy="player-input-2"]').should('not.exist')

        cy.get('[data-cy="player-input-0"] [data-cy="player-input-close-button"]').should('not.exist')
        cy.get('[data-cy="player-input-1"] [data-cy="player-input-close-button"]').should('not.exist')
    })

    it('should remove all inputs except last two when all are empty and you change site', () => {
        cy.overmind().its('actions').invoke('players.addPlayer')

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
        cy.overmind().its('actions').invoke('players.addPlayer')

        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-female-button"]').should('be.visible')
        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-male-button"]').should('not.exist')
        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-diverse-button"]').should('not.exist')
    })

    it('should toggle gender when click on gender button', () => {
        cy.overmind().its('actions').invoke('players.addPlayer')
        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-female-button"]').should('be.visible')

        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-female-button"]').click()
        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-male-button"]').should('be.visible')

        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-male-button"]').click()
        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-diverse-button"]').should('be.visible')

        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-diverse-button"]').click()
        cy.get('[data-cy="player-input-3"] [data-cy="player-input-gender-female-button"]').should('be.visible')
    })

    it('should change player name', () => {
        cy.overmind().its('actions').invoke('players.addPlayer')
        cy.get('[data-cy="player-input-3"] input').type('Maxi').should('have.value', 'Maxi')

        cy.get('[data-cy="player-input-3"] input').clear().type('Max').should('have.value', 'Max')
    })

    it('should remove empty inputs when leaving site', () => {
        cy.overmind().its('actions').invoke('players.addPlayer')
        cy.get('[data-cy="player-input-2"] input').clear()

        cy.get('[data-cy="app-nav-game"]').click()
        cy.get('[data-cy="app-nav-player"]').click()

        cy.get('[data-cy="player-input-2"]').should('not.exist')
        cy.get('[data-cy="player-input-3"]').should('not.exist')

        cy.get('[data-cy="player-input-0"]').should('be.visible')
        cy.get('[data-cy="player-input-1"]').should('be.visible')
    })

    it('should add new player input when press enter in input', () => {
        cy.get('[data-cy="player-input-2"]').type('{enter}')
        cy.get('[data-cy="player-input-3"]').should('be.visible')
    })

    it('should delete player input when press backspace in empty input', () => {
        cy.overmind().its('actions').invoke('players.addPlayer')

        cy.get('[data-cy="player-input-3"]').type('Hello')
        cy.get('[data-cy="player-input-3"]').should('be.visible')

        cy.get('[data-cy="player-input-3"]').clear().type('{backspace}')
        cy.get('[data-cy="player-input-3"]').should('not.exist')
    })
})

export { }

