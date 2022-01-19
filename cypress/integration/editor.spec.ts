import set from '../fixtures/set.json'

describe('Editor', () => {
    describe('Navigate', () => {
        beforeEach(() => {
            cy.visit('/account/login')
            cy.getProfileVerified()
            cy.getSetsFromUser()
            cy.login()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.wait('@login')
            cy.wait('@getSetsFromUser')
            cy.wait('@getProfileVerified')
        })

        it('should open create set page when click new on empty set page', () => {
            cy.visit('/account/login')
            cy.getProfileVerified()
            cy.getEmptySetsFromUser()
            cy.login()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.wait('@login')
            cy.wait('@getEmptySetsFromUser')
            cy.wait('@getProfileVerified')

            cy.contains('Start creating awesome sets!').should('be.visible')

            cy.contains('New').click()

            cy.contains('Create Set').should('be.visible')
        })

        it('should open edit set when click on set', () => {
            cy.getOneSet()
            cy.get('[data-cy="profile-set-item"]').first().click()

            cy.wait('@getOneSet')

            cy.contains('Edit Set').should('be.visible')
        })

        it('should open editor with new set when click new button', () => {
            cy.contains('New').click()

            cy.contains('Create Set').should('be.visible')
        })
    })

    describe.only('Metaeditor', () => {
        beforeEach(() => {
            cy.visit('/account/login')
            cy.getProfileVerified()
            cy.getSetsFromUser()
            cy.login()

            cy.get('[data-cy="login-email-input"]').type('hello@gmail.com')
            cy.get('[data-cy="login-password-input"]').type('12345678')

            cy.get('[data-cy="login-button"]').click()

            cy.wait('@login')
            cy.wait('@getSetsFromUser')
            cy.wait('@getProfileVerified')

            cy.contains('New').click()
        })

        it('should change to edit set when click create set', () => {
            cy.get('[data-cy="metaeditor-title-input"]').type(set.name)

            cy.addSet()
            cy.getOneSet()
            cy.get('[data-cy="metaeditor-set-button"]').click()

            cy.wait('@addSet')
            cy.wait('@getOneSet')

            cy.contains('Edit Set').should('be.visible')
        })

        it('should change theme when use theme picker', () => {
            cy.get('[data-cy="metaeditor-theme-picker-button"]').click()
            cy.get('[data-cy="metaeditor-theme-picker-kids"]').first().click({ force: true })

            cy.get('[data-cy="metaeditor-theme-picker-kids"]').should('not.be.visible')
            cy.contains('kids').should('be.visible')
        })

        it('should open theme picker when click input and close when click "close"', () => {
            cy.get('[data-cy="metaeditor-theme-picker-button"]').click()

            cy.contains('Close').click()
            cy.get('[data-cy="metaeditor-theme-picker-kids"]').should('not.be.visible')
        })

        it('should open language picker when click input', () => {
            cy.get('[data-cy="metaeditor-language-picker-button"]').click()
            cy.get('ion-picker').should('be.visible')

            cy.contains('Confirm').click()
        })

        it('should change visibility when click toggle', () => {
            cy.get('[data-cy="metaeditor-visibility-picker"]').click()
            cy.contains('private').should('be.visible')
            cy.get('[data-cy="metaeditor-visibility-picker"]').click()
            cy.contains('public').should('be.visible')
        })

        describe('Input Validation', () => {
            it('should show error when name is empty', () => {
                cy.get('[data-cy="metaeditor-title-input"]').clear().blur()
                cy.get('[data-cy="error-message"]').should('be.visible').contains('Name is a required field')
            })

            it('should show error when title is less than 3 letters', () => {
                cy.get('[data-cy="metaeditor-title-input"]').clear().type('He').blur()
                cy.get('[data-cy="error-message"]').should('be.visible').contains('Your creative name must be at least 3 characters')
            })

            it('should show error when title is more than 32 letters', () => {
                cy.get('[data-cy="metaeditor-title-input"]').clear().type('Lorem ipsum dolor sit amet, conse').blur()
                cy.get('[data-cy="error-message"]').should('be.visible').contains('Your creative name must be at most 32 characters')
            })
        })
    })
})