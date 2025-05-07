/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

const singleTodo = require("../../../../fixtures/singleTodo.json")

describe("READ Todo - (GET) /api/todo/", () => {
  const apiUrl = "http://localhost:4000"
  const invalidId = 999999999
  const ctx = {}

  before(() => {
    // Register with API
    cy.registerWithAPI({
      username: "testuser",
      email: "test_user@gmail.com",
      password: "Testpass1!",
    })

    // Login with API
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/login/`,
      body: { email: "test_user@gmail.com", password: "Testpass1!" },
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

  qase(
    113,
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
  )
  // GET  - /api/todo/:id getTodo
  qase(
    114,
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
  )

  // GET  - /api/todo/ getTodos
  qase(
    115,
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
  )

  qase(
    116,
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
  )

  // Negative tests

  qase(
    116,
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
  )

  qase(
    117,
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
  )

  afterEach(() => {
    // Delete created test todos
    cy.deleteTestTodos(ctx.token)
  })
})
