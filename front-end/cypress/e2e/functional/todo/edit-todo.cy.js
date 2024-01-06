/// <reference types="cypress" />

describe("Todo Section - Edit Todo", () => {
  const createdTodo = "Created Todo (test)"
  const updatedTodo = "Updated Todo Item (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextShorterThan3Char = "ab"

  beforeEach(() => {
    // Visit the app or the specific page
    cy.visit("/")
    cy.getBySel("todos-input").type(createdTodo + "{enter}")
  })

  // Positive tests

  it("should edit a todo", () => {
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
    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextLongerThan40Char}{enter}`)

    // Check error label
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todo cannot contain more than 40 characters")
  })

  it("should not allow to edit a todo so it has less than 3 characters", () => {
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
    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todos-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextShorterThan3Char}{enter}`)

    // Check error label
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("contain.text", "Todo cannot contain less than 3 characters")
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
