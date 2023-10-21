/// <reference types="cypress" />

describe("CREATE Todo API tests", () => {
  const apiUrl = "http://localhost:4000"
  const testTodo = {
    completed: true,
    description: "Run a marathon (test)",
  }

  beforeEach(() => {})

  // POST  - /api/todos/:id createTodo
  it("POST - /api/todos/:id - should create a todo when requesting with valid data", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/todos`,
      body: testTodo,
    }).then((res) => {
      expect(res.body.message).to.eq(`Todo successfully created!`)
    })
  })
})
