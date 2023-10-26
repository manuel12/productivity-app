/// <reference types="cypress" />

describe("DELETE Todo - (DELETE) /api/todos/:id", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }
  const invalidId = 999999999
  const ctx = {}

  beforeEach(() => {
    // Create todo to delete and get it's ID
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      ctx.todoId = res.body.id
      console.log(ctx.todoId)
    })
  })

  // DELETE  - /api/todos/:id updateTodo
  it("Verify a specific todo can be deleted when requesting with valid id", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      failOnStatusCode: false,
    }).then((res) => {
      console.log(res)
      expect(res.body.message).to.eq(`Todo successfully deleted!`)
    })
  })

  it("Verify the id returned is the id from the deleted todo", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
    }).then((res) => {
      expect(res.body).to.have.ownProperty("id")
      expect(res.body.id).to.be.a("number")
    })
  })

  it("Verify deleting a todo subtracts -1 to the current amount of todos", () => {
    // Check current amount of todos
    let amountTodos
    let newAmountTodos

    cy.request("http://localhost:4000/api/todos/")
      .then((res) => {
        amountTodos = res.body.data.length
      })
      .then(() => {
        // Delete todo
        cy.request({
          method: "DELETE",
          url: `${apiUrl}/api/todos/${ctx.todoId}`,
        }).then(() => {
          // Check new amount of todos is now -1
          cy.request("http://localhost:4000/api/todos/").then((res) => {
            newAmountTodos = res.body.data.length
            expect(newAmountTodos).to.eq(amountTodos - 1)
          })
        })
      })
  })

  it("Verify a todo is not deleted with invalid id", () => {
    // Delete todo with invalid id
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/todos/${invalidId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq("Todo not found")
    })
  })

  afterEach(() => {
    // Delete created test todos
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
