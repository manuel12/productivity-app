/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")
const invalidTodo = require("../../../fixtures/invalidTodo.json")

describe("Todo Section - Edit Todo", () => {
  const ctx = {}

  beforeEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })

    // Visit the app or the specific page
    cy.visit("/")
    cy.getBySel("todo-input").type(validTodo.validTodoDesc + "{enter}")
  })

  // Positive tests

  it("should edit a todo", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescription on the input
    cy.step("Enter todoDescription on the input")

    // 4. Press ENTER key
    cy.step("Press ENTER key")

    cy.getBySel("todos-text-input").type(
      `${validTodo.validTodoUpdateDesc}{enter}`
    )

    // 5. Check the old description text is not visible in the todo
    cy.step("Check the old description text is not visible in the todo")
    cy.contains(validTodo.validTodoDesc).should("not.exist")

    // 6. Check the new description text is visible in the todo
    cy.step("Check the new description text is visible in the todo")
    cy.contains("[data-cy=todo-item]", validTodo.validTodoUpdateDesc).should(
      "exist"
    )
  })

  it("should persist edited todos after page reload", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescription on the input
    cy.step("Enter todoDescription on the input")

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type(
      `${validTodo.validTodoUpdateDesc}{enter}`
    )

    // 5. Reload the page
    cy.step("Reload the page")
    cy.reload()

    // 6. Check the old description text is not visible in the todo
    cy.step("Check the old description text is not visible in the todo")
    cy.contains(validTodo.validTodoDesc).should("not.exist")

    // 7. Check the new description text is visible in the todo
    cy.step("Check the new description text is visible in the todo")
    cy.contains("[data-cy=todo-item]", validTodo.validTodoUpdateDesc).should(
      "exist"
    )
  })

  // Negative tests

  it("should not allow to edit a todo so it has more than 40 characters", () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescLongerThan40Chars
    cy.step("Enter todoDescLongerThan40Chars")

    // 4. Press ENTER key
    cy.step("Press ENTER key")

    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

    // 5. Check the todo text input does not disappear
    cy.step("Check the todo text input does not disappear")
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todos must be shorter than 40 characters." when edited todo exceeds that amount', () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter todoDescLongerThan40Chars
    cy.step("Enter todoDescLongerThan40Chars")

    // 4. Press ENTER key
    cy.step("Press ENTER key")

    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

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
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter shortDescription
    cy.step("Enter shortDescription")

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )
    // 5. Check the todo text input does not disappear// Check that todo text input does not dissapear
    cy.step(
      "Check the todo text input does not disappear// Check that todo text input does not dissapear"
    )
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todos must be at least 3 characters." when edited todo falls below that amount', () => {
    // 1. Click on the todo's description text to turn it into an input
    cy.step("Click on the todo's description text to turn it into an input")
    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    // 2. Delete the current description
    cy.step("Delete the current description")
    cy.getBySel("todos-text-input").clear()

    // 3. Enter shortDescription
    cy.step("Enter shortDescription")

    // 4. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )

    // 5. Check an error label for the todo input with the text 'Todos cannot contain less than 3 characters.' is visible
    cy.step(
      "Check an error label for the todo input with the text 'Todos cannot contain less than 3 characters.' is visible"
    )
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todos must be at least 3 characters.")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
