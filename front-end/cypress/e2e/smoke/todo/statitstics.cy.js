/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")

const todoTestsPreconditions = () => {
  cy.deleteTestUsers()
  cy.deleteTestTodos()

  // Register testuser
  cy.registerWithAPI()

  // Login testuser
  cy.loginWithAPI((res) => {
    const token = res.body.token
    window.localStorage.setItem("token", JSON.stringify(token))
  })
  cy.visit("/")
}

describe("Todo Section - Mark Todo as Complete Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it("should mark a todo as complete", () => {
    cy.getBySel("todo-input").type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    // Validate that the todo with text 'Todo to Complete' has initially .check--not-completed class
    cy.getBySel("todo-item")
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

    // Click the 'All' tab
    cy.getBySel("all-tab").click()

    // Find the todo item complete button, then click it
    cy.getBySel("todo-item")
      .filter(":contains('test')")
      .within(() => {
        cy.getBySel("todos-check-icon-container").click()
      })

    // Validate that the todo with text 'Todo to Complete' has .check-completed class
    cy.getBySel("todo-item")
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

    //cy.get("body").matchImageSnapshot("Marked Todo As Complete")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

describe("Todo Section - Todos Completed Today Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it("should display the number of completed todos today", () => {
    // Perform actions to add todos (today)
    const numTodosToAdd = 5
    for (let i = 0; i < numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i + 1} ${validTodo.validTodoToDeleteDesc}{enter}`
      )
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

      // Click the 'All' tab
      cy.getBySel("all-tab").click()

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

    // cy.get("body").matchImageSnapshot(
    //   "Displays Number Of Todos Completed Today"
    // )
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

describe("Todo Section - Average Todos Completed Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it("should display the average number of completed todos per day", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validTodoToDeleteDesc}{enter}`
      )
    }

    // Click the 'All' tab
    cy.getBySel("all-tab").click()

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
      cy.getBySel("todo-input").type(
        `#${i + 5} ${validTodo.validTodoToDeleteDesc}{enter}`
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

    // cy.get("body").matchImageSnapshot(
    //   "Displays Average Number Of Completed Todos"
    // )
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
