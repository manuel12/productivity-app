/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

const singleTodo = require("../../../../fixtures/singleTodo.json")
const singleUpdatedTodo = require("../../../../fixtures/singleUpdatedTodo.json")
const invalidDataTypeTodo = require("../../../../fixtures/invalidDataTypeTodo.json")

describe("UPDATE Todo - (PATCH) /api/todo/:id", () => {
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

  qase(
    118,
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
  )

  // Negative tests

  qase(
    119,
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
  )

  qase(
    120,
    it("should not update a todo with invalid id", () => {
      // Update todo with invalid id
      cy.request({
        method: "PATCH",
        url: `${apiUrl}/api/todo/${invalidId}`,
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json",
        },
        body: singleTodo,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404)
        expect(res.body.error).to.eq(`Todo with id ${invalidId} not found.`)
      })
    })
  )

  qase(
    121,
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
  )

  qase(
    122,
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
  )

  qase(
    123,
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
  )

  qase(
    124,
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
        expect(res.body.error).to.eq(
          "Description must be at least 3 characters."
        )
      })
    })
  )

  qase(
    125,
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
  )

  afterEach(() => {
    // Delete created test todos
    cy.deleteTestTodos(ctx.token)
  })
})
