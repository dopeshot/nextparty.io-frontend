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

        it('should display login when visit /account/profile', () => {
            cy.visit('/account/profile')
            cy.get('h1').contains('Welcome back!')
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
})

export { }

