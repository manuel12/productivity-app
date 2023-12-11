/// <reference types="cypress" />

describe("Todo Section - Add Todo", () => {
  const testTodoOne = "Feed the cats (test)"
  const testTodoTwo = "Take out trash (test)"
  const testTodoThree = "Clean room (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)
  const todoTextShorterThan3Char = "ab"

  beforeEach(() => {
    cy.visit("/")
  })

  // Positive tests

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    cy.getBySel("todos-input").type(testTodoOne)
    cy.get('[data-cy="todos-submit"]').click()

    cy.getBySel("todos-item").should("be.visible")
  })

  it("should add a todo by writing on input and pressing enter key", () => {
    cy.getBySel("todos-input").type(testTodoTwo + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoTwo)

    cy.getBySel("todos-input").type(testTodoThree + "{ENTER}")

    cy.getBySel("todos-item").should("be.visible")
  })

  it("should display addded todos correctly on the list", () => {
    cy.getBySel("todos-input").type(testTodoOne + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne)
  })

  it("should persist todos after page reload", () => {
    cy.getBySel("todos-input").type(testTodoOne + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne)

    cy.reload()
    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne)
  })

  // Negative tests

  it("should not allow to add a todo with more than 40 characters", () => {
    cy.getBySel("todos-input").type(todoTextLongerThan40Char + "{enter}")

    cy.getBySel("todos-input").should("have.value", todoTextWith40Char)
    cy.getBySel("todos-item").should("have.length", 0)
  })

  it('should display an error label "Todos cannot be more than 40 characters" when exceeding that amount', () => {
    cy.getBySel("todos-input").type(todoTextLongerThan40Char + "{enter}")

    cy.getBySel("input-error-label").should(
      "have.text",
      "Todos cannot be more than 40 characters"
    )
  })

  it("should not allow to add a todo when leaving input field empty", () => {
    // Check current number of existing todos

    cy.get("[data-cy=todo-item]").should("have.length.gte", 0)

    // Click on submit button
    cy.getBySel("todos-submit").click()

    // Check current number of todos remains the same
    cy.get("[data-cy=todo-item]").should("have.length.gte", 0)
  })

  it('should display an error label "Todos cannot be less than 3 characters" when falling below that amount', () => {
    // At the beginning  when todo is empty it should not show any error message
    cy.getBySel("input-error-label").should("not.exist")
    // When the user adds a todo with less than 3 characters and submits the error label
    // should be shown
    cy.getBySel("todos-input").type(todoTextShorterThan3Char + "{enter}")

    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("contain.text", "Todos cannot be less than 3 characters")
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
