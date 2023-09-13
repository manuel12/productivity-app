/// <reference types="cypress" />

describe("Weekly Learnings tests", () => {
  beforeEach(() => {
    cy.visit("/weekly-learnings")
  })

  it("should display a 'Weekly Learnings' heading", () => {
    cy.get("[data-cy=learnings-heading]")
      .should("have.class", "display-1")
      .and("have.text", "Weekly Learnings")
  })

  it("should display a form with an input and submit button", () => {
    cy.get("[data-cy=learnings-form]").within(() => {
      cy.get("[data-cy=learnings-input]").should("be.visible")
      cy.get("[data-cy=learnings-submit]").should("be.visible")
    })
  })

  it("should have an empty 'Learnings' chart", () => {
    cy.get("canvas").should("be.visible")
    //.matchImageSnapshot()
  })

  it("should add a learning by writing on the form and submitting it ", () => {
    cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
    cy.get("[data-cy=learnings-submit]").click()
    cy.get("canvas")
    //.matchImageSnapshot()
  })

  it("should add a repeated learning and make sure it's value increases", () => {
    cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
    cy.get("[data-cy=learnings-submit]").click()
    cy.get("canvas")
    //.matchImageSnapshot()
  })

  it("should add a repeated learning 10 times and make sure value increases", () => {
    let i = 0
    while (i < 10) {
      cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
      cy.get("[data-cy=learnings-submit]").click()
      i++
    }
    cy.get("canvas")
    //.matchImageSnapshot()
  })

  it("should add long(50 characters or more) learning", () => {
    let longLearning = ""
    for (let i = 0; i < 50; i++) {
      longLearning += "a"
    }
    cy.get("[data-cy=learnings-input]").type(longLearning)
    cy.get("[data-cy=learnings-submit]").click()
    cy.get("canvas")
    //.matchImageSnapshot()
  })

  // HERE!!!
  it("should clear input field after adding learning", () => {
    cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
    cy.get("[data-cy=learnings-submit]").click()
    cy.get("[data-cy=learnings-input]").should("have.value", "")
  })

  it("should add 2 learnings", () => {
    cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
    cy.get("[data-cy=learnings-submit]").click()

    cy.get("[data-cy=learnings-input]").type("Wake up early")
    cy.get("[data-cy=learnings-submit]").click()
    cy.get("canvas")
    //.matchImageSnapshot()
  })

  it("should add 2 learnings, one of them a long learning", () => {
    let longLearning = ""
    for (let i = 0; i < 50; i++) {
      longLearning += "a"
    }

    cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
    cy.get("[data-cy=learnings-submit]").click()

    cy.get("[data-cy=learnings-input]").type(longLearning)
    cy.get("[data-cy=learnings-submit]").click()
  })

  it("should add a learning by pressing ENTER", () => {
    cy.get("[data-cy=learnings-input]").type("Do yoga everyday{enter}")
  })

  it("should NOT be able to add a learning leaving text empty", () => {
    cy.get("[data-cy=learnings-submit]").click()
    cy.get("canvas")
    //.matchImageSnapshot()
  })

  it("should display learning after page is reloaded", () => {
    cy.get("[data-cy=learnings-input]").type("Do yoga everyday")
    cy.get("[data-cy=learnings-submit]").click()

    cy.reload()
    cy.get("canvas")
    //.matchImageSnapshot()
  })
})
