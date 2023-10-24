/// <reference types="cypress" />

describe("READ Todo - (GET) /api/todos/", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }
  const invalidId = 999999999
  const ctx = {}

  before(() => {
    // Create 1 todo
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      ctx.todoId = res.body.id
    })
  })

  // GET  - /api/todos/ getTodos
  it("should retrieve all existing todos", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todos successfully retrieved!`)
      expect(res.body.data.length).to.be.above(0)
      return expect(Array.isArray(res.body.data)).to.be.true
    })
  })

  it("should have completed and description properties on todos", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/`,
      body: testTodo,
    }).then((res) => {
      const todos = res.body.data
      todos.forEach((todo) => {
        expect(todo).to.have.ownProperty("completed")
        expect(todo).to.have.ownProperty("description")
      })
    })
  })

  // GET  - /api/todos/:id getTodo
  it("should retrieve a specific todo when requesting with valid id", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/${ctx.todoId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully retrieved!`)
    })
  })

  it("should NOT retrieve a todo when reque.onlysting with invalid id", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/api/todos/${invalidId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo with id ${invalidId} not found.`)
    })
  })

  // afterEach(() => {
  //   // Delete created test todos
  //   cy.request({
  //     method: "DELETE",
  //     url: "http://localhost:4000/api/todos/delete-test-todos/",
  //   })
  // })
})
