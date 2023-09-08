/// <reference types="cypress" />

import React from "react"
import Todolist from "../../src/components/TodoList/TodoList"

describe("Todolist.tsx tests", () => {
  beforeEach(() => {
    cy.mount(<Todolist />)
  })

  it("should display a form with an input", () => {
    cy.get("[data-test=todos-form]").within(() => {
      cy.get("[data-test=todos-input]").should("be.visible")
    })
  })

  it("should display placeholder 'Add a new todo' on input", () => {
    cy.get("[data-test=todos-input]")
      .should("be.visible")
      .and("have.attr", "placeholder", "Add a new todo...")
  })

  it("should add a new todo by writing on the input and pressing ENTER", () => {
    cy.get("[data-test=todos-input]").type("Clean room{enter}")

    cy.get("[data-test=todos-item]").should("be.visible")
  })

  it("should display new todo below the input form", () => {
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-item]").should("be.visible")
  })

  it("should display correct text on todo", () => {
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-item]")
      .should("be.visible")
      .and("contain.text", "Clean room")
  })

  it("should display checkmark and remove buttons on todo", () => {
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-item]")
      .should("be.visible")
      .within(($el) => {
        cy.get("[data-test=todos-check-icon-container]")
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
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-test=todos-check-icon-container]")
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
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-test=todos-text-container]")
          .should("be.visible")
          .and("have.class", "text-not-completed")
        cy.get(".fa-circle-check").click()

        cy.get("[data-test=todos-text-container]")
          .should("be.visible")
          .and("have.class", "text-completed")
      })
  })

  it("should remove todo when remove button on todo is clicked", () => {
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get(".fa-xmark").should("be.visible")

        cy.get(".fa-xmark").click()
      })

    cy.get("[data-test=todos-item]").should("not.exist")
  })

  it("should add 2 todos", () => {
    cy.get("[data-test=todos-input]").type("Clean room{enter}")
    cy.get("[data-test=todos-input]").type("Make lunch{enter}")

    cy.get("[data-test=todos-list] > :nth-child(1)")
      .should("be.visible")
      .and("contain.text", "Clean room")

    cy.get("[data-test=todos-list] > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Make lunch")
  })

  it("should add 10 todos", () => {
    let todoStr = "Clean room"
    for (let i = 0; i < 10; i++) {
      cy.log(i)
      cy.get("[data-test=todos-input]").type(`${todoStr} ${i + 1} {enter}`)
    }
    cy.get("[data-test=todos-item]")
      .should("have.length", 10)
      .each(($el, i) => {
        cy.get($el).should("contain.text", `Clean room ${i + 1}`)
      })
  })

  it("should NOT add a todo with empty text when pressing ENTER", () => {
    cy.get("[data-test=todos-input]").type("{enter}")

    cy.get("[data-test=todos-item]").should("not.exist")
  })

  it("should NOT add a todo with a text more than 40 characters long when pressing ENTER", () => {
    const expectedLength = 40

    let longTodoStr = "A"
    for (let i = 0; i <= 50; i++) {
      longTodoStr += "A"
    }
    cy.get("[data-test=todos-input]").type(`${longTodoStr} {enter}`)
    cy.get("[data-test=todos-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-test=todos-text-container]")
          .should("be.visible")
          .invoke("text")
          .should("have.length", expectedLength)
      })
  })
})
