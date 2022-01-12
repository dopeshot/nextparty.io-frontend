describe('Mail Verify', () => {
    it('should display loading while waiting for mail verification', () => {

    })
    it('should display success message when code is correct', () => {
        cy.getMail("success")
        cy.visit('/account/verify-account?code=1234')


    })

    it('should display fail message when code is incorrect', () => {
        cy.getMail("success")
        cy.visit('/account/verify-account?code=1234')


    })
})


export { }

