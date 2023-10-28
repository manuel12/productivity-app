/// <reference types="cypress" />

describe("Daily Section - Add Daily Todo", () => {
  const testTodoOne = "Feed the cats (test)"
  const testTodoTwo = "Take out trash (test)"
  const testTodoThree = "Clean room (test)"
  const todoTextLongerThan40Char =
    "(test) This is a todo item with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)

  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("Verify a daily todo can be added by writing on input and clicking the Add Todo button", () => {
    cy.getBySel("dailies-input").type(testTodoOne)
    cy.get('[data-cy="dailies-submit"]').click()

    cy.getBySel("dailies-item").should("be.visible")
  })

  it("Verify a daily todo can be added by writing on input and pressing enter key", () => {
    cy.getBySel("dailies-input").type(testTodoTwo + "{enter}")

    cy.getBySel("dailies-list").should("have.length", 1)
    cy.getBySel("dailies-list").first().should("contain.text", testTodoTwo)

    cy.getBySel("dailies-input").type(testTodoThree + "{ENTER}")

    cy.getBySel("dailies-item").should("be.visible")
  })

  it("Verify the daily todo appears correctly on the list", () => {
    cy.getBySel("dailies-input").type(testTodoOne)
    cy.getBySel("dailies-submit").click()

    cy.getBySel("dailies-item").should("be.visible")
  })

  it("Verify daily todos cannot be added with more than 40 characters", () => {
    cy.getBySel("dailies-input").type(todoTextLongerThan40Char + "{enter}")

    cy.getBySel("dailies-input").should("have.value", "")
    cy.getBySel("dailies-item")
      // Filter only through the todo items that contain the '(test)' substring
      .filter(":contains('test')")
      .should("have.length", 1)

      // Verify todo added only has 40 characters
      .and("contain.text", todoTextWith40Char)
  })

  it("Verify daily todos cannot be added with when leaving the input empty", () => {
    cy.get('[data-cy="dailies-submit"]').click()
    cy.getBySel("dailies-item").should("not.exist")

    cy.getBySel("dailies-input").type("{enter}")
    cy.getBySel("dailies-item").should("not.exist")
  })

  afterEach(() => {
    // Call an API function that
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/api/todos/delete-test-todos/",
    })
  })
})
