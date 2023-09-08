/// <reference types="cypress" />

import React from "react"
import Todolist from "./TodoList"

describe("Todolist.tsx", () => {
  beforeEach(() => {
    cy.mount(<Todolist />)
  })

  it("should display a form with an input", () => {
    cy.get("[data-test=todos-form]").within(() => {
      cy.get("[data-test=todos-input]").should("be.visible")
    })
  })
})
