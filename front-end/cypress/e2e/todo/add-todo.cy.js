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

  it('Verify a todo can be added by writing on input and clicking on a "Add todo" button', () => {
    cy.getBySel("todos-input").type(testTodoOne)
    cy.get('[data-cy="todos-submit"]').click()

    cy.getBySel("todos-item").should("be.visible")
  })

  it("Verify a todo can be added by writing on input and pressing enter key", () => {
    cy.getBySel("todos-input").type(testTodoTwo + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoTwo)

    cy.getBySel("todos-input").type(testTodoThree + "{ENTER}")

    cy.getBySel("todos-item").should("be.visible")
  })

  it("Verify the todo appears correctly on the list", () => {
    cy.getBySel("todos-input").type(testTodoOne + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne)
  })

  it("Verify added todos persist after page reload", () => {
    cy.getBySel("todos-input").type(testTodoOne + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne)

    cy.reload()
    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne)
  })

  it("Verify todos cannot be added with more than 40 characters", () => {
    cy.getBySel("todos-input").type(todoTextLongerThan40Char + "{enter}")

    cy.getBySel("todos-input").should("have.value", "")
    cy.getBySel("todos-item")
      // Filter only through the todo items that contain the '(test)' substring
      .filter(":contains('test')")
      .should("have.length", 1)

      // Verify todo added only has 40 characters
      .and("contain.text", todoTextWith40Char)
  })

  it("Verify todos cannot be added with when leaving the input empty", () => {
    // Check current number of existing todos
    let currentNumTodos
    let newNumTodos

    cy.getBySel("todos-item").then(($el) => {
      currentNumTodos = Cypress.$($el).length
    })

    // Click on submit button
    cy.get('[data-cy="todos-submit"]').click()

    // Check current number of todos remains the same
    cy.getBySel("todos-item").then(($el) => {
      newNumTodos = Cypress.$($el).length
      expect(newNumTodos).to.eq(currentNumTodos)
    })
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
