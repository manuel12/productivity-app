/// <reference types="cypress" />

describe("To Dos tests", () => {
  beforeEach(() => {
    cy.visit("/")
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

    cy.get(".list-group-item").should("be.visible")
  })

  it("should display new todo below the input form", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get(".list-group-item").should("be.visible")
  })

  it("should display correct text on todo", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get(".list-group-item")
      .should("be.visible")
      .and("contain.text", "Clean room")
  })

  it("should display checkmark and remove buttons on todo", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get(".list-group-item")
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
    cy.get(".list-group-item")
      .should("be.visible")
      .within(() => {
        cy.get(".check-icon-container")
          .should("be.visible")
          .within(() => {
            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-not-completed")
            cy.get(".fa-circle-check").click()

            cy.get(".fa-circle-check")
              .should("be.visible")
              .and("have.class", "check-completed")
          })
      })
  })

  it("should display a strike-through on text when checkmark is clicked", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get(".list-group-item")
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
    cy.get(".list-group-item")
      .should("be.visible")
      .within(() => {
        cy.get(".fa-xmark").should("be.visible")

        cy.get(".fa-xmark").click()
      })

    cy.get(".list-group-item").should("not.exist")
  })

  it("should add 2 todos", () => {
    cy.get("input").type("Clean room{enter}")
    cy.get("input").type("Make lunch{enter}")

    cy.get("ul > :nth-child(1)")
      .should("be.visible")
      .and("contain.text", "Clean room")

    cy.get("ul > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Make lunch")
  })

  it("should add 10 todos", () => {
    let todoStr = "Clean room"
    for (let i = 0; i < 10; i++) {
      cy.log(i)
      cy.get("input").type(`${todoStr} ${i + 1} {enter}`)
    }
    cy.get(".list-group-item")
      .should("have.length", 10)
      .each(($el, i) => {
        cy.get($el).should("contain.text", `Clean room ${i + 1}`)
      })
  })

  it("should NOT add a todo with empty text when pressing enter", () => {
    cy.get("input").type("{enter}")

    cy.get(".list-group-item").should("not.exist")
  })

  it("should NOT add a todo with a text more than 40 characters long when pressing enter", () => {
    const expectedLength = 40

    let longTodoStr = "A"
    for (let i = 0; i <= 50; i++) {
      longTodoStr += "A"
    }
    cy.get("input").type(`${longTodoStr} {enter}`)
    cy.get(".list-group-item")
      .should("be.visible")
      .within(() => {
        cy.get(".text-container")
          .should("be.visible")
          .invoke("text")
          .should("have.length", expectedLength)
      })
  })
})
