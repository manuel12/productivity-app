/// <reference types="cypress" />

describe("Todo Section - Smoke tests", () => {
  const testTodoOne = "Feed the cats (test)"
  const createdTodo = "Created Todo (test)"
  const updatedTodo = "Updated Todo Item (test)"
  const todoTextShorterThan3Char = "ab"

  beforeEach(() => {
    cy.deleteTestTodos()
    cy.visit("/")
  })

  // Positive tests

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    cy.getBySel("todos-input").type(testTodoOne)
    cy.getBySel("todos-submit").click()

    cy.getBySel("todos-item").should("be.visible")

    cy.getBySel("todo-page-container").matchImageSnapshot("Added todo")
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

    cy.getBySel("todo-page-container").matchImageSnapshot("Edited todo")
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

    cy.getBySel("todo-page-container").matchImageSnapshot("Deleted todo")
  })

  it("should mark a todo as complete", () => {
    const todoTextToComplete = "Todo to Complete (test)"
    cy.getBySel("todos-input").type(todoTextToComplete)
    cy.getBySel("todos-submit").click()

    // Validate that the todo with text 'Todo to Complete' has initially .check--not-completed class
    cy.getBySel("todos-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.getBySel("fa-circle-check")
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
            cy.getBySel("fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })

    cy.getBySel("todo-page-container").matchImageSnapshot(
      "Marked todo as complete"
    )
  })

  it("should display the number of completed todos today", () => {
    // Perform actions to add todos (today)
    const numTodosToAdd = 5
    for (let i = 0; i < numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i + 1} (test){enter}`)
    }

    // Check initial completed todos displays 0
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed today:0"
    )

    // Perform actions to complete todos (today)
    for (let i = 0; i < numTodosToAdd; i++) {
      cy.getBySel("todos-list")
        .children()
        .eq(i)
        .find("[data-cy=todos-check-icon-container]")
        .click()

      cy.getBySel("todos-check-icon-container")
        .getBySel("fa-circle-check")
        .should("be.visible")
        .and("have.class", "check-completed")

      // Check completed todos number increases with each todo set as completed
      cy.getBySel("statistics-daily-completed-todos").should(
        "include.text",
        `Completed today:${i + 1}`
      )
    }

    cy.scrollTo(0, 0)
    cy.wait(1000)

    cy.get(".TodosPage-upper-stats").matchImageSnapshot(
      "Displays number of todos completed today"
    )
  })

  it("should display the average number of completed todos per day", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todos-input").type(`Todo #${i} (test){enter}`)
    }

    // Complete todos (today)
    cy.getBySel("fa-circle-check").each(($el) => {
      cy.get($el).click()
    })

    cy.getBySel("todos-list").should("be.visible")

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
    cy.getBySel("fa-circle-check").each(($el) => {
      cy.get($el).click()
    })

    cy.getBySel("todos-list").should("be.visible")

    cy.getBySel("statistics-daily-avg-completed-todos").should(
      "include.text",
      "Avg daily completed:5"
    )

    cy.scrollTo(0, 0)
    cy.wait(1000)

    cy.get(".TodosPage-upper-stats").matchImageSnapshot(
      "Displays average number of completed todos"
    )
  })

  // Negative tests

  it("should display 0 todos initially", () => {
    cy.getBySel("todo-page-container").matchImageSnapshot(
      "Displays 0 todos initially"
    )
  })

  it('should display an error label "Todos cannot be less than 3 characters" when falling below that amount', () => {
    cy.getBySel("todos-input").type(todoTextShorterThan3Char + "{enter}")

    cy.getBySel("todo-page-container").matchImageSnapshot(
      "Displays 'todo cannot be less than 3 characters' error label"
    )
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

    cy.getBySel("todo-page-container").matchImageSnapshot(
      "Displays 'todo cannot be less than 3 characters' error label for edits"
    )
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
