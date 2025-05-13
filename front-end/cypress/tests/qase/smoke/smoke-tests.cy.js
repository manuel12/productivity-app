/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

import { clearLocalStorage } from "../../../support/utils"
const testuser = require("../../../fixtures/testuser.json")
const validTodo = require("../../../fixtures/todo.json")

describe("Smoke tests", () => {
  context("Register", () => {
    before(() => {
      cy.deleteTestUsers()
    })

    qase(
      17,
      it("should allow the user to register with valid credentials", () => {
        // 1. http://localhost:3000/account/register/
        cy.step("http://localhost:3000/account/register/")
        cy.visit("http://localhost:3000/account/register/")

        // 2. Enter username on username input
        cy.step("Enter username on username input")
        cy.getBySel("username").type(testuser.username)

        // 3. Enter email on email input
        cy.step("Enter email on email input")
        cy.getBySel("email").type(testuser.email)

        // 4. Enter password on password input
        cy.step("Enter password on password input")
        cy.getBySel("password").type(testuser.password)

        // 5. Enter passwordConfirmation on password confirmation input
        cy.step("Enter passwordConfirmation on password confirmation input")
        cy.getBySel("password-confirmation").type(testuser.password)

        // 6. Click 'REGISTER' button
        cy.step("Click 'REGISTER' button")
        cy.getBySel("register-button").click()

        // 7. Visit http://localhost:3000/account/login/
        cy.step("Visit http://localhost:3000/account/login/")
        cy.url().should("include", "/account/login")

        // 8. Enter email on email input
        cy.step("Enter email on email input")
        cy.getBySel("email").type(testuser.email)

        // 9. Enter password on password input
        cy.step("Enter password on password input")
        cy.getBySel("password").type(testuser.password)

        // 10. Click 'LOGIN' button
        cy.step("Click 'LOGIN' button")
        cy.getBySel("login-button").click()
      })
    )
  })

  context("Login", () => {
    before(() => {
      clearLocalStorage()
      // Register test user
      cy.registerWithAPI()
      cy.visit("/")
    })

    qase(
      1,
      it("should redirect to login page when user is not logged in", () => {
        // 1. Visit http://localhost:3000/
        cy.step("Visit http://localhost:3000/")
        cy.visit("http://localhost:3000/")

        // 2. Check the app redirects to /account/login
        cy.step("Check the app redirects to /account/login")
        cy.url().should("include", "/account/login")

        // 3. Visit http://localhost:3000/todos/
        cy.step("Visit http://localhost:3000/todos/")
        cy.visit("http://localhost:3000/todos/")

        // 4. Check the app redirects to /account/login
        cy.step("Check the app redirects to /account/login")
        cy.url().should("include", "/account/login")

        // 5. Visit http://localhost:3000/dailies/
        cy.step("Visit http://localhost:3000/dailies/")
        cy.visit("http://localhost:3000/dailies/")

        // 6. Check the app redirects to /account/login
        cy.step("Check the app redirects to /account/login")
        cy.url().should("include", "/account/login")
      })
    )
    qase(
      2,
      it("should allow the user to login with valid credentials", () => {
        // 1.Visit http://localhost:3000/
        cy.step("Visit http://localhost:3000/")
        cy.visit("/")

        // 2. Enter email on email input
        cy.step("Enter email on email input")
        cy.getBySel("email").type(testuser.email)

        // 3. Enter password on password input
        cy.step("Enter password on password input")
        cy.getBySel("password").type(testuser.password)

        // 4. Click 'LOGIN' button
        cy.step("Click 'LOGIN' button")
        cy.getBySel("login-button").click()

        // 5. Check no error messages are shown
        cy.step("Check no error messages are shown")
        cy.getBySel("form-action-error").should("not.exist")

        // 6. Check the app redirects to http://localhost:3000/
        cy.step("Check the app redirects to http://localhost:3000/")
        cy.url().should("eq", "http://localhost:3000/")

        // 7. Check the login form is not visible
        cy.step("Check the login form is not visible")
        cy.getBySel("login-form").should("not.exist")

        // 8. Check the navbar is visible
        cy.step("Check the navbar is visible")
        cy.getBySel("navbar").should("be.visible")
      })
    )
  })

  context("Add todo", () => {
    const ctx = {}

    before(() => {
      cy.deleteTestTodos()

      cy.registerWithAPI()
      cy.loginWithAPI((res) => {
        ctx.token = res.body.token
        console.log(`Fetched token: ${ctx.token}`)
        window.localStorage.setItem("token", JSON.stringify(ctx.token))
      })
      cy.visit("/")
    })

    qase(
      36,
      it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
        // 1. Enter todoDescription on the input on input
        cy.step("Enter todoDescription on the input on input")
        cy.getBySel("todo-input").type(validTodo.description1)

        // 2. Click 'Add Todo' button
        cy.step("Click 'Add Todo' button")
        cy.getBySel("todo-submit").click()

        // 3. Check a new todo item is added with the text 'Feed the cats(test)'
        cy.step(
          "Check a new todo item is added with the text 'Feed the cats(test)'"
        )
        cy.getBySel("todo-item").should("be.visible").and("have.length", 1)
      })
    )
  })

  context("Edit todo", () => {
    const ctx = {}

    before(() => {
      cy.deleteTestUsers(ctx.token)
      cy.registerWithAPI()
      cy.loginWithAPI((res) => {
        ctx.token = res.body.token
        console.log(`Fetched token: ${ctx.token}`)
        window.localStorage.setItem("token", JSON.stringify(ctx.token))
      })

      // Visit the app or the specific page
      cy.visit("/")
      cy.getBySel("todo-input").type(validTodo.description1 + "{enter}")
    })
    qase(
      44,
      it("should edit a todo", () => {
        // Find and edit that existing todo
        cy.getBySel("todo-item")
          .filter(`:contains(${validTodo.description1})`)
          .within(() => {
            cy.getBySel("todos-description-container").click()
          })

        cy.getBySel("todos-text-input").clear()
        cy.getBySel("todos-text-input").type(
          `${validTodo.updateDescription1}{enter}`
        )

        // Validate the todo is updated correctly
        cy.contains(validTodo.description1).should("not.exist")
        cy.contains("[data-cy=todo-item]", validTodo.updateDescription1).should(
          "exist"
        )
      })
    )
  })

  context("Delete todo", () => {
    const ctx = {}

    before(() => {
      cy.deleteTestUsers(ctx.token)
      cy.registerWithAPI()
      cy.loginWithAPI((res) => {
        ctx.token = res.body.token
        console.log(`Fetched token: ${ctx.token}`)
        window.localStorage.setItem("token", JSON.stringify(ctx.token))
      })

      // Visit the app or the specific page
      cy.visit("/")
      cy.getBySel("todo-input").type(validTodo.description1 + "{enter}")
    })

    qase(
      50,
      it("should delete a todo and remove it from the list", () => {
        // 1. Find the todo with the text 'Feed the cats(test)'
        cy.step("Find the todo with the text 'Feed the cats(test)'")
        cy.step("Click on the todo's 'X' button")
        cy.contains(validTodo.description1)
          .parent()

          // 2. Click on the todo's 'X' button
          .find(".remove-icon-container")
          .click()

        // 3. Check the todo is deleted from the todo list
        cy.step("Check the todo is deleted from the todo list")
        cy.contains(validTodo.description1).should("not.exist")
      })
    )
  })

  context("Complete todo", () => {
    const ctx = {}

    before(() => {
      cy.deleteTestUsers(ctx.token)
      cy.registerWithAPI()
      cy.loginWithAPI((res) => {
        ctx.token = res.body.token
        console.log(`Fetched token: ${ctx.token}`)
        window.localStorage.setItem("token", JSON.stringify(ctx.token))
      })

      // Visit the app or the specific page
      cy.visit("/")
      cy.getBySel("todo-input").type(validTodo.description1 + "{enter}")
    })
    qase(
      50,
      it("should mark a todo as complete", () => {
        // 1. Check that first todo is not marked as completed (has grey checkmark icon)
        cy.step(
          "Check that first todo is not marked as completed (has grey checkmark icon)"
        )
        cy.getBySel("todo-item")
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

        // 2. Click on the checkmark icon to mark as completed
        cy.step("Click on the checkmark icon to mark as completed")
        cy.getBySel("todo-item")
          .filter(":contains('test')")
          .within(() => {
            cy.getBySel("todos-check-icon-container").click()
          })

        // Click the complete tab
        cy.get('[data-cy="complete-tab"]').click()

        // 3. Check the todo completed sound is played and the todo dissapears from uncompleted list
        cy.step(
          "Check the todo completed sound is played and the todo dissapears from uncompleted list"
        )
        cy.getBySel("todo-item")
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
    )
  })

  context("Uncomplete", () => {})

  context("Tabs", () => {
    const ctx = {}

    before(() => {
      cy.deleteTestUsers(ctx.token)
      cy.registerWithAPI()
    })

    beforeEach(() => {
      cy.loginWithAPI((res) => {
        ctx.token = res.body.token
        console.log(`Fetched token: ${ctx.token}`)
        window.localStorage.setItem("token", JSON.stringify(ctx.token))
      })
      cy.visit("/")

      // Create some initial todos
      const todos = [
        validTodo.description1,
        validTodo.description2,
        validTodo.description3,
      ]
      todos.forEach((todo) => {
        cy.getBySel("todo-input").type(`${todo} {enter}`)
      })
    })

    qase(
      57,

      it("should display 3 tabs above the todos list: 'All', 'Completed', 'Uncompleted' ", () => {
        // 1. Check there are 3 tabs above the todo list: 'Uncompleted', 'Completed', 'All'
        cy.step(
          "Check there are 3 tabs above the todo list: 'Uncompleted', 'Completed', 'All'"
        )
        cy.getBySel("todos-tabs")
          .should("be.visible")
          .within(() => {
            cy.getBySel("all-tab").should("have.text", "All")
            cy.getBySel("complete-tab").should("have.text", "Completed")
            cy.getBySel("uncomplete-tab").should("have.text", "Uncompleted")
          })
      })
    )

    qase(
      58,
      it("should by default have 'Uncompleted' tab active", () => {
        // 1. Check the 'Uncomplete' tab is active by default
        cy.step("Check the 'Uncomplete' tab is active by default")
        cy.getBySel("uncomplete-tab").should("have.class", "active")
      })
    )
  })
})
