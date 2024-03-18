/// <reference types="cypress" />

const singleTodo = require("../../../fixtures/singleTodo.json")

describe("READ Todo - (GET) /api/todo/", () => {
  const apiUrl = "http://localhost:4000"
  const invalidId = 999999999
  const ctx = {}

  before(() => {
    // Login with API
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login/`,
      body: { email: "manuelpinedacabeza@gmail.com", password: "Testpass1!" },
      failOnStatusCode: false,
    }).then((res) => {
      ctx.token = res.body.token
    })
  })

  beforeEach(() => {
    // Create 1 todo
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

  // GET  - /api/todo/ getTodos
  it("should retrieve all existing todos", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      expect(res.body.message).to.eq(`Todos successfully retrieved!`)
      expect(res.body.data.length).to.be.above(0)
      return expect(Array.isArray(res.body.data)).to.be.true
    })
  })

  // GET  - /api/todo/:id getTodo
  it("should retrieve a specific todoshould retrieve a specific todo", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todo/${ctx.todoId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully retrieved!`)
    })
  })

  // GET  - /api/todo/ getTodos
  it("should have completed and description properties on returned todos", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: singleTodo,
    }).then((res) => {
      const todos = res.body.data
      todos.forEach((todo) => {
        expect(todo).to.have.ownProperty("completed")
        expect(todo).to.have.ownProperty("description")
      })
    })
  })

  it("should have the correct type on returned todos", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: singleTodo,
    }).then((res) => {
      const todos = res.body.data
      todos.forEach((todo) => {
        expect(todo.completed).to.be.a("boolean")
        expect(todo.description).to.be.a("string")
      })
    })
  })

  // Negative tests

  it("should NOT retrieve a todo when requesting with invalid id", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todo/${invalidId}`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo with id ${invalidId} not found.`)
    })
  })

  it("should not retrieve a todo with invalid token", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todo/1`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.error).to.eq("Unauthorized: No token provided.")
    })
  })

  afterEach(() => {
    // Delete created test todos
    cy.deleteTestTodos(ctx.token)
  })
})
