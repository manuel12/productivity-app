/// <reference types="cypress" />

const testuser = require("../../../fixtures/testuser.json")

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
    cy.getBySel("username").type("abcde")
    cy.get("button[type='submit']").click()

    cy.getBySel("username-error-label").should(
      "have.text",
      "Username must be at least 6 characters."
    )

    // Check email error labels
    cy.getBySel("email").type("Invalid Email Address")
    cy.get("button[type='submit']").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")

    // Check password error labels
    cy.getBySel("password").clear().type("abcdefh")
    cy.get("button[type='submit']").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )

    cy.getBySel("password").clear().type("abcdefhg")
    cy.get("button[type='submit']").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )

    cy.getBySel("password").clear().type("ABCDEFGH")
    cy.get("button[type='submit']").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )

    cy.getBySel("password").clear().type("Abcdefhg")
    cy.get("button[type='submit']").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )

    cy.getBySel("password").clear().type("Abcdefhg1")
    cy.get("button[type='submit']").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 special character."
    )

    // Check password confirmation error labels
    cy.getBySel("password").clear().type("CorrectPassword1!")
    cy.getBySel("password-confirmation").type("INCORRECT_password_CONFIRMATION")

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
    cy.get("button[type='submit']").click()

    // Check alert success message
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("have.text", `User ${testuser.email} successfully registered!`)
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
    cy.getBySel("email").type("Invalid Email Address")
    cy.getBySel("login-button").click()

    cy.getBySel("email-error-label").should("have.text", "Email must be valid.")

    // Check password error labels
    cy.getBySel("password").clear().type("abcdefh")
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must be at least 8 characters."
    )

    cy.getBySel("password").clear().type("abcdefhg")
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 uppercase character."
    )

    cy.getBySel("password").clear().type("ABCDEFGH")
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 lowercase character."
    )

    cy.getBySel("password").clear().type("Abcdefhg")
    cy.getBySel("login-button").click()

    cy.getBySel("password-error-label").should(
      "have.text",
      "Password must contain at least 1 number character."
    )

    cy.getBySel("password").clear().type("Abcdefhg1")
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
})

describe("Todo Section - Add Todo Smoke tests", () => {
  const testTodoOne = "Feed the cats (test)"
  const createdTodo = "Created Todo (test)"
  const updatedTodo = "Updated Todo Item (test)"
  const todoTextShorterThan3Char = "ab"
  const todoTextLongerThan40Char =
    "(test) This is a daily with more than 40 characters, which should not be allowed"

  before(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()

    // Register testuser
    cy.register()
  })

  beforeEach(() => {
    cy.visit("/")
    // Login testuser
    cy.login()
  })

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    // Check alert error message
    cy.getBySel("todo-submit").click()
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todo is required.")

    cy.getBySel("todo-input").clear().type(todoTextShorterThan3Char)
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot be less than 3 characters.")

    cy.getBySel("todo-input").clear().type(todoTextLongerThan40Char)
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot be more than 40 characters.")

    cy.getBySel("todo-input").clear().type(testTodoOne)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item").should("be.visible")

    //cy.getBySel("todo-page-container").matchImageSnapshot("Added todo")
  })
})

describe("Todo Section - Todo Smoke tests", () => {
  const testTodoOne = "Feed the cats (test)"
  const createdTodo = "Created Todo (test)"
  const updatedTodo = "Updated Todo Item (test)"
  const todoTextShorterThan3Char = "ab"
  const todoTextLongerThan40Char =
    "(test) This is a daily with more than 40 characters, which should not be allowed"

  before(() => {
    cy.deleteTestUsers()
    cy.deleteTestTodos()

    // Register testuser
    cy.register()
  })

  beforeEach(() => {
    cy.visit("/")
    // Login testuser
    cy.login()
  })

  // Positive tests

  it("should edit a todo", () => {
    // Create a todo
    cy.getBySel("todo-input").type(createdTodo)
    cy.getBySel("todo-submit").click()

    cy.getBySel("todo-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`{enter}`)

    cy.get('[data-cy="todo-error-label"]')
      .should("be.visible")
      .and("have.text", "Todos is required.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextShorterThan3Char}{enter}`)

    cy.get('[data-cy="todo-error-label"]')
      .should("be.visible")
      .and("have.text", "Todos cannot be less than 3 characters.")

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextLongerThan40Char}{enter}`)

    cy.get('[data-cy="todo-error-label"]')
      .should("be.visible")
      .and("have.text", "Todos cannot be more than 40 characters.")

    // Find and edit that existing todo
    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${updatedTodo}{enter}`)

    // Validate the todo is updated correctly
    cy.contains(createdTodo).should("not.exist")
    cy.contains("[data-cy=todo-item]", updatedTodo).should("exist")

    // cy.getBySel("todo-page-container").matchImageSnapshot("Edited todo")
  })

  it.skip("should delete a todo and remove it from the list", () => {
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

    //cy.getBySel("todo-page-container").matchImageSnapshot("Deleted todo")
  })

  it.skip("should mark a todo as complete", () => {
    const todoTextToComplete = "Todo to Complete (test)"
    cy.getBySel("todos-input").type(todoTextToComplete)
    cy.getBySel("todos-submit").click()

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

  it.skip("should display the number of completed todos today", () => {
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

    // cy.get(".TodosPage-upper-stats").matchImageSnapshot(
    //   "Displays number of todos completed today"
    // )
  })

  it.skip("should display the average number of completed todos per day", () => {
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

    // cy.get(".TodosPage-upper-stats").matchImageSnapshot(
    //   "Displays average number of completed todos"
    // )
  })

  // Negative tests

  it.skip("should display 0 todos initially", () => {
    // cy.getBySel("todo-page-container").matchImageSnapshot(
    //   "Displays 0 todos initially"
    // )
  })

  it.skip('should display an error label "Todos cannot be less than 3 characters" when falling below that amount', () => {
    cy.getBySel("todos-input").type(todoTextShorterThan3Char + "{enter}")

    // cy.getBySel("todo-page-container").matchImageSnapshot(
    //   "Displays 'todo cannot be less than 3 characters' error label"
    // )
  })

  it.skip('should display an error label "Todo cannot contain less than 3 characters" when edited todo falls below that amount', () => {
    // Create a todo
    cy.getBySel("todos-input").type(createdTodo)
    cy.getBySel("todos-submit").click()

    cy.getBySel("todos-list").should("have.length", 1)

    // Find and edit that existing todo
    cy.getBySel("todo-item")
      .filter(`:contains(${createdTodo})`)
      .within(() => {
        cy.getBySel("todos-description-container").click()
      })

    cy.getBySel("todos-text-input").clear()
    cy.getBySel("todos-text-input").type(`${todoTextShorterThan3Char}{enter}`)

    // cy.getBySel("todo-page-container").matchImageSnapshot(
    //   "Displays 'todo cannot be less than 3 characters' error label for edits"
    // )
  })

  afterEach(() => {
    cy.deleteTestTodos()
  })
})
