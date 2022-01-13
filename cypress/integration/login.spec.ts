describe('Login', () => {
    beforeEach(() => {
        cy.visit('/account/login')
    })

    it('should have a disabled state button when no input/one input is filled', () => {
        cy.get('[data-cy="login-password-input"]').clear()
        cy.get('[data-cy="login-button"]').should('have.class', 'bg-dare-green opacity-30')

        cy.get('[data-cy="login-password-input"]').type("12345678")
        cy.get('[data-cy="login-button"]').should('have.class', 'bg-dare-green opacity-30')
    })

    it('should open profile page when fill all inputs and click register', () => {
        cy.login()
        cy.getSetsFromUser()

        cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
        cy.get('[data-cy="login-password-input"]').type('12345678')

        cy.get('[data-cy="login-button"]').click()

        cy.overmind().its('state.profile.currentUser.username').then((name: string) => {
            cy.get('h1').contains(name).should('be.visible')
        })
    })

    it('should show/hide password when toggle eye', () => {
        cy.get('[data-cy="login-password-input"]').type('1234')
        cy.get('[data-cy="login-password-input"]').should('have.attr', 'type', 'password')

        cy.get('[data-cy="password-eye-button"]').click()
        cy.get('[data-cy="login-password-input"]').should('have.attr', 'type', 'text')
    })

    it('should change eye icon when show/hide password', () => {
        cy.get('[data-cy="login-password-input"]').type('1234')
        cy.get('[data-cy="password-eye-close"]').should('be.visible')

        cy.get('[data-cy="password-eye-button"]').click()
        cy.get('[data-cy="password-eye-open"]').should('be.visible')
    })

    describe('Input Validation', () => {
        // Email
        it('should show error when email input is empty', () => {
            cy.get('[data-cy="login-email-input"]').clear().blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('email is required')
        })

        it('should show error when email input not have valid email format', () => {
            cy.get('[data-cy="login-email-input"]').type('joy').blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('email must be a valid email')
        })

        it('should not show error when email input have valid email format', () => {
            cy.get('[data-cy="login-email-input"]').type('joy@gmail.com').blur()
            cy.get('[data-cy="error-message"]').should('not.exist')
        })

        // Password
        it('should show error when password input is empty', () => {
            cy.get('[data-cy="login-password-input"]').clear().blur()
            cy.get('[data-cy="error-message"]').should('be.visible').contains('password is required')
        })

        it('should not show error when password has no issues', () => {
            cy.get('[data-cy="login-password-input"]').type('123456789').blur()
            cy.get('[data-cy="error-message"]').should('not.exist')
        })
    })

    describe('Error Handling', () => {
        it('should show error banner with text "Email or password is wrong" when email is wrong', () => {
            cy.loginWrongCredentials()

            cy.get('[data-cy="login-email-input"]').type('joy@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('123456789')

            cy.get('[data-cy="login-button"]').click()

            cy.get('[data-cy="login-error-banner"]').contains('Email or password is wrong')
        })

        it('should show error banner with text "Email or password is wrong" when password is wrong', () => {
            cy.loginWrongCredentials()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('333')

            cy.get('[data-cy="login-button"]').click()

            cy.get('[data-cy="login-error-banner"]').contains('Email or password is wrong')
        })

        it('should show error banner with text "This user is banned. Please contact the administrator" when user is banned', () => {
            cy.loginBannedUser()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.get('[data-cy="login-error-banner"]').contains('This user is banned. Please contact the administrator')
        })

        it('should show error banner with text "408 - Request Timeout" when database is down', () => {
            cy.databasedown()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.get('[data-cy="login-error-banner"]').contains('408 - Request Timeout')
        })
    })
})

export { }

