/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

describe("UserTodoLifecycleFlow", () => {
  const username = "testuser1"
  const email = "testuser1@gmail.com"
  const password = "Testpass1!"
  const todoDescription = "Feed the cats"
  const updateTodoDescription = "Take out the trash"

  before(() => {
    cy.deleteTestUsers()
  })

  qase(
    76,
    it("should complete the user todo lifecycle flow", () => {
      // Step #1: Visit login page
      cy.visit("http://localhost:3000/account/login")

      // Step #2: Click on 'CREATE ACCOUNT' button
      cy.contains("CREATE ACCOUNT").click()

      // Step #3: Check app redirects to /account/register
      cy.url().should("include", "/account/register")

      // Step #4: Type username on username input
      cy.get('input[name="username"]').type(username)

      // Step #5: Type email on email input
      cy.get('input[name="email"]').type(email)

      // Step #6: Type password on password input
      cy.get('input[name="password"]').type(password)

      // Step #7: Type password confirmation on password confirmation input
      cy.get('input[name="password-confirmation"]').type(password)

      // Step #8: Click on 'Register' button
      cy.getBySel("register-button").click()

      // Step #9: Check register success message
      cy.getBySel("form-action-success")
        .should("be.visible")
        .and("contain.text", `User ${email} successfully registered!`)

      // Step #10: Check app redirects to login page
      cy.url().should("eq", "http://localhost:3000/account/login")

      // Step #11: Type email on email input
      cy.get('input[name="email"]').type(email)

      // Step #12: Type password on password input
      cy.get('input[name="password"]').type(password)

      // Step #13: Click 'LOGIN' button
      cy.contains("LOGIN").click()

      // Step #14: Check login success message
      cy.contains("Login successful!").should("be.visible")

      // Step #15: Check there are no todos created
      cy.get(".todo-item").should("have.length", 0)

      // Step #16: Check the text 'No todos added yet...' is displayed
      cy.contains("No todos added yet...").should("be.visible")

      // Step #17: Type todoDescription in todo input
      cy.get('input[name="todo"]').type(todoDescription)

      // Step #18: Click 'Add Todo' button
      cy.contains("Add Todo").click()

      // Step #19: Check the text 'No todos added yet...' is not visible
      cy.contains("No todos added yet...").should("not.exist")

      // Step #20: Check the tabs Uncompleted, Completed and All are visible
      cy.contains("Uncompleted").should("be.visible")
      cy.contains("Completed").should("be.visible")
      cy.contains("All").should("be.visible")

      // Step #21: Check the newly added todo is visible
      cy.contains(todoDescription).should("be.visible")

      // Step #22: Click on todo description text for it to convert into an input
      cy.contains(todoDescription).click()

      // Step #23: Delete todo description text
      cy.get('[data-cy="todos-text-input"]')
        .clear()

        // Step #24: Type updateTodoDescription text into todo input
        .type(updateTodoDescription)

        // Step #25: Press ENTER
        .type("{enter}")

      // Step #26: Check that todo now displays the update description text

      cy.get('[data-cy="todo-item"]')
        .contains(updateTodoDescription)
        .should("be.visible")

      // Step #27: Check the todo in uncompleted
      cy.get('[data-cy="todo-item"]').within(() => {
        cy.get(".check-icon-container").within(() => {
          cy.get(".fa-circle-check").should("have.class", "check-not-completed")
        })
      })

      // Step #28: Click on the todo's checkmark icon
      cy.contains(updateTodoDescription)
        .parent()
        .find(".fa-circle-check")
        .click()

      // Step #29: Check the todo disappears from the Uncompleted list
      cy.contains(updateTodoDescription).should("not.exist")

      // Step #30: Click on the Completed tab
      cy.contains("Completed").click()

      // Step #31: Check the todo is visible in the completed tab
      cy.contains(updateTodoDescription).should("be.visible")

      // Step #32: Check the todo has the checkmark icon in green
      cy.get('[data-cy="todo-item"]').within(() => {
        cy.get(".check-icon-container").within(() => {
          cy.get(".fa-circle-check").should("have.class", "check-completed")
        })
      })

      // Step #33: Click the todo's checkmark icon
      cy.contains(updateTodoDescription)
        .parent()
        .find(".fa-circle-check")
        .click()

      // Step #34: Check todo disappears from the Completed tab
      cy.contains(updateTodoDescription).should("not.exist")

      // Step #35: Click on the Uncompleted tab
      cy.contains("Uncompleted").click()

      // Step #36: Check todo is visible in the Uncompleted tab
      cy.contains(updateTodoDescription).should("not.exist") // It should not be visible since it was marked completed

      // Step #37: Click on the todo's X button
      cy.contains(updateTodoDescription).parent().find(".delete-button").click()

      // Step #38: Check the todo is deleted
      cy.contains(updateTodoDescription).should("not.exist")

      // Step #39: Check that the 'No todos added yet...' is visible
      cy.contains("No todos added yet...").should("be.visible")
    })
  )
})
