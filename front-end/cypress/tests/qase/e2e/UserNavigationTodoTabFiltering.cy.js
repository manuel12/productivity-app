/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

describe("UserNavigationTodoTabFiltering", () => {
  before(() => {
    cy.deleteTestUsers()
    // Visit the login page before each test
    cy.visit("http://localhost:3000/accounts/login")
  })

  qase(
    78,
    it("should register a new user and navigate through the app", () => {
      // Step #2: Click on 'CREATE ACCOUNT' button
      cy.get("button").contains("CREATE ACCOUNT").click() // Adjust selector as necessary

      // Step #3: Check app redirects to /account/register
      cy.url().should("include", "/account/register")

      // Step #4: Type username
      cy.get('input[name="username"]').type("testuser1") // Adjust selector as necessary

      // Step #5: Type email
      cy.get('input[name="email"]').type("testuser1@gmail.com") // Adjust selector as necessary

      // Step #6: Type password
      cy.get('input[name="password"]').type("Testpass1!") // Adjust selector as necessary

      // Step #7: Type password confirmation
      cy.get('input[name="password-confirmation"]').type("Testpass1!") // Adjust selector as necessary

      // Step #8: Click on 'Register' button
      cy.getBySel("register-button").click() // Adjust selector as necessary

      // Step #9: Check register success message
      cy.contains("User testuser1@gmail.com successfully registered!").should(
        "be.visible"
      )

      // Step #10: Check app redirects to login page
      cy.url().should("include", "/account/login")

      // Step #11: Type email
      cy.get('input[name="email"]').type("testuser1@gmail.com") // Adjust selector as necessary

      // Step #12: Type password
      cy.get('input[name="password"]').type("Testpass1!") // Adjust selector as necessary

      // Step #13: Click 'LOGIN' button
      cy.get("button").contains("LOGIN").click() // Adjust selector as necessary

      // Step #14: Check login success message
      cy.contains("Login successful!").should("be.visible")

      // Step #15: Click on Home on the navigation bar
      cy.get("nav").contains("Home").click() // Adjust selector as necessary

      // Step #16: Check app redirects to home page
      cy.url().should("eq", "http://localhost:3000/")

      // Step #17: Create 5 todos
      const todos = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]
      todos.forEach((todo) => {
        cy.get('[data-cy="todo-input"]').type(todo) // Adjust selector as necessary
        cy.get("button").contains("Add Todo").click() // Adjust selector as necessary
      })

      // Step #18: Complete the first 2
      cy.get(".todo-item").first().find(".fa-circle-check").click() // Adjust selector as necessary
      cy.get(".todo-item").eq(1).find(".fa-circle-check").click() // Adjust selector as necessary

      // Step #19: Check the first 2 disappear from the Uncompleted tab
      cy.get(".todo-item").should("have.length", 3) // Adjust selector as necessary

      // Step #20: Click on the Completed tab
      cy.get('[data-cy="complete-tab"]').click() // Adjust selector as necessary

      // Step #21: Check the completed todos are displayed there
      cy.get(".todo-item").should("have.length", 2) // Adjust selector as necessary

      // Step #22: Click on the All tab
      cy.get('[data-cy="all-tab"]').click() // Adjust selector as necessary

      // Step #23: Check all created todos are displayed there
      cy.get(".todo-item").should("have.length", 5) // Adjust selector as necessary

      // Step #24: Click on Logout on the navigation bar
      cy.get('[data-cy="nav-link-logout"]').click() // Adjust selector as necessary

      // Step #25: Check app redirects to login page
      cy.url().should("include", "/account/login")
    })
  )
})
