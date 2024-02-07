/// <reference types="cypress" />

describe("CREATE Todo - (POST) /api/todos/:id", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }
  const invalidDataTestTodo = {
    completed: 6,
    description: ["Run a marathon"],
  }

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

  // Positive tests

  // POST  - /api/todos/:id createTodo
  it("should create a todo with valid data", () => {
    // Create todo
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: testTodo,
    }).then((res) => {
      // Check last todo is the correct one
      const lastTodo = res.body.data
      expect(lastTodo).to.be.a("object")
      expect(lastTodo.completed).to.eq(testTodo.completed)
      expect(lastTodo.description).to.eq(testTodo.description)
    })
  })

  it("should have correct success message on response ", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully created!`)
    })
  })

  it("should have properties of correct type", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully created!`)

      const newTodo = res.body.data
      expect(newTodo).to.have.ownProperty("completed")
      expect(newTodo.completed).to.be.a("boolean")

      expect(newTodo).to.have.ownProperty("description")
      expect(newTodo.description).to.be.a("string")
    })
  })

  it("should have last id on response", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: testTodo,
    }).then((res) => {
      expect(res.body).to.have.ownProperty("id")
      expect(res.body.id).to.be.a("number")
    })
  })

  it("should add +1 to the current number of todos", () => {
    // Check current amount of todos
    let amountTodos
    let newAmountTodos

    cy.request({
      method: "GET",
      url: "http://localhost:4000/api/todos/",
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        amountTodos = res.body.data.length
      })
      .then(() => {
        // Create todo
        cy.request({
          method: "POST",
          url: `${apiUrl}/api/todos`,
          headers: {
            Authorization: `Bearer ${ctx.token}`,
            "Content-Type": "application/json",
          },
          body: testTodo,
        }).then(() => {
          // Check new amount of todos is now +1
          cy.request({
            method: "GET",
            url: "http://localhost:4000/api/todos/",
            headers: {
              Authorization: `Bearer ${ctx.token}`,
              "Content-Type": "application/json",
            },
          }).then((res) => {
            newAmountTodos = res.body.data.length
            expect(newAmountTodos).to.eq(amountTodos + 1)
          })
        })
      })
  })

  // Negative tests

  it("should not create a todo with invalid data", () => {
    // Create todo
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: invalidDataTestTodo,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description specified."
      )
    })
  })

  it("should not allow a user to create todo with empty data", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
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
      method: "POST",
      url: `${apiUrl}/api/todos`,
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.error).to.eq(
        "No completed (boolean) specified, No description specified."
      )
    })
  })

  it("should not create a todo with invalid token", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      body: {},
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
