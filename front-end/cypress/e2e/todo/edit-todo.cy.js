/// <reference types="cypress" />

describe("Todo Section - Edit Todo", () => {
  const createdTodo = "Created Todo (test)"
  const updatedTodo = "Updated Todo Item (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)
  const todoTextShorterThan3Char = "ab"

  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it("should edit a todo", () => {
    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${updatedTodo}{enter}`)

    // Validate the todo is updated correctly
    cy.contains(createdTodo).should("not.exist")
    cy.contains("[data-cy=todos-item]", updatedTodo).should("exist")
  })

  it("should persist edited todos after page reload", () => {
    cy.getBySel("todos-input").type(createdTodo + "{enter}")

    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list").first().should("contain.text", createdTodo)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${updatedTodo}{enter}`)

    cy.reload()

    // Validate the todo is updated correctly
    cy.contains(createdTodo).should("not.exist")
    cy.contains("[data-cy=todos-item]", updatedTodo).should("exist")
  })

  // Negative tests

  it("should not allow to edit a todo so it has more than 40 characters", () => {
    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextLongerThan40Char}{enter}`)

    // Check that todo text input does not dissapear
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todo cannot contain more than 40 characters" when edited todo exceeds that amount', () => {
    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextLongerThan40Char}{enter}`)

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todo cannot contain more than 40 characters")
  })

  it("should not allow to edit a todo so it has less than 3 characters", () => {
    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextShorterThan3Char}{enter}`)

    // Check that todo text input does not dissapear
    cy.getBySel("todos-text-input").should("be.visible")
  })

  it('should display an error label "Todo cannot contain less than 3 characters" when edited todo falls below that amount', () => {
    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextShorterThan3Char}{enter}`)

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todo cannot contain less than 3 characters")
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
