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
    // 1. Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc
    cy.step("Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc")
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // 2. Check initially 'Completed today:' displays 0
    cy.step("Check initially 'Completed today:' displays 0")
    cy.getBySel("statistics-daily-completed-todos").should(
      "include.text",
      "Completed today:0"
    )

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 3. Click the checkmark icon on all added todos to mark them as completed
    cy.step(
      "Click the checkmark icon on all added todos to mark them as completed"
    )

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

      // 4. Check the 'Completed today' statistics element is showing 5 todos completed today
      cy.step(
        "Check the 'Completed today' statistics element is showing 5 todos completed today"
      )

      cy.getBySel("statistics-daily-completed-todos").should(
        "include.text",
        `Completed today:${i}`
      )
    }
  })

  it("should display the average number of completed todos per day", () => {
    // 1. Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc
    cy.step("Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc")

    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // 2. Check initial 'Completed today:' displays 0
    cy.step("Check initial 'Completed today:' displays 0")
    cy.get("TStats_num-container").first().should("have.text", "0")

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 3. Click the checkmark icon on all added todos
    cy.step("Click the checkmark icon on all added todos")
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.getBySel("todos-list").should("be.visible")

    // 4. Change your computer date to tomorrow
    cy.step("Change your computer date to tomorrow")

    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])

    // 5. Add 5 todos in the manner: 'Tomorrow Todo 1', 'Tomorrow Todo 2', etc
    cy.step(
      "Add 5 todos in the manner: 'Tomorrow Todo 1', 'Tomorrow Todo 2', etc"
    )

    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i + numTodosToAdd} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 6. Click the checkmark icon on all added tomorrow todos
    cy.step("Click the checkmark icon on all added tomorrow todos")
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    cy.getBySel("todos-list").should("be.visible")

    // 7. Check the 'Avg daily completed' statistics element is showing 5 todos completed in average daily
    cy.step(
      "Check the 'Avg daily completed' statistics element is showing 5 todos completed in average daily"
    )

    cy.get('[data-cy="statistics-daily-avg-completed-todos"]').should(
      "include.text",
      "Avg daily completed:5"
    )
  })

  it("should display the percentage increase/decrease indicator for completed todos", () => {
    // 1. Add 1 todo with text 'Workout (test)'
    cy.getBySel("todo-input").type(`Workout (test) {enter}`)

    // 2. Check initial 'Completed today:' displays 0
    cy.step("Check initial 'Completed today:' displays 0")
    cy.get("TStats_num-container").first().should("have.text", "0")

    // 3. Click the checkmark icon on the added todo
    cy.get(".check-not-completed").click()

    // // Add todos (today)
    // const numTodosToAddToday = 1
    // for (let i = 1; i <= numTodosToAddToday; i++) {
    //   cy.getBySel("todo-input").type(
    //     `#${i} ${validTodo.validCompletedTodoDesc} (today) {enter}`
    //   )
    // }

    // // Switch to 'All' tab
    // cy.getBySel("all-tab").click()

    // // Complete todos (today)
    // cy.get(".check-not-completed").each(($el) => {
    //   cy.get($el).click()
    // })

    // 4. Change your computer date to tomorrow.
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    cy.clock(tomorrow.getTime(), ["Date"])

    // 5. Add 5 todos in the manner: 'Tomorrow Todo 1', 'Tomorrow Todo 2', etc
    const numTodosToAddTomorrow = 5
    for (let i = 1; i <= numTodosToAddTomorrow; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc} (tomorrow) {enter}`
      )
    }

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 6. Click the checkmark icon on all added tomorrow todos
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // 7. Check the 'Percentage difference' statistics element is showing 67% percentage difference
    cy.get('[data-cy="statistics-percentage-diff"]').should(
      "include.text",
      "Percentage difference:+67%"
    )
  })

  // Negative tests

  it("should display 0 as the number of completed todos today when user sets todos as complete and then sets them as uncomplete", () => {
    // 1. Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc
    cy.step("Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc")

    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // 2. Check initial 'Completed today:' displays 0
    cy.step("Check initial 'Completed today:' displays 0")
    cy.get("TStats_num-container").first().should("have.text", "0")

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 3. Click the checkmark icon on all added todos
    cy.step("Click the checkmark icon on all added todos")

    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // 4. Check all todos have a green checkmark
    cy.step("Check all todos have a green checkmark")

    cy.get("todo-item").each(($todoItem) => {
      cy.get($todoItem).within(() => {
        cy.get(".check-completed").should("be.visible")
      })
    })

    // 5. Click again the checkmark icon on all added todos
    cy.step("Click again the checkmark icon on all added todos")

    cy.get(".check-completed").each(($el) => {
      cy.get($el).click()
    })

    // 6. Check all todos have now a grey checkmark
    cy.step("Check all todos have now a grey checkmark")

    cy.get("todo-item").each(($todoItem) => {
      cy.get($todoItem).within(() => {
        cy.get(".check-not-completed").should("be.visible")
      })
    })

    // 7. Check the 'Completed today' statistics element is showing 0 todos completed today
    cy.step(
      "Check the 'Completed today' statistics element is showing 0 todos completed today"
    )
    cy.getBySel("statistics-daily-avg-completed-todos").should(
      "include.text",
      "0"
    )
  })

  it("should display 0 as the number of average daily completed todos today when user sets todos as complete and then sets them as uncomplete", () => {
    // 1. Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc
    cy.step("Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc")
    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // 2. Check initial 'Completed today:' displays 0
    cy.step("Check initial 'Completed today:' displays 0")
    cy.get("TStats_num-container").first().should("have.text", "0")

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 3. Click the checkmark icon on all added todos
    cy.step("Click the checkmark icon on all added todos")
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // 4. Check all todos have a green checkmark
    cy.step("Check all todos have a green checkmark")

    cy.get("todo-item").each(($todoItem) => {
      cy.get($todoItem).within(() => {
        cy.get(".check-completed").should("be.visible")
      })
    })

    // 5. Click the checkmark icon on all added todos
    cy.step("Click the checkmark icon on all added todos")
    cy.get(".check-completed").each(($el) => {
      cy.get($el).click()
    })

    // 6. Check all todos have a grey checkmark
    cy.step("Check all todos have a grey checkmark")
    cy.get("todo-item").each(($todoItem) => {
      cy.get($todoItem).within(() => {
        cy.get(".check-not-completed").should("be.visible")
      })
    })

    // 7. Check the 'Avg daily completed' statistics element is showing 0 todos completed in average daily
    cy.step(
      "Check the 'Avg daily completed' statistics element is showing 0 todos completed in average daily"
    )
    cy.getBySel("statistics-daily-avg-completed-todos").should(
      "include.text",
      "0"
    )
  })

  it("should display 0% as the number of percentage difference when user sets todos as complete and then sets them as uncomplete", () => {
    // 1. Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc
    cy.step("Add 5 todos in the manner: 'Todo 1', 'Todo 2', etc")

    const numTodosToAdd = 5
    for (let i = 1; i <= numTodosToAdd; i++) {
      cy.getBySel("todo-input").type(
        `#${i} ${validTodo.validCompletedTodoDesc}{enter}`
      )
    }

    // 2. Check initial 'Completed today:' displays 0
    cy.step("Check initial 'Completed today:' displays 0")
    cy.get("TStats_num-container").first().should("have.text", "0")

    // Switch to 'All' tab
    cy.getBySel("all-tab").click()

    // 3. Click the checkmark icon on all added todos
    cy.step("Click the checkmark icon on all added todos")
    cy.get(".check-not-completed").each(($el) => {
      cy.get($el).click()
    })

    // 4. Check all todos have a green checkmark
    cy.step("Check all todos have a green checkmark")
    cy.get("todo-item").each(($todoItem) => {
      cy.get($todoItem).within(() => {
        cy.get(".check-completed").should("be.visible")
      })
    })

    // 5. Click the checkmark icon on all added todos
    cy.step("Click the checkmark icon on all added todos")
    cy.get(".check-completed").each(($el) => {
      cy.get($el).click()
    })

    // 6. Check all todos have a grey checkmark
    cy.step("Check all todos have a grey checkmark")
    cy.get("todo-item").each(($todoItem) => {
      cy.get($todoItem).within(() => {
        cy.get(".check-not-completed").should("be.visible")
      })
    })

    // 7. Check the 'Percentage difference' statistics element is showing 0% percentage difference
    cy.step(
      "Check the 'Percentage difference' statistics element is showing 0% percentage difference"
    )
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
