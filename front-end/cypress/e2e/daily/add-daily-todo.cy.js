/// <reference types="cypress" />

describe("Daily Section - Add Daily Todo", () => {
  const testDailyOne = "Feed the cats (test)"
  const testDailyTwo = "Take out trash (test)"
  const testDailyThree = "Clean room (test)"
  const todoTextLongerThan40Char =
    "(test) This is a daily with more than 40 characters, which should not be allowed"
  const todoTextWith40Char = todoTextLongerThan40Char.slice(0, 40)

  beforeEach(() => {
    cy.visit("/dailies")
  })

  // Positive tests

  it("should add a daily by writing on input and clicking the 'Add daily' button", () => {
    cy.getBySel("dailies-input").type(testDailyOne)
    cy.get('[data-cy="dailies-submit"]').click()

    cy.getBySel("dailies-item").should("be.visible")
  })

  it("should add a daily by writing on input and pressing enter key", () => {
    cy.getBySel("dailies-input").type(testDailyTwo + "{enter}")

    cy.getBySel("dailies-list").should("have.length", 1)
    cy.getBySel("dailies-list").first().should("contain.text", testDailyTwo)

    cy.getBySel("dailies-input").type(testDailyThree + "{ENTER}")

    cy.getBySel("dailies-item").should("be.visible")
  })

  it("should display the daily correctly on the list", () => {
    cy.getBySel("dailies-input").type(testDailyOne)
    cy.getBySel("dailies-submit").click()

    cy.getBySel("dailies-item").should("be.visible")
  })

  it("should persist added dailies after page reload", () => {
    cy.getBySel("dailies-input").type(testDailyOne + "{enter}")

    cy.getBySel("dailies-list").should("have.length", 1)
    cy.getBySel("dailies-list").first().should("contain.text", testDailyOne)

    cy.reload()
    cy.getBySel("dailies-list").should("have.length", 1)
    cy.getBySel("dailies-list").first().should("contain.text", testDailyOne)
  })

  // Negative tests

  it("should not add dailies with more than 40 characters", () => {
    cy.getBySel("dailies-input").type(todoTextLongerThan40Char + "{enter}")

    cy.getBySel("dailies-input").should("have.value", "")
    cy.getBySel("dailies-item")
      // Filter only through the todo items that contain the '(test)' substring
      .filter(":contains('test')")
      .should("have.length", 1)

      // Verify todo added only has 40 characters
      .and("contain.text", todoTextWith40Char)
  })

  it("should not add dailies when leaving the input empty", () => {
    cy.get('[data-cy="dailies-submit"]').click()
    cy.getBySel("dailies-item").should("not.exist")

    cy.getBySel("dailies-input").type("{enter}")
    cy.getBySel("dailies-item").should("not.exist")
  })

  // afterEach(() => {
  //   cy.deleteTestDailies()
  // })
})
