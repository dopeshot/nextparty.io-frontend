describe('Register', () => {
    beforeEach(() => {
        cy.visit('/account/register')
    })

    it('should display login when click login instead', () => {
        cy.get('[data-cy="register-login-link"]').click()
        cy.get('h1').contains('Welcome back!')
    })

    it('should have a disabled state button when no input/one input is filled', () => {
        cy.get('[data-cy="register-username-input"]').clear()
        cy.get('[data-cy="register-button"]').should('have.class', 'bg-dare-green opacity-30')

        cy.get('[data-cy="register-username-input"]').type("hee")
        cy.get('[data-cy="register-button"]').should('have.class', 'bg-dare-green opacity-30')
    })

    it('should open profile page when fill all inputs and click register', () => {
        cy.register()
        cy.getSetsFromUser()

        cy.get('[data-cy="register-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="register-username-input"]').type('Hello')
        cy.get('[data-cy="register-password-input"]').type('12345678')

        cy.get('[data-cy="register-button"]').click()

        cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
            cy.get('h1').contains(name).should('be.visible')
        })
    })

    it('should show/hide password when toggle eye', () => {
        cy.get('[data-cy="register-password-input"]').type('1234')
        cy.get('[data-cy="register-password-input"]').should('have.attr', 'type', 'password')

        cy.get('[data-cy="password-eye-button"]').click()
        cy.get('[data-cy="register-password-input"]').should('have.attr', 'type', 'text')
    })

    it('should change eye icon when show/hide password', () => {
        cy.get('[data-cy="register-password-input"]').type('1234')
        cy.get('[data-cy="password-eye-close"]').should('be.visible')

        cy.get('[data-cy="password-eye-button"]').click()
        cy.get('[data-cy="password-eye-open"]').should('be.visible')
    })

    describe('Input Validation', () => {
        // Email
        it('should show error when email input is empty', () => {
            cy.get('[data-cy="register-email-input"]').clear().blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('email is required')
        })

        it('should show error when email input not have valid email format', () => {
            cy.get('[data-cy="register-email-input"]').type('joy').blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('email must be a valid email')
        })

        it('should not show error when email input have valid email format', () => {
            cy.get('[data-cy="register-email-input"]').type('joy@gmail.com').blur()
            cy.get('[data-cy="error-message"]').should('not.exist')
        })

        // Username
        it('should show error when username input is empty', () => {
            cy.get('[data-cy="register-username-input"]').clear().blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('username is required')
        })

        it('should show error when username input has less than three characters', () => {
            cy.get('[data-cy="register-username-input"]').type('He').blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('username must be at least 3 characters long')
        })

        it('should show error when username input has more than 24 characters', () => {
            cy.get('[data-cy="register-username-input"]').type('Hello this text is longer than 24 chars').blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('username cannot be longer than 24 characters')
        })

        it('should not show error when username has no issues', () => {
            cy.get('[data-cy="register-username-input"]').type('Hello').blur()
            cy.get('[data-cy="error-message"]').should('not.exist')
        })

        // Password
        it('should show error when password input is empty', () => {
            cy.get('[data-cy="register-password-input"]').clear().blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('password is required')
        })

        it('should show error when password input has less than eight characters', () => {
            cy.get('[data-cy="register-password-input"]').type('1234').blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('password must be at least 8 characters long')
        })

        it('should show error when password input has more than 124 characters', () => {
            cy.get('[data-cy="register-password-input"]').type('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna ale').blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('password cannot be longer than 124 characters')
        })

        it('should not show error when password has no issues', () => {
            cy.get('[data-cy="register-password-input"]').type('123456789').blur()
            cy.get('[data-cy="error-message"]').should('not.exist')
        })
    })

    describe('Error Handling', () => {
        it('should show error banner with text "Email is already taken." when email is wrong', () => {
            cy.registerDuplicateEmail()

            cy.get('[data-cy="register-email-input"]').type('joy@gmail.com')
            cy.get('[data-cy="register-username-input"]').type('Hello')
            cy.get('[data-cy="register-password-input"]').type('123456789')

            cy.get('[data-cy="register-button"]').click()

            cy.get('[data-cy="register-error-banner"]').contains('Email is already taken.')
        })

        it('should show error banner with text "Username is already taken." when password is wrong', () => {
            cy.registerDuplicateUsername()

            cy.get('[data-cy="register-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="register-username-input"]').type('Hello')
            cy.get('[data-cy="register-password-input"]').type('123456789')

            cy.get('[data-cy="register-button"]').click()

            cy.get('[data-cy="register-error-banner"]').contains('Username is already taken.')
        })

        it('should show error banner with text "408 - Request Timeout" when database is down', () => {
            cy.databasedown()

            cy.get('[data-cy="register-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="register-username-input"]').type('Hello')
            cy.get('[data-cy="register-password-input"]').type('12345678')

            cy.get('[data-cy="register-button"]').click()

            cy.get('[data-cy="register-error-banner"]').contains('408 - Request Timeout')
        })
    })
})

export { }

