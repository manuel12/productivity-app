/// <reference types="cypress" />

describe("Todo Section - Add Todo", () => {
  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  it('should add a new todo to the Todo section by clicking "Add todo" button', () => {
    // Assuming there's an "Add todo" button
    cy.get("[data-cy=todos-input]").type("New Todo Item") // Type the todo text
    cy.get('[data-cy="todos-submit"]').click() // Click on the "Add" button

    // Assuming a new todo item is appended to the todo list
    cy.get("[data-cy=todos-list]").should("have.length", 1) // Verify a new todo is added
    cy.get("[data-cy=todos-list]")
      .first()
      .should("contain.text", "New Todo Item") // Verify todo text
  })

  it("should add a new todo to the Todo section by pressing Enter", () => {
    // Assuming there's an input field for adding todo
    cy.get("[data-cy=todos-input]").type("Another New Todo{enter}") // Type todo and press Enter

    // Assuming a new todo item is appended to the todo list
    cy.get("[data-cy=todos-list]").should("have.length", 1) // Verify another new todo is added
    cy.get("[data-cy=todos-list]")
      .first()
      .should("contain.text", "Another New Todo") // Verify todo text

    cy.get("[data-cy=todos-input]").type("Clean room{ENTER}")

    cy.get("[data-cy=todos-item]").should("be.visible")
  })

  it("should not allow todos with more than 40 characters", () => {
    const todoTextLongerThan40Char =
      "This is a todo item with more than 40 characters, which should not be allowed"
    cy.get("[data-cy=todos-input]").type(todoTextLongerThan40Char + "{enter}")

    // Assuming the input field is cleared after attempting to add a long todo
    cy.get("[data-cy=todos-input]").should("have.value", "") // Verify input field is empty

    const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)
    cy.get("[data-cy=todos-item]")
      .should("have.length", 1)
      .and("contain.text", todoTextWith40Char) // Verify no new todo is added
  })
})
