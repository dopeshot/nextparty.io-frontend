describe('Mail Verify', () => {
    it('should display loading while waiting for mail verification', () => {

    })
    it('should display success message when code is correct', () => {
        cy.getMail("success")
        cy.visit('/account/verify-account/1234')
        cy.contains("Success").should("be.visible")
    })

    it('should display fail message when code is incorrect', () => {
        cy.getMail("fail")
        cy.visit('/account/verify-account/1234')
        cy.contains("Failed").should("be.visible")
    })
})


export { }

