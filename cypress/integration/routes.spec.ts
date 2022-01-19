import set from '../fixtures/set.json'
import sets from '../fixtures/sets.json'

describe('Routes', () => {
    describe('Logged in', () => {
        it('should display profile when click on profile tab', () => {
            cy.visit('/account')
            cy.overmind().its('actions').invoke('profile.setTestUser')

            cy.get('[data-cy="app-nav-profile"]').click()

            cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
                cy.get('h1').contains(name)
            })
        })

        it('should display profile when visit /account', () => {
            cy.visit('/account/profile')
            cy.overmind().its('actions').invoke('profile.setTestUser')

            cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
                cy.get('h1').contains(name)
            })
        })

        it('should display profile when visit /account/profile', () => {
            cy.visit('/account/profile')
            cy.overmind().its('actions').invoke('profile.setTestUser')

            cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
                cy.get('h1').contains(name)
            })
        })

        it('should display profile when visit /account/login', () => {
            cy.visit('/account/login')
            cy.overmind().its('actions').invoke('profile.setTestUser')

            cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
                cy.get('h1').contains(name)
            })
        })

        it('should display profile when visit /account/register', () => {
            cy.visit('/account/register')
            cy.overmind().its('actions').invoke('profile.setTestUser')

            cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
                cy.get('h1').contains(name)
            })
        })
    })

    describe('Not Logged in', () => {
        beforeEach(() => {
            cy.visit('/account')
        })

        it('should display guest landing when click on profile tab', () => {
            cy.get('[data-cy="app-nav-profile"]').click()
            cy.get('h1').contains('Create your own questions')
        })

        it('should display login when visit /account/login', () => {
            cy.visit('/account/login')
            cy.get('h1').contains('Welcome back!')
        })

        it('should display register when visit /account/register', () => {
            cy.visit('/account/register')
            cy.get('h1').contains('Create an account')
        })
    })

    describe('Guest Landing', () => {
        beforeEach(() => {
            cy.visit('/account')
        })

        it('should display register when click sign up with email', () => {
            cy.get('[data-cy="guestlanding-signup-button"]').click()
            cy.get('h1').contains('Create an account')
        })

        it('should display login when click login instead link', () => {
            cy.get('[data-cy="guestlanding-login-link"]').click()
            cy.get('h1').contains('Welcome back!')
        })
    })

    describe('Routes Icons', () => {
        beforeEach(() => {
            cy.getSets()
            cy.visit('/explore')

            cy.wait('@getSets')
        })

        it('should show solid home icon when on explore tab', () => {
            cy.visit('/player')
            cy.get('[data-cy="app-nav-explore"]').click()
            cy.wait('@getSets')

            cy.get('[data-cy="home-icon-solid"]').should('be.visible')
            cy.get('[data-cy="play-icon"]').should('be.visible')
            cy.get('[data-cy="player-icon"]').should('be.visible')
            cy.get('[data-cy="profile-icon"]').should('be.visible')
        })

        it('should show solid play icon when on game tab', () => {
            cy.get('[data-cy="app-nav-game"]').click()

            cy.get('[data-cy="home-icon"]').should('be.visible')
            cy.get('[data-cy="play-icon-solid"]').should('be.visible')
            cy.get('[data-cy="player-icon"]').should('be.visible')
            cy.get('[data-cy="profile-icon"]').should('be.visible')
        })

        it('should show solid player icon when on explore tab', () => {
            cy.get('[data-cy="app-nav-player"]').click()

            cy.get('[data-cy="home-icon"]').should('be.visible')
            cy.get('[data-cy="play-icon"]').should('be.visible')
            cy.get('[data-cy="player-icon-solid"]').should('be.visible')
            cy.get('[data-cy="profile-icon"]').should('be.visible')
        })

        it('should show solid profile icon when on explore tab', () => {
            cy.get('[data-cy="app-nav-profile"]').click()

            cy.get('[data-cy="home-icon"]').should('be.visible')
            cy.get('[data-cy="play-icon"]').should('be.visible')
            cy.get('[data-cy="player-icon"]').should('be.visible')
            cy.get('[data-cy="profile-icon-solid"]').should('be.visible')
        })

        it('should have slug in set details', () => {
            cy.getOneSet()
            cy.get('[data-cy="explore-set-item"]').contains(sets[1].name).click()

            cy.url().should('include', `explore/${set._id}/${set.slug}`)
        })
    })
})

export { }

