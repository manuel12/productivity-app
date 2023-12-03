/// <reference types="cypress" />

describe("Todo Section - Add Todo", () => {
  const testTodoOne = "Feed the cats (test)"
  const testTodoTwo = "Take out trash (test)"
  const testTodoThree = "Clean room (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)

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

    cy.getBySel("todos-input").should("have.value", "")
    cy.getBySel("todos-item")
      // Filter only through the todo items that contain the '(test)' substring
      .filter(":contains('test')")
      .should("have.length", 1)

      // Verify todo added only has 40 characters
      .and("contain.text", todoTextWith40Char)
  })

  it("should not allow to add a todo when leaving input field empty", () => {
    // Check current number of existing todos

    cy.get("[data-cy=todo-item]").should("have.length.gte", 0)

    // Click on submit button
    cy.getBySel("todos-submit").click()

    // Check current number of todos remains the same
    cy.get("[data-cy=todo-item]").should("have.length.gte", 0)
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
