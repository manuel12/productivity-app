/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")
const invalidCredentials = require("../../../fixtures/invalidCredentials.json")
const validTodo = require("../../../fixtures/todo.json")
const invalidTodo = require("../../../fixtures/invalidTodo.json")

describe("Authentication Section - Register Smoke tests", () => {
  before(() => {
    cy.deleteTestUsers()
    cy.visit("/")
  })

  // Positive tests

  it("should allow the user to register with valid credentials", () => {
    cy.getBySel("register-link").click()

    // Check alert error message
    cy.getBySel("register-button").click()

    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Username, email or password invalid.")

    // Check required error labels
    cy.getBySel("username-error-label").should(
      "have.text",
      "A username is required."
    )

    cy.getBySel("email-error-label").should(
      "have.text",
      "An email address is required."
    )

    cy.getBySel("password-error-label").should(
      "have.text",
      "A password is required."
    )

    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "A password confirmation is required."
    )

    // Check username error labels
    cy.getBySel("username").type(invalidCredentials.usernameShortThan6Chars)
    cy.getBySel("register-button").click()

    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be at least 6 characters."
    )

    // Check email error labels
    cy.getBySel("email").type(invalidCredentials.invalidEmail)
    cy.getBySel("register-button").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")

    // Check password error labels
    cy.getBySel("password")
      .clear()
      .type(invalidCredentials.passwordShorterThan8Chars)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noUppercasePassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noLowercasePassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noNumberPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )

    cy.getBySel("password")
      .clear()
      .type(invalidCredentials.noSpecialCharPassword)
    cy.getBySel("register-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 special character."
    )

    // Check password confirmation error labels
    cy.getBySel("password").clear().type(invalidCredentials.correctPassword1)
    cy.getBySel("password-confirmation").type(
      invalidCredentials.correctPassword2
    )

    cy.getBySel("register-button").click()

    cy.getBySel("password-confirmation-error-label").should(
      "have.text",
      "Passwords do not match."
    )

    // Enter valid registration details and submit the form
    cy.getBySel("username").clear().type(testuser.username)
    cy.getBySel("email").clear().type(testuser.email)
    cy.getBySel("password").clear().type(testuser.password)
    cy.getBySel("password-confirmation").clear().type(testuser.password)
    cy.getBySel("register-button").click()

    // Check alert success message
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("have.text", `User ${testuser.email} successfully registered!`)
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

describe("Authentication Section - Login Smoke tests", () => {
  before(() => {
    cy.registerWithAPI()
    cy.visit("/")
  })

  // Positive tests

  it("should allow the user to login with valid credentials", () => {
    // Check alert error message
    cy.getBySel("login-button").click()

    cy.getBySel("form-action-error")
      .should("be.visible")
      .and("have.text", "Email or password invalid.")

    // Check required error labels
    cy.getBySel("email-error-label").should(
      "have.text",
      "An email address is required."
    )

    cy.getBySel("password-error-label").should(
      "have.text",
      "A password is required."
    )

    // Check email error labels
    cy.getBySel("email").type(invalidCredentials.invalidEmail)
    cy.getBySel("login-button").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")

    // Check password error labels
    cy.getBySel("password")
      .clear()
      .type(invalidCredentials.passwordShorterThan8Chars)
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noUppercasePassword)
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noLowercasePassword)
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )

    cy.getBySel("password").clear().type(invalidCredentials.noNumberPassword)
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )

    cy.getBySel("password")
      .clear()
      .type(invalidCredentials.noSpecialCharPassword)
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 special character."
    )

    cy.getBySel("email").clear().type(testuser.email)
    cy.getBySel("password").clear().type(testuser.password)
    cy.getBySel("login-button").click()

    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", "Login successfull!")
    cy.getBySel("form-action-error").should("not.exist")

    cy.url().should("eq", "http://localhost:3000/")

    cy.getBySel("login-form").should("not.exist")
    cy.getBySel("navbar").should("be.visible")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

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

describe("Todo Section - Add Todo Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    // Check alert error message
    cy.getBySel("todo-submit").click()
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todo is required.")

    cy.getBySel("todo-input")
      .clear()
      .type(invalidTodo.todoDescShorterThan3Chars)
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain less than 3 characters.")

    cy.getBySel("todo-input")
      .clear()
      .type(invalidTodo.todoDescLongerThan40Chars)
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")

    cy.getBySel("todo-input").clear().type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item").should("be.visible")

    //cy.getBySel("todo-page-container").matchImageSnapshot("Added todo")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

describe("Todo Section - Edit Todo Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  // Positive tests

  it("should edit a todo", () => {
    // Create a todo
    cy.getBySel("todo-input").type(validTodo.validTodoDesc)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item")
      .filter(`:contains(${validTodo.validTodoDesc})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`{enter}`)

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos is required.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescShorterThan3Chars}{enter}`
    )

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain less than 3 characters.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${invalidTodo.todoDescLongerThan40Chars}{enter}`
    )

    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")

    // Find and edit that existing todo
    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(
      `${validTodo.validTodoUpdateDesc}{enter}`
    )

    // Validate the todo is updated correctly
    cy.contains(validTodo.validTodoDesc).should("not.exist")
    cy.contains("[data-cy=todo-item]", validTodo.validTodoUpdateDesc).should(
      "exist"
    )

    // cy.getBySel("todo-page-container").matchImageSnapshot("Edited todo")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

describe("Todo Section - Delete Todo Smoke tests", () => {
  before(() => {
    todoTestsPreconditions()
  })

  it("should delete a todo and remove it from the list", () => {
    // Create a todo with the text 'Todo to Delete' that you want to delete

    cy.getBySel("todo-input").type(validTodo.validTodoToDeleteDesc)
    cy.getBySel("todo-submit").click()

    // Find the todo item with text 'Todo to Delete' and locate its delete button, then click it
    cy.contains(validTodo.validTodoToDeleteDesc)
      .parent()
      .find(".remove-icon-container")
      .click()

    // Verify that the todo with text 'Todo to Delete' no longer exists in the todo list
    cy.contains(validTodo.validTodoToDeleteDesc).should("not.exist")

    //cy.getBySel("todo-page-container").matchImageSnapshot("Deleted todo")
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})

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

    // cy.getBySel("todo-page-container").matchImageSnapshot(
    //   "Marked todo as complete"
    // )
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

    // cy.get(".TodosPage-upper-stats").matchImageSnapshot(
    //   "Displays number of todos completed today"
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

    // cy.get(".TodosPage-upper-stats").matchImageSnapshot(
    //   "Displays average number of completed todos"
    // )
  })

  afterEach(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()
  })
})
