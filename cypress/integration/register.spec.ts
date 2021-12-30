describe('Register', () => {
    beforeEach(() => {
        cy.visit('/account/register')
    })

    it('should display login when click login instead', () => {
        cy.get('[data-cy="register-login-link"]').click()
        cy.get('h1').contains('Welcome back!')
    })

    it('should have a disabled state button when no input/one input is filled', () => {
        cy.get('[data-cy="register-email-input"]').clear()
        cy.get('[data-cy="register-username-input"]').clear()
        cy.get('[data-cy="register-password-input"]').clear()
        cy.get('[data-cy="register-button"]').should('have.class', 'bg-dare-green opacity-30')

        cy.get('[data-cy="register-username-input"]').type("hee")
        cy.get('[data-cy="register-button"]').should('have.class', 'bg-dare-green opacity-30')
    })

    it('should open profile page when fill all inputs and click register', () => {
        cy.register()
        cy.getSetsFromUser()

        cy.get('[data-cy="register-email-input"]').type('he@gmail.com')
        cy.get('[data-cy="register-username-input"]').type('gedd')
        cy.get('[data-cy="register-password-input"]').type('12345678')

        cy.get('[data-cy="register-button"]').click()
    })
})

export { }

