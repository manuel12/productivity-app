/// <reference types="cypress" />

const userData = require("../../../fixtures/users/userData.json")
const testuser = userData.validData
const todoData = require("../../fixtures/todos/todoData.json")
const validTodo = todoData.validData

describe("UserTodoLifecycleFlow", () => {
  before(() => {
    cy.deleteTestUsers()
  })

  it("should complete the user todo lifecycle flow", () => {
    // Step #1: Visit login page
    cy.step("Visit login page")
    cy.visit("http://localhost:3000/account/login")

    // Step #2: Click on 'CREATE ACCOUNT' button
    cy.step("Click on 'CREATE ACCOUNT' button")
    cy.contains("CREATE ACCOUNT").click()

    // Step #3: Check app redirects to /account/register
    cy.step("Check app redirects to /account/register")
    cy.url().should("include", "/account/register")

    // Step #4: Type username on username input
    cy.step("Type username on username input")
    cy.get('input[name="username"]').type(testuser.username)

    // Step #5: Type email on email input
    cy.step("Type email on email input")
    cy.get('input[name="email"]').type(testuser.email)

    // Step #6: Type password on password input
    cy.step("Type password on password input")
    cy.get('input[name="password"]').type(testuser.password)

    // Step #7: Type password confirmation on password confirmation input
    cy.step("Type password confirmation on password confirmation input")
    cy.get('input[name="password-confirmation"]').type(testuser.password)

    // Step #8: Click on 'Register' button
    cy.step("Click on 'Register' button")
    cy.getBySel("register-button").click()

    // Step #9: Check register success message
    cy.step("Check register success message")
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", `User ${testuser.email} successfully registered!`)

    // Step #10: Check app redirects to login page
    cy.step("Check app redirects to login page")
    cy.url().should("eq", "http://localhost:3000/account/login")

    // Step #11: Type email on email input
    cy.step("Type email on email input")
    cy.get('input[name="email"]').type(testuser.email)

    // Step #12: Type password on password input
    cy.step("Type password on password input")
    cy.get('input[name="password"]').type(testuser.password)

    // Step #13: Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.contains("LOGIN").click()

    // Step #14: Check login success message
    cy.step("Check login success message")
    cy.contains("Login successful!").should("be.visible")

    // Step #15: Check there are no todos created
    cy.step("Check there are no todos created")
    cy.get(".todo-item").should("have.length", 0)

    // Step #16: Check the text 'No todos added yet...' is displayed
    cy.step("Check the text 'No todos added yet...' is displayed")
    cy.contains("No todos added yet...").should("be.visible")

    // Step #17: Type todoDescription in todo input
    cy.step("Type todoDescription in todo input")
    cy.get('input[name="todo"]').type(validTodo.description1)

    // Step #18: Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.contains("Add Todo").click()

    // Step #19: Check the text 'No todos added yet...' is not visible
    cy.step("Check the text 'No todos added yet...' is not visible")
    cy.contains("No todos added yet...").should("not.exist")

    // Step #20: Check the tabs Uncompleted, Completed and All are visible
    cy.step("Check the tabs Uncompleted, Completed and All are visible")
    cy.contains("Uncompleted").should("be.visible")
    cy.contains("Completed").should("be.visible")
    cy.contains("All").should("be.visible")

    // Step #21: Check the newly added todo is visible
    cy.step("Check the newly added todo is visible")
    cy.contains(validTodo.description1).should("be.visible")

    // Step #22: Click on todo description text for it to convert into an input
    cy.step("Click on todo description text for it to convert into an input")
    cy.contains(validTodo.description1).click()

    // Step #23: Delete todo description text
    cy.step("Delete todo description text")
    cy.get('[data-cy="todos-text-input"]').clear()

    // Step #24: Type updateTodoDescription text into todo input
    cy.step("Type updateTodoDescription text into todo input")
    cy.get('[data-cy="todos-text-input"]').type(validTodo.description2)

    // Step #25: Press ENTER
    cy.step("Press ENTER")
    cy.get('[data-cy="todos-text-input"]').type("{enter}")

    // Step #26: Check that todo now displays the update description text
    cy.step("Check that todo now displays the update description text")

    cy.get('[data-cy="todo-item"]')
      .contains(validTodo.description2)
      .should("be.visible")

    // Step #27: Check the todo in uncompleted
    cy.step("Check the todo in uncompleted")

    cy.get('[data-cy="todo-item"]').within(() => {
      cy.get(".check-icon-container").within(() => {
        cy.get(".fa-circle-check").should("have.class", "check-not-completed")
      })
    })

    // Step #28: Click on the todo's checkmark icon
    cy.step("Click on the todo's checkmark icon")
    cy.contains(validTodo.description2)
      .parent()
      .find(".fa-circle-check")
      .click()

    // Step #29: Check the todo disappears from the Uncompleted list
    cy.step("Check the todo disappears from the Uncompleted list")
    cy.contains(validTodo.description2).should("not.exist")

    // Step #30: Click on the Completed tab
    cy.step("Click on the Completed tab")
    cy.get('[data-cy="complete-tab"]').click()

    // Step #31: Check the todo is visible in the completed tab
    cy.step("Check the todo is visible in the completed tab")
    cy.contains(validTodo.description2).should("be.visible")

    // Step #32: Check the todo has the checkmark icon in green
    cy.step("Check the todo has the checkmark icon in green")

    cy.get('[data-cy="todo-item"]').within(() => {
      cy.get(".check-icon-container").within(() => {
        cy.get(".fa-circle-check").should("have.class", "check-completed")
      })
    })

    // Step #33: Click the todo's checkmark icon
    cy.step("Click the todo's checkmark icon")
    cy.contains(validTodo.description2)
      .parent()
      .find(".fa-circle-check")
      .click()

    // Step #34: Check todo disappears from the Completed tab
    cy.step("Check todo disappears from the Completed tab")
    cy.contains(validTodo.description2).should("not.exist")

    // Step #35: Click on the Uncompleted tab
    cy.step("Click on the Uncompleted tab")
    cy.contains("Uncompleted").click()

    // Step #36: Check todo is visible in the Uncompleted tab
    cy.step("Check todo is visible in the Uncompleted tab")
    cy.contains(validTodo.description2).should("be.visible")

    // Step #37: Click on the todo's X button
    cy.step("Click on the todo's X button")
    cy.contains(validTodo.description2)
      .parent()
      .find(".remove-icon-container")
      .click()

    // Step #38: Check the todo is deleted
    cy.step("Check the todo is deleted")
    cy.contains(validTodo.description2).should("not.exist")

    // Step #39: Check that the 'No todos added yet...' is visible
    cy.step("Check that the 'No todos added yet...' is visible")
    cy.contains("No todos added yet...").should("be.visible")
  })
})
