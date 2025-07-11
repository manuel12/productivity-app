/// <reference types="cypress" />

const userData = require("../../../fixtures/users/userData.json")
const testuser = userData.validData
const todoData = require("../../../fixtures/todos/todoData.json")
const singleTodo = todoData.validData.singleTodo
const singleUpdatedTodo = todoData.validData.singleUpdatedTodo
const invalidTodo = todoData.invalidData
const invalidDataTypeTodo = invalidTodo.invalidDataTypeTodo

describe("UPDATE Todo - (PATCH) /api/todo/:id", () => {
  const apiUrl = "http://localhost:4000"
  const ctx = {}

  before(() => {
    // Register with API
    cy.registerWithAPI(testuser)

    // Login with API
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login/`,
      body: testuser,
      failOnStatusCode: false,
    }).then((res) => {
      ctx.token = res.body.token
    })
  })

  beforeEach(() => {
    // Create todo to update and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todo/`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: singleTodo,
    }).then((res) => {
      ctx.todoId = res.body.id
    })
  })

  // Positive tests

  // PATCH  - /api/todo/:id updateTodo
  it("should update a specific todo with valid data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todo/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: singleUpdatedTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully updated!`)
      expect(res.body.data.completed).to.eq(singleUpdatedTodo.completed)
      expect(res.body.data.description).to.eq(singleUpdatedTodo.description)
    })
  })

  // Negative tests

  it("should not update a todo with invalid data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todo/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: invalidDataTypeTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description (string) specified."
      )
    })
  })

  it("should not update a todo with invalid id", () => {
    // Update todo with invalid id
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todo/${invalidTodo.invalidId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: singleTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.error).to.eq(
        `Todo with id ${invalidTodo.invalidId} not found.`
      )
    })
  })

  it("should not update todo with empty data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todo/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })

  it("should respond with a message indicating any missing data", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todo/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description (string) specified."
      )
    })
  })

  it("should not update a todo with invalid token", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/api/todo/${ctx.todoId}`,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.error).to.eq("Unauthorized: No token provided.")
    })
  })

  it("should respond with error message 'Description must be at least 3 characters.' when submitting a shorter description", () => {
    const shortDescription = "No"
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todo`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {
        completed: singleTodo.completed,
        description: shortDescription,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq("Description must be at least 3 characters.")
    })
  })

  it("should respond with error message 'Description must be shorter than 40 characters.' when submitting a longer description", () => {
    const longDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todo`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {
        completed: singleTodo.completed,
        description: longDescription,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        "Description must be shorter than 40 characters."
      )
    })
  })

  afterEach(() => {
    // Delete created test todos
    cy.deleteTestTodos(ctx.token)
  })
})
