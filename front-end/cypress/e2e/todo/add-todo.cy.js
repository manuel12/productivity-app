/// <reference types="cypress" />

describe("Todo Section - Add Todo", () => {
  const testTodoOne = "Feed the cats (test)"
  const testTodoTwo = "Take out trash (test)"
  const testTodoThree = "Clean room (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)

  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it('Verify a new todo can be added by clicking "Add todo" button', () => {
    cy.getBySel("todos-input").type(testTodoOne) // Type the todo text
    cy.get('[data-cy="todos-submit"]').click() // Click on the "Add" button

    cy.getBySel("todos-item").should("be.visible")
  })

  it("Verify a new todo can be added by pressing Enter", () => {
    cy.getBySel("todos-input").type(testTodoTwo + "{enter}") // Type todo and press Enter

    // Assuming a new todo item is appended to the todo list
    cy.getBySel("todos-list").should("have.length", 1) // Verify another new todo is added
    cy.getBySel("todos-list").first().should("contain.text", testTodoTwo) // Verify todo text

    cy.getBySel("todos-input").type(testTodoThree + "{ENTER}")

    cy.getBySel("todos-item").should("be.visible")
  })

  it("Verify added  todo appears in the todo list", () => {
    cy.getBySel("todos-input").type(testTodoOne + "{enter}")

    // Assuming a new todo item is appended to the todo list
    cy.getBySel("todos-list").should("have.length", 1) // Verify a new todo is added
    cy.getBySel("todos-list").first().should("contain.text", testTodoOne) // Verify todo text
  })

  it("Verify todos cannot be added with more than 40 characters", () => {
    cy.getBySel("todos-input").type(todoTextLongerThan40Char + "{enter}")

    // Assuming the input field is cleared after attempting to add a long todo
    cy.getBySel("todos-input").should("have.value", "") // Verify input field is empty

    cy.getBySel("todos-item")
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
