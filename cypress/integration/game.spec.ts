import { Player } from "../../src/overmind/players/state"

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

        it('should only display dare when in set are only dares and clickarea should be the whole screen', () => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('game.resetSet')
            cy.overmind().its('actions').invoke('game.addTestSet', "dare")

            cy.overmind().its('state.game.set.name').then((name: string) => {
                cy.get('[data-cy="game-set-actionblock"]').contains(name)
                cy.get('[data-cy="game-play-button"]').click()

                cy.get('[data-cy="choosetask-dare-button"]').should('be.visible')
                cy.get('[data-cy="choosetask-truth-button"]').should('not.exist')

                cy.get('[data-cy="choosetask-dare-button"]').click('left')
                cy.get('[data-cy="displaytask-container"]').should('be.visible')
            })
        })

        it('should only display truth when in set are only truths and clickarea should be the whole screen', () => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('game.resetSet')
            cy.overmind().its('actions').invoke('game.addTestSet', "truth")

            cy.overmind().its('state.game.set.name').then((name: string) => {
                cy.get('[data-cy="game-set-actionblock"]').contains(name)
                cy.get('[data-cy="game-play-button"]').click()

                cy.get('[data-cy="choosetask-truth-button"]').should('be.visible')
                cy.get('[data-cy="choosetask-dare-button"]').should('not.exist')

                cy.get('[data-cy="choosetask-truth-button"]').click('right')
                cy.get('[data-cy="displaytask-container"]').should('be.visible')
            })
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

        it('container should have height: 250px when message shorter than 100 letters when longer than height: 450px', () => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('game.resetSet')
            cy.overmind().its('actions').invoke('game.addTestSet', "longmessage")

            cy.overmind().its('state.game.set.name').then((name: string) => {
                cy.get('[data-cy="game-set-actionblock"]').contains(name)
                cy.get('[data-cy="game-play-button"]').click()

                // Short Message
                cy.get('[data-cy="choosetask-truth-button"]').click()
                cy.get('[data-cy="displaytask-task-container"]').should('have.css', 'height', "250px").click()

                // Long Message
                cy.get('[data-cy="choosetask-dare-button"]').click()
                cy.get('[data-cy="displaytask-task-container"]').should('have.css', 'height', "450px").click()
            })
        })

        it('should hide tabbar when you are ingame and display again when you leave screen', () => {
            cy.get('[data-cy="app-tabbar"]').should('not.be.visible')
            cy.get('[data-cy="ingame-back-button"]').click()
            cy.get('[data-cy="app-tabbar"]').should('be.visible')
        })
    })

    describe('Startscreen', () => {
        beforeEach(() => {
            cy.visit('/game')
            cy.overmind().its('actions').invoke('players.resetPlayer')
            cy.overmind().its('actions').invoke('game.resetSet')
        })

        it('should have unchecked icon and "Add player" text in actionblock when there is no player added', () => {
            cy.get('[data-cy="game-player-actionblock"] [data-cy="minuscircle-icon"]').should('be.visible')
            cy.get('[data-cy="game-player-actionblock"]').contains('Add player')
        })

        it('should have checked icon and player count text in actionblock when there is are 2 or more players added', () => {
            cy.overmind().its('actions').invoke('players.addTestPlayer')

            cy.overmind().its('state.players.players').then((players: Player[]) => {
                cy.get('[data-cy="game-player-actionblock"] [data-cy="checkcircle-icon"]').should('be.visible')
                cy.get('[data-cy="game-player-actionblock"]').contains(`${players.length} players added`)
            })
        })

        it('should have unchecked icon and "Pick a set to play" text in actionblock when there is no set added', () => {
            cy.get('[data-cy="game-set-actionblock"] [data-cy="minuscircle-icon"]').should('be.visible')
            cy.get('[data-cy="game-set-actionblock"]').contains('Pick a set to play')
        })

        it('should have checked icon and set name + "picked" in actionblock when a set is selected', () => {
            cy.overmind().its('actions').invoke('game.addTestSet')

            cy.overmind().its('state.game.set.name').then((name: string) => {
                cy.get('[data-cy="game-set-actionblock"] [data-cy="checkcircle-icon"]').should('be.visible')
                cy.get('[data-cy="game-set-actionblock"]').contains(`${name} picked`)
            })
        })

        it('should have play button disabled when both set and players are not selected', () => {
            cy.get('[data-cy="game-play-button"]').should('have.class', 'bg-dare-green opacity-30')
        })

        it('should have play button disabled when set or players are not selected', () => {
            cy.overmind().its('actions').invoke('game.addTestSet')
            cy.get('[data-cy="game-play-button"]').should('have.class', 'bg-dare-green opacity-30')

            cy.overmind().its('actions').invoke('game.resetSet')
            cy.overmind().its('actions').invoke('players.addTestPlayer')
            cy.get('[data-cy="game-play-button"]').should('have.class', 'bg-dare-green opacity-30')
        })

        it('should change to Ingame Page when click play button and both set and players are selected', () => {
            cy.overmind().its('actions').invoke('game.addTestSet')
            cy.overmind().its('actions').invoke('players.addTestPlayer')

            cy.get('[data-cy="game-play-button"]').click()
            cy.get('[data-cy="choosetask-truth-button"]').should('be.visible')
            cy.get('[data-cy="choosetask-dare-button"]').should('be.visible')
        })

        it('should change to Player Page when click player-actionblock', () => {
            cy.overmind().its('actions').invoke('game.addTestSet')
            cy.overmind().its('actions').invoke('players.addTestPlayer')

            cy.get('[data-cy="game-player-actionblock"]').click({ force: true })
            cy.get('h1').contains('Players')
        })

        it('should change to Explore Page when click set-actionblock', () => {
            cy.overmind().its('actions').invoke('game.addTestSet')
            cy.overmind().its('actions').invoke('players.addTestPlayer')

            cy.get('[data-cy="game-set-actionblock"]').click({ force: true })
            cy.get('h1').contains('Explore')
        })
    })
})

export { }

