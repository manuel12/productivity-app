/// <reference types="cypress" />

const validTodo = require("../../../fixtures/todo.json")

describe("Todo Section - Todo Statistics Display ", () => {
  const ctx = {}

  beforeEach(() => {
    cy.deleteTestUsers(ctx.token)
    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })

    // Visit the app or the specific page
    cy.visit("/")
  })

  // Positive tests

  it("should display the number of completed todos today", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // Check initial completed todos displays 0
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed today:0"
    )

    // Complete todos (today)
    for (let i = 1; i <= numTodosToAdd; i++) {
      // Click on todo's check icon
      cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
        .find("[data-cy=todos-check-icon-container]")
        .click()

      // Make sure check icon has .check-completed class
      cy.get(`[data-cy="todos-list"] > :nth-child(${i})`)
        .find("[data-cy=todos-check-icon-container]")
        .find(".fa-circle-check")
        .should("be.visible")
        .and("have.class", "check-completed")

      // Check completed todos number increases with each todo set as completed
      cy.getBySel("statistics-daily-completed-todos").should(
        "include.text",
        `Completed today:${i}`
      )
    }
  })

  it("should display the average number of completed todos per day", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
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
      cy.getBySel("todo-input").type(
        `#${i + numTodosToAdd} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // Complete todos (tomorrow)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.get('[data-cy="todos-list"]').should("be.visible")

    // Check  avg daily completed todos
    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "include.text",
      "Avg daily completed:5"
    )
  })

  it("should display the percentage increase/decrease indicator for completed todos", () => {
    // Add todos (today)
    const numTodosToAddToday = 1
    for (let i = 1; i <= numTodosToAddToday; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc} (today) {enter}`
      )
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // Stub the Date object to make it tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])

    // Add todos (tomorrow)
    const numTodosToAddTomorrow = 5
    for (let i = 1; i <= numTodosToAddTomorrow; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc} (tomorrow) {enter}`
      )
    }

    // Complete todos (tomorrow)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // Check percentage difference
    cy.get('[data-cy="statistics-percentage-diff"]').should(
      "include.text",
      "Percentage difference:+67%"
    )
  })

  // Negative tests

  it("should display 0 as the number of completed todos today when user sets todos as complete and then sets them as uncomplete", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // Uncomplete all todos
    cy.get(".check-completed").each(($el) => {
      cy.get($el).click()
    })

    // Check daily completed todos is 0
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed today:0"
    )
  })

  it("should display 0 as the number of average daily completed todos today when user sets todos as complete and then sets them as uncomplete", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // Uncomplete all todos
    cy.get(".check-completed").each(($el) => {
      cy.get($el).click()
    })

    // Check avg daily completed todos is 0
    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "include.text",
      "Avg daily completed:0"
    )
  })

  it("should display 0% as the number of percentage difference when user sets todos as complete and then sets them as uncomplete", () => {
    // Add todos (today)
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // Complete todos (today)
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // Uncomplete all todos
    cy.get(".check-completed").each(($el) => {
      cy.get($el).click()
    })

    // Check percentage difference is 0%
    cy.getBySel("statistics-percentage-diff").should(
      "include.text",
      "Percentage difference:0%"
    )
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
