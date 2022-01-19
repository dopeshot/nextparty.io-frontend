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

    describe('Meta Editor', () => {
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

    describe('Task Editor', () => {
        describe('Create Task', () => {
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

                cy.get('[data-cy="metaeditor-title-input"]').type(set.name)

                cy.getOneSetEmptyTask()
                cy.addSet()
                cy.get('[data-cy="metaeditor-set-button"]').click()

                cy.wait('@addSet')
                cy.wait('@getOneSetEmptyTask')

                cy.contains('Edit Set').should('be.visible')
            })

            it('should open modal when click create task input', () => {
                cy.get('[data-cy="taskeditor-addtask-input"]').click()

                cy.get('[data-cy="taskeditor-modal"]').should('be.visible')
            })

            it('should open modal when click create task button', () => {
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

                cy.get('[data-cy="metaeditor-title-input"]').type(set.name)

                cy.getOneSet()
                cy.addSet()
                cy.get('[data-cy="metaeditor-set-button"]').click()

                cy.wait('@addSet')
                cy.wait('@getOneSet')

                cy.contains('Edit Set').should('be.visible')

                cy.get('[data-cy="taskeditor-addtask-button"]').click()
                cy.get('textarea').click().type('Create new Tasks!', { force: true })
                cy.contains('Save').click()
            })

            it('should change gender when click "Which gender can play the task?"', () => {
                cy.get('[data-cy="taskeditor-addtask-input"]').click()

                cy.get('[data-cy="taskeditor-currentplayer-@cf"]').click({ force: true })
                cy.contains('female').should('be.visible')

                cy.get('[data-cy="taskeditor-currentplayer-@cm"]').click({ force: true })
                cy.contains('male').should('be.visible')

                cy.get('[data-cy="taskeditor-currentplayer-@ca"]').click({ force: true })
                cy.contains('anyone').should('be.visible')
            })

            it('should add player in message when click label gender anyone', () => {
                cy.get('[data-cy="taskeditor-addtask-input"]').click()
                cy.get('[data-cy="taskeditor-player-@a"]').click({ force: true })
                cy.get('textarea').should('have.value', '👤')
            })

            it('should add player in message when click label gender female', () => {
                cy.get('[data-cy="taskeditor-addtask-input"]').click()
                cy.get('[data-cy="taskeditor-player-@f"]').click({ force: true })
                cy.get('textarea').should('have.value', '👩')
            })

            it('should add player in message when click label gender male', () => {
                cy.get('[data-cy="taskeditor-addtask-input"]').click()
                cy.get('[data-cy="taskeditor-player-@m"]').click({ force: true })
                cy.get('textarea').should('have.value', '👨')
            })

            it('should change to truth/dare when click truth/dare', () => {
                cy.get('[data-cy="taskeditor-addtask-input"]').click()

                cy.get('[data-cy="taskeditor-taskstype-dare"]').click({ force: true })
                cy.get('[data-cy="taskeditor-taskstype-dare-label"]').should('have.class', 'bg-light-500')

                cy.get('[data-cy="taskeditor-taskstype-truth"]').click({ force: true })
                cy.get('[data-cy="taskeditor-taskstype-truth-label"]').should('have.class', 'bg-light-500')
            })

            describe('Input Validation', () => {
                beforeEach(() => {
                    cy.get('[data-cy="taskeditor-addtask-input"]').click()
                })

                it('should show error when message is empty', () => {
                    cy.get('[data-cy="taskeditor-textarea"]').clear()
                    cy.get('[data-cy="error-message"]').should('be.visible').contains('message is a required field')
                })

                it('should show error when message has less than 10 letters', () => {
                    cy.get('textarea').click().type('Create!', { force: true })
                    cy.get('[data-cy="error-message"]').should('be.visible').contains('message must be at least 10 characters')
                })

                it('should show error when message has more than 280 letters', () => {
                    cy.get('textarea').click().type('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum hae', { force: true })
                    cy.get('[data-cy="error-message"]').should('be.visible').contains('message must be at most 280 characters')
                })
            })
        })
    })

    describe('Edit Tasks', () => {
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

            cy.get('[data-cy="metaeditor-title-input"]').type(set.name)

            cy.getOneSet()
            cy.addSet()
            cy.get('[data-cy="metaeditor-set-button"]').click()

            cy.wait('@addSet')
            cy.wait('@getOneSet')

            cy.contains('Edit Set').should('be.visible')
        })

        it('should edit task', () => {
            cy.get('[data-cy="taskeditor-tasks"]').first().click()
            cy.contains('Edit task').should('be.visible')

            cy.get('[data-cy="taskeditor-textarea"] textarea').type('Hahah!', { force: true })

            cy.putSet()
            cy.contains('Save').click()

            cy.wait('@putSet')
        })
    })

    describe('Delete Tasks/Set', () => {
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

            cy.get('[data-cy="metaeditor-title-input"]').type(set.name)

            cy.getOneSet()
            cy.addSet()
            cy.get('[data-cy="metaeditor-set-button"]').click()

            cy.wait('@addSet')
            cy.wait('@getOneSet')

            cy.contains('Edit Set').should('be.visible')
        })

        it('should delete task when delete with modal and delete button', () => {
            cy.get('[data-cy="taskeditor-tasks"]').first().click()
            cy.contains('Edit task').should('be.visible')

            cy.deleteTask()
            cy.contains('Delete').click()
            cy.contains('Yes, delete it').click()

            cy.wait('@deleteTask')
        })

        it('should delete task when delete with input x icon', () => {
            cy.get('[data-cy="taskeditor-tasks-delete-button"]').first().click()

            cy.deleteTask()
            cy.contains('Delete').click()
            cy.contains('Yes, delete it').click()

            cy.wait('@deleteTask')
        })
    })
})