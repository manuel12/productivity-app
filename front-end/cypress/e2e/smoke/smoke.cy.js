/// <reference types="cypress" />

describe("Todo Section - Smoke tests", () => {
  const testTodoOne = "Feed the cats (test)"
  const createdTodo = "Created Todo (test)"
  const updatedTodo = "Updated Todo Item (test)"

  beforeEach(() => {
    cy.visit("/")
  })

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    cy.getBySel("todos-input").type(testTodoOne)
    cy.get('[data-cy="todos-submit"]').click()

    cy.getBySel("todos-item").should("be.visible")
  })

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

  it("should delete a todo and remove it from the list", () => {
    // Create a todo with the text 'Todo to Delete' that you want to delete
    const todoTextToDelete = "Todo to Delete (test)"
    cy.getBySel("todos-input").type(todoTextToDelete)
    cy.getBySel("todos-submit").click()

    // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(todoTextToDelete)
      .parent()
      .find(".remove-icon-container")
      .click()

    // Verify that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(todoTextToDelete).should("not.exist")
  })

  it("should mark a todo as complete", () => {
    const todoTextToComplete = "Todo to Complete (test)"
    cy.getBySel("todos-input").type(todoTextToComplete)
    cy.get('[data-cy="todos-submit"]').click()

    // Validate that the todo with text 'Todo to Complete' has initially .check--not-completed class
    cy.getBySel("todos-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
          })
      })

    // Find the todo item complete button, then click it
    cy.getBySel("todos-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Validate that the todo with text 'Todo to Complete' has .check-completed class
    cy.getBySel("todos-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })
  })

  it("should display the number of completed todos today", () => {
    // Perform actions to add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
    }

    // Check initial completed todos displays 0
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed todos today:0"
    )

    // Perform actions to complete todos (today)
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
        .find("[data-cy=todos-check-icon-container]")
        .click()

      cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
        .find("[data-cy=todos-check-icon-container]")
        .find(".fa-circle-check")
        .should("be.visible")
        .and("have.class", "check-completed")

      // Check completed todos number increases with each todo set as completed
      cy.getBySel("statistics-daily-completed-todos").should(
        "include.text",
        `Completed todos today:${i}`
      )
    }
  })

  it("should display the average number of completed todos per day", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.get('[data-cy="todos-list"]').should("be.visible")

    // Stub the Date object to make it tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])

    // Add todos (tomorrow)
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(
        `Todo #${i + numTodosToAdd} (test){enter}`
      )
    }

    // Complete todos (tomorrow)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.get('[data-cy="todos-list"]').should("be.visible")

    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "include.text",
      "Avg daily completed todos:5"
    )
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
