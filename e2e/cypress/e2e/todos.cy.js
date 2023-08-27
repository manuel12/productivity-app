/// <reference types="cypress" />

describe("To Dos tests", () => {
  beforeEach(() => {
    cy.visit("/todos")
  })

  it("should have a 'To Dos' heading", () => {
    cy.get("h1").should("have.class", "display-1").and("have.text", "To Dos")
  })

  it("should display a form with an input", () => {
    cy.get("form").within(() => {
      cy.get("input").should("be.visible")
    })
  })

  it("should display placeholder 'Add a new todo' on input", () => {
    cy.get("input")
      .should("be.visible")
      .and("have.attr", "placeholder", "Add a new todo...")
  })

  it("should add a new todo by writing on the input and pressing ENTER", () => {
    cy.get("input").type("Clean room{enter}")

    cy.get("li").should("be.visible")
  })

  it("should display new todo below the input form", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("li").should("be.visible")
  })

  it("should display correct text on todo", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("li").should("be.visible").and("contain.text", "Clean room")
  })

  it("should display checkmark and remove buttons on todo", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("li")
      .should("be.visible")
      .within(($el) => {
        cy.get(".check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check").should("be.visible")
          })
        cy.get(".remove-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-xmark").should("be.visible")
          })
      })
  })

  it("should change checkmark color on todo when clicked", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("li")
      .should("be.visible")
      .within(() => {
        cy.get(".check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "not-completed")
            cy.get(".fa-circle-check").click()

            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "completed")
          })
      })
  })

  it("should display a strike-through on text when checkmark is clicked", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("li")
      .should("be.visible")
      .within(() => {
        cy.get(".text-container")
          .should("be.visible")
          .and("have.class", "text-not-completed")
        cy.get(".fa-circle-check").click()

        cy.get(".text-container")
          .should("be.visible")
          .and("have.class", "text-completed")
      })
  })

  it("should remove todo when remove button on todo is clicked", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("li")
      .should("be.visible")
      .within(() => {
        cy.get(".fa-xmark").should("be.visible")

        cy.get(".fa-xmark").click()
      })

    cy.get("li").should("not.exist")
  })

  it.only("should add 2 todos", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("input").type("Make lunch{enter}")

    cy.get("ul > :nth-child(1)")
      .should("be.visible")
      .and("contain.text", "Clean room")

    cy.get("ul > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Make lunch")
  })

  it("", () => {})

  it("", () => {})
})
