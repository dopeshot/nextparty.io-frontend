describe('Game', () => {
    describe('Game UI', () => {
        beforeEach(() => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('players.resetPlayer')
            cy.overmind().its('actions').invoke('game.resetSet')

            cy.overmind().its('actions').invoke('players.addTestPlayer')
            cy.overmind().its('actions').invoke('game.addTestSet')

            cy.get('[data-cy="game-play-button"]').click()
        })

        it('should open truth screen when click on truth', () => {
            cy.get('[data-cy="choosetask-truth-button"]').click()
            cy.get('[data-cy="displaytask-container"]').contains('Truth')
        })

        it('should open dare screen when click on dare', () => {
            cy.get('[data-cy="choosetask-dare-button"]').click()
            cy.get('[data-cy="displaytask-container"]').contains('Dare')
        })

        it('should only display dare when in set are only dares', () => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('game.resetSet')
            cy.overmind().its('actions').invoke('game.addTestSet', "dare")
            cy.get('[data-cy="game-set-actionblock"]').contains('Only Dares')
            cy.get('[data-cy="game-play-button"]').click()

            cy.get('[data-cy="choosetask-dare-button"]').should('be.visible')
            cy.get('[data-cy="choosetask-truth-button"]').should('not.exist')
        })

        it('should only display truth when in set are only truths', () => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('game.resetSet')
            cy.overmind().its('actions').invoke('game.addTestSet', "truth")
            cy.get('[data-cy="game-set-actionblock"]').contains('Only Truths')
            cy.get('[data-cy="game-play-button"]').click()

            cy.get('[data-cy="choosetask-truth-button"]').should('be.visible')
            cy.get('[data-cy="choosetask-dare-button"]').should('not.exist')
        })

        it('should display truth/dare selection when you click on screen when there is a truth or dare question', () => {
            cy.get('[data-cy="choosetask-truth-button"]').click()
            cy.get('[data-cy="displaytask-container"]').contains('Truth')

            cy.get('[data-cy="displaytask-container"]').click('center')
            cy.get('[data-cy="choosetask-truth-button"]').should('be.visible')
            cy.get('[data-cy="choosetask-dare-button"]').should('be.visible')

            cy.get('[data-cy="choosetask-dare-button"]').click()
            cy.get('[data-cy="displaytask-container"]').contains('Dare')

            cy.get('[data-cy="displaytask-container"]').click('center')
            cy.get('[data-cy="choosetask-truth-button"]').should('be.visible')
            cy.get('[data-cy="choosetask-dare-button"]').should('be.visible')
        })

        it('should hide tabbar when you are ingame', () => {
            cy.get('[data-cy="app-tabbar"]').should('not.be.visible')
        })
    })

    describe('Startscreen', () => {
        it('should have unchecked icon and "addplayer" text in actionblock when there is no player added')

        it('should have checked icon and player count text in actionblock when there is are 2 or more players added')

        it('should have unchecked icon and "pick a set" text in actionblock when there is no set added')

        it('should have checked icon and set name + "picked" in actionblock when a set is selected')

        it('should have play button disabled when both set and players are not selected')

        it('should change to Ingame Page when click play button and both set and players are selected')

        it('should change to Player Page when click player-actionblock')

        it('should change to Explore Page when click set-actionblock')
    })
})

export { }

