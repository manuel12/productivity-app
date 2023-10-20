/// <reference types="cypress" />

describe("Todo Section - Add Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  const testTodoOne = "Feed the cats (test)"
  const testTodoTwo = "Take out trash (test)"
  const testTodoThree = "Clean room (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)

  it('should add a new todo to the Todo section by clicking "Add todo" button', () => {
    // Assuming there's an "Add todo" button
    cy.get("[data-cy=todos-input]").type(testTodoOne) // Type the todo text
    cy.get('[data-cy="todos-submit"]').click() // Click on the "Add" button

    // Assuming a new todo item is appended to the todo list
    cy.get("[data-cy=todos-list]").should("have.length", 1) // Verify a new todo is added
    cy.get("[data-cy=todos-list]").first().should("contain.text", testTodoOne) // Verify todo text
  })

  it("should add a new todo to the Todo section by pressing Enter", () => {
    // Assuming there's an input field for adding todo
    cy.get("[data-cy=todos-input]").type(testTodoTwo + "{enter}") // Type todo and press Enter

    // Assuming a new todo item is appended to the todo list
    cy.get("[data-cy=todos-list]").should("have.length", 1) // Verify another new todo is added
    cy.get("[data-cy=todos-list]").first().should("contain.text", testTodoTwo) // Verify todo text

    cy.get("[data-cy=todos-input]").type(testTodoThree + "{ENTER}")

    cy.get("[data-cy=todos-item]").should("be.visible")
  })

  it("should not allow todos with more than 40 characters", () => {
    cy.get("[data-cy=todos-input]").type(todoTextLongerThan40Char + "{enter}")

    // Assuming the input field is cleared after attempting to add a long todo
    cy.get("[data-cy=todos-input]").should("have.value", "") // Verify input field is empty

    cy.get("[data-cy=todos-item]")
      .should("have.length", 1)
      .and("contain.text", todoTextWith40Char) // Verify no new todo is added
  })

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
