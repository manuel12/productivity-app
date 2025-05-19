/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData
const invalidTodo = todoData.invalidData

describe("Todo Section - Edit Todo", () => {
  const ctx = {}

  before(() => {
    // Cleanup
    cy.deleteTestUsers()

    cy.registerWithAPI()
  })

  beforeEach(() => {
    cy.deleteTestTodos()

    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      Cypress.env("token", ctx.token)
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    }).then(() => {
      cy.createTodoWithAPI(validTodo.description1)
    })

    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it("should edit a todo", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescription on the input
    cy.step("Enter todoDescription on the input")
    cy.getBySel("todos-text-input").type(validTodo.updateDescription1)

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Check the old description text is not visible in the todo
    cy.step("Check the old description text is not visible in the todo")
    cy.contains(validTodo.description1).should("not.exist")

    // 6. Check the new description text is visible in the todo
    cy.step("Check the new description text is visible in the todo")
    cy.contains("[data-cy=todo-item]", validTodo.updateDescription1).should(
      "exist"
    )
  })

  it("should persist edited todos after page reload", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescription on the input
    cy.step("Enter todoDescription on the input")
    cy.getBySel("todos-text-input").type(validTodo.updateDescription1)

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Reload the page
    cy.step("Reload the page")
    cy.reload()

    // 6. Check the old description text is not visible in the todo
    cy.step("Check the old description text is not visible in the todo")
    cy.contains(validTodo.description1).should("not.exist")

    // 7. Check the new description text is visible in the todo
    cy.step("Check the new description text is visible in the todo")
    cy.contains("[data-cy=todo-item]", validTodo.updateDescription1).should(
      "exist"
    )
  })

  // Negative tests

  it("should not allow to edit a todo so it has more than 40 characters", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter descriptionLongerThan40Chars
    cy.step("Enter descriptionLongerThan40Chars")
    cy.getBySel("todos-text-input").type(
      invalidTodo.descriptionLongerThan40Chars
    )

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Check the todo text input does not dissappear
    cy.step("Check the todo text input does not dissappear")
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todos must be shorter than 40 characters." when edited todo exceeds that amount', () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter descriptionLongerThan40Chars
    cy.step("Enter descriptionLongerThan40Chars")
    cy.getBySel("todos-text-input").type(
      invalidTodo.descriptionLongerThan40Chars
    )

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Check an error label for the todo input with the text 'Todos cannot contain more than 40 characters.' is visible
    cy.step(
      "Check an error label for the todo input with the text 'Todos cannot contain more than 40 characters.' is visible"
    )
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todos cannot contain more than 40 characters.")
  })

  it("should not allow to edit a todo so it has less than 3 characters", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter shortDescription
    cy.step("Enter shortDescription")
    cy.getBySel("todos-text-input").type(
      invalidTodo.descriptionShorterThan3Chars
    )

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Check the todo text input does not disappear
    cy.step("Check the todo text input does not disappear")
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todos must be at least 3 characters." when edited todo falls below that amount', () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter shortDescription
    cy.step("Enter shortDescription")
    cy.getBySel("todos-text-input").type(
      invalidTodo.descriptionShorterThan3Chars
    )

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 5. Check an error label for the todo input with the text 'Todos must be at least 3 characters.' is visible

    cy.step(
      "Check an error label for the todo input with the text 'Todos must be at least 3 characters.' is visible"
    )
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todos must be at least 3 characters.")
  })

  it("should not allow to submit an edited todo when leaving input field empty", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.description1})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 4. Check an error label with text 'Todo description text is required.' is visible over the todo input
    cy.step(
      "Check an error label with text 'Todo description text is required.' is visible over the todo input"
    )
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todo description text is required.")
  })
})
