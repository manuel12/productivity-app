/// <reference types="cypress" />

const userData = require("../../../fixtures/users/userData.json")
const testuser = userData.validData

describe("UserNavigationTodoTabFiltering", () => {
  before(() => {
    cy.deleteTestUsers()
    // Visit the login page before each test
    cy.visit("http://localhost:3000/accounts/login")
  })

  it("should register a new user and navigate through the app", () => {
    // Step #2: Click on 'CREATE ACCOUNT' button
    cy.step("Click on 'CREATE ACCOUNT' button")
    cy.get("button").contains("CREATE ACCOUNT").click() // Adjust selector as necessary

    // Step #3: Check app redirects to /account/register
    cy.step("Check app redirects to /account/register")
    cy.url().should("include", "/account/register")

    // Step #4: Type username
    cy.step("Type username")
    cy.getBySel("username").type(testuser.username) // Adjust selector as necessary

    // Step #5: Type email
    cy.step("Type email")
    cy.getBySel("email").type(testuser.email) // Adjust selector as necessary

    // Step #6: Type password
    cy.step("Type password")
    cy.getBySel("password").type(testuser.password) // Adjust selector as necessary

    // Step #7: Type password confirmation
    cy.step("Type password confirmation")
    cy.getBySel("password-confirmation").type(testuser.password) // Adjust selector as necessary

    // Step #8: Click on 'Register' button
    cy.step("Click on 'Register' button")
    cy.getBySel("register-button").click() // Adjust selector as necessary

    // Step #9: Check register success message
    cy.step("Check register success message")
    cy.contains("User testuser1@gmail.com successfully registered!").should(
      "be.visible"
    )

    // Step #10: Check app redirects to login page
    cy.step("Check app redirects to login page")
    cy.url().should("include", "/account/login")

    // Step #11: Type email
    cy.step("Type email")
    cy.getBySel("email").type(testuser.email) // Adjust selector as necessary

    // Step #12: Type password
    cy.step("Type password")
    cy.getBySel("password").type(testuser.password) // Adjust selector as necessary

    // Step #13: Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.get("button").contains("LOGIN").click() // Adjust selector as necessary

    // Step #14: Check login success message
    cy.step("Check login success message")
    cy.contains("Login successful!").should("be.visible")

    // Step #15: Click on Home on the navigation bar
    cy.step("Click on Home on the navigation bar")
    cy.get("nav").contains("Home").click() // Adjust selector as necessary

    // Step #16: Check app redirects to home page
    cy.step("Check app redirects to home page")
    cy.url().should("eq", "http://localhost:3000/")

    // Step #17: Create 5 todos
    cy.step("Create 5 todos")
    const todos = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]
    todos.forEach((todo) => {
      cy.getBySel("todo-input").type(todo) // Adjust selector as necessary
      cy.get("button").contains("Add Todo").click() // Adjust selector as necessary
    })

    // Step #18: Complete the first 2
    cy.step("Complete the first 2")
    cy.get(".todo-item").first().find(".fa-circle-check").click() // Adjust selector as necessary
    cy.get(".todo-item").eq(1).find(".fa-circle-check").click() // Adjust selector as necessary

    // Step #19: Check the first 2 disappear from the Uncompleted tab
    cy.step("Check the first 2 disappear from the Uncompleted tab")
    cy.get(".todo-item").should("have.length", 3) // Adjust selector as necessary

    // Step #20: Click on the Completed tab
    cy.step("Click on the Completed tab")
    cy.getBySel("complete-tab").click() // Adjust selector as necessary

    // Step #21: Check the completed todos are displayed there
    cy.step("Check the completed todos are displayed there")
    cy.get(".todo-item").should("have.length", 2) // Adjust selector as necessary

    // Step #22: Click on the All tab
    cy.step("Click on the All tab")
    cy.getBySel("all-tab").click() // Adjust selector as necessary

    // Step #23: Check all created todos are displayed there
    cy.step("Check all created todos are displayed there")
    cy.get(".todo-item").should("have.length", 5) // Adjust selector as necessary

    // Step #24: Click on Logout on the navigation bar
    cy.step("Click on Logout on the navigation bar")
    cy.getBySel("nav-link-logout").click() // Adjust selector as necessary

    // Step #25: Check app redirects to login page
    cy.step("Check app redirects to login page")
    cy.url().should("include", "/account/login")
  })
})
