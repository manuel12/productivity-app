/// <reference types="cypress" />

const todoData = require("../../../fixtures/todos/todoData.json")
const validTodo = todoData.validData
const invalidTodo = todoData.invalidData

describe("Todo Section - Add Todo", () => {
  const ctx = {}

  beforeEach(() => {
    // Cleanup
    cy.deleteTestUsers()
    cy.deleteTestTodos()

    cy.registerWithAPI()
    cy.loginWithAPI((res) => {
      ctx.token = res.body.token
      console.log(`Fetched token: ${ctx.token}`)
      window.localStorage.setItem("token", JSON.stringify(ctx.token))
    })
    cy.visit("/")
  })

  // Positive tests

  it('should add a todo by writing on input and clicking on a "Add todo" button', () => {
    // 1. Enter todoDescription on the todo input
    cy.step("Enter todoDescription on the todo input")
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

  it("should add a todo by writing on input and pressing enter key", () => {
    // 1. Enter todoDescription on the todo input
    cy.step("Enter todoDescription on the todo input")

    // 2. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todo-input").type(validTodo.description3 + "{enter}")

    // 3. Check a new todo item is added with the text 'Clean room (test)'
    cy.step("Check a new todo item is added with the text 'Clean room (test)'")
    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.description3)
  })

  it("should display added todos correctly on the list", () => {
    // 1. Enter todoDescription1 on the todo input
    cy.step("Enter todoDescription1 on the todo input")
    cy.getBySel("todo-input").type(validTodo.description1)

    // 2. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 3. Enter todoDescription2 on the todo input
    cy.step("Enter todoDescription2 on the todo input")
    cy.getBySel("todo-input").type(validTodo.description2)

    // 4. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 5. Enter todoDescription3 on the todo input
    cy.step("Enter todoDescription3 on the todo input")
    cy.getBySel("todo-input").type(validTodo.description3)

    // 6. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 7. Check a new todo item is added with the text 'Take out trash (test)'
    cy.step(
      "Check a new todo item is added with the text 'Take out trash (test)'"
    )
    cy.get(".todo-item").eq(2).should("contain.text", validTodo.description1)

    // 8. Check the second todo with the text 'Clean room (test)' is added below the first
    cy.step(
      "Check the second todo with the text 'Clean room (test)' is added below the first"
    )
    cy.get(".todo-item").eq(1).should("contain.text", validTodo.description2)

    // 9. Check the third todo with the text 'Feed the cats (test)' is added below the second
    cy.step(
      "Check the third todo with the text 'Feed the cats (test)' is added below the second"
    )
    cy.get(".todo-item").eq(0).should("contain.text", validTodo.description3)
  })

  it("should persist todos after page reload", () => {
    // 1. Enter todoDescription on the todo input
    cy.step("Enter todoDescription on the todo input")
    cy.getBySel("todo-input").type(validTodo.description1)

    // 2. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 3. Reload the page
    cy.step("Reload the page")
    cy.reload()

    // 4. Check the todo item with the text 'Feed the cats(test)' is visible after a page reload
    cy.step(
      "Check the todo item with the text 'Feed the cats(test)' is visible after a page reload"
    )
    cy.getBySel("todos-list").should("have.length", 1)
    cy.getBySel("todos-list")
      .first()
      .should("contain.text", validTodo.description1)
  })

  // Negative tests

  it("should not allow to add a todo with more than 40 characters", () => {
    // 1. Enter longDescription on the todo input
    cy.step("Enter longDescription on the todo input")
    cy.getBySel("todo-input").type(invalidTodo.descriptionLongerThan40Chars)

    // 2. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 3. Check no new todos are added
    cy.step("Check no new todos are added")
    cy.getBySel("todo-item").should("have.length", 0)
  })

  it('should display an error label "Todos must be shorter than 40 characters." when exceeding that amount', () => {
    // 1. Enter longDescription on input
    cy.step("Enter longDescription on input")
    cy.getBySel("todo-input").type(invalidTodo.descriptionLongerThan40Chars)

    // 2. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 3. Check an error label for the todo input with the text 'Todos cannot contain more than 40 characters.' is visible
    cy.step(
      "Check an error label for the todo input with the text 'Todos cannot contain more than 40 characters.' is visible"
    )
    cy.getBySel("input-error-label").should(
      "have.text",
      "Todos cannot contain more than 40 characters."
    )
  })

  it("should not allow to add a todo when leaving input field empty", () => {
    // 1. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 2. Check no new todos are added
    cy.step("Check no new todos are added")
    cy.getBySel("todo-item").should("have.length.gte", 0)
  })

  it("should not allow to add a todo with less than 3 characters", () => {
    // 1. Enter shortDescription on input
    cy.step("Enter shortDescription on input")
    cy.getBySel("todo-input").type(invalidTodo.descriptionShorterThan3Chars)

    // 2. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 3. Check an error label for the todo input with the text 'Todos must be at least 3 characters.' is visible
    cy.step(
      "Check an error label for the todo input with the text 'Todos must be at least 3 characters.' is visible"
    )
    cy.getBySel("input-error-label").should(
      "have.text",
      "Todos must be at least 3 characters."
    )
  })

  it('should display an error label "Todos must be at least 3 characters." when falling below that amount', () => {
    // 1. Enter shortDescription  on input
    cy.step("Enter shortDescription  on input")
    cy.getBySel("todo-input").type(invalidTodo.descriptionShorterThan3Chars)

    // 2. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.getBySel("todo-submit").click()

    // 3. Check an error label for the todo input with the text 'Todos cannot be less than 3 characters.' is visible
    cy.step(
      "Check an error label for the todo input with the text 'Todos cannot be less than 3 characters.' is visible"
    )
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("contain.text", "Todos must be at least 3 characters.")
  })
})
