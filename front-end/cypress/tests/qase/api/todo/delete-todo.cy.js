/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

const singleTodo = require("../../../../fixtures/singleTodo.json")

describe("DELETE Todo - (DELETE) /api/todo/:id", () => {
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
    // Create todo to delete and get it's ID
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

  // DELETE  - /api/todo/:id updateTodo

  qase(
    101,
    it("should delete a specific todo with valid id", () => {
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/todo/${ctx.todoId}`,
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(204)
      })
    })
  )

  qase(
    102,
    it("should subtract -1 to the current number of todos when deleting one", () => {
      // Check current amount of todos
      let amountTodos
      let newAmountTodos

      cy.request({
        method: "GET",
        url: `${apiUrl}/api/todos/`,
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          amountTodos = res.body.data.length
        })
        .then(() => {
          // Delete todo
          cy.request({
            method: "DELETE",
            url: `${apiUrl}/api/todo/${ctx.todoId}`,
            headers: {
              Authorization: `Bearer ${ctx.token}`,
              "Content-Type": "application/json",
            },
          }).then(() => {
            // Check new amount of todos is now -1
            cy.request({
              method: "GET",
              url: `${apiUrl}/api/todos/`,
              headers: {
                Authorization: `Bearer ${ctx.token}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              newAmountTodos = res.body.data.length
              expect(newAmountTodos).to.eq(amountTodos - 1)
            })
          })
        })
    })
  )

  // Negative tests

  qase(
    103,
    it("should not delete a todo with invalid id", () => {
      // Delete todo with invalid id
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/todo/${invalidId}`,
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404)
        expect(res.body.error).to.eq(`Todo with id ${invalidId} not found`)
      })
    })
  )

  qase(
    104,
    it("should not delete a todo with invalid token", () => {
      // Delete todo with invalid id
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/todo/${invalidId}`,
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
