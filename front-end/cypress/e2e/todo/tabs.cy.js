/// <reference types="cypress" />

describe("Todo Section - Tabs", () => {
  const testTodoOne = "Feed the cats (test)"
  const testTodoTwo = "Take out trash (test)"
  const testTodoThree = "Clean room (test)"

  beforeEach(() => {
    cy.visit("/")
    // Create some initial todos
    const todos = [testTodoOne, testTodoTwo, testTodoThree]
    todos.forEach((todo) => {
      cy.getBySel("todos-input").type(`${todo} {enter}`)
    })
  })

  // Positive tests

  it("should display 3 tabs above the todos list: 'All', 'Completed', 'Uncompleted' ", () => {
    cy.getBySel("todos-tabs")
      .should("be.visible")
      .within(() => {
        cy.get("li.nav-item div").eq(0).should("have.text", "All")
        cy.get("li.nav-item div").eq(1).should("have.text", "Completed")
        cy.get("li.nav-item div").eq(2).should("have.text", "Uncompleted")
      })
  })

  it("should by default have 'All' tab active", () => {
    cy.get("li.nav-item div").eq(0).should("have.class", "active")
  })

  it("should by default display all existing todos", () => {
    cy.getBySel("todos-list")
      .should("be.visible")
      .within(() => {
        cy.getBySel("todos-item").should("be.visible").and("have.length", 3)
      })
  })

  it("should display all todos when user clicks on the 'All' tab", () => {
    cy.get(".nav-item > :nth-child(1)")

    cy.getBySel("todos-list")
      .should("be.visible")
      .within(() => {
        cy.getBySel("todos-item").should("be.visible").and("have.length", 3)
      })
  })

  it("should display only completed todos when user clicks on the 'Completed' tab", () => {
    // Add 1 todo as completed.
    cy.getBySel("todos-item")
      .eq(0)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click on completed tab
    cy.get(".nav-item > :nth-child(2)").click()

    // Check there is only 1 todo shown
    cy.getBySel("todos-item").should("have.length", 1)
  })

  it("should display only uncomplete todos when user clicks on the 'Uncompleted' tab", () => {
    // Add 1 todo as completed.
    cy.getBySel("todos-item")
      .eq(0)
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Click on uncompleted tab
    cy.get(".nav-item > :nth-child(3)").click()

    // Check there are 2 todos shown
    cy.getBySel("todos-item").should("have.length", 2)
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
