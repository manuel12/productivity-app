/// <reference types="cypress" />

describe("Responsiveness Section - Todo Page", () => {
  context("-600px resolution ", () => {
    beforeEach(() => {
      cy.viewport(500, 900)
      cy.visit("/")
    })

    it("should be displayed correctly on -600px of width", () => {
      cy.get(".App").should("be.visible").matchImageSnapshot()
    })
  })

  context(">600px resolution ", () => {
    beforeEach(() => {
      cy.viewport(700, 900)
      cy.visit("/")
    })

    it("should be displayed correctly on >600px of width", () => {
      cy.get(".App").should("be.visible").matchImageSnapshot()
    })
  })

  context(">768px resolution ", () => {
    beforeEach(() => {
      cy.viewport(800, 900)
      cy.visit("/")
    })

    it("should be displayed correctly on >768px of width", () => {
      cy.get(".App").should("be.visible").matchImageSnapshot()
    })
  })

  context(">992px resolution ", () => {
    beforeEach(() => {
      cy.viewport(1000, 900)
      cy.visit("/")
    })

    it("should be displayed correctly on >992px of width", () => {
      cy.get(".App").should("be.visible").matchImageSnapshot()
    })
  })

  context(">1200px resolution ", () => {
    beforeEach(() => {
      cy.viewport(1300, 900)
      cy.visit("/")
    })

    it("should be displayed correctly on 1200px of width", () => {
      cy.get(".App").should("be.visible").matchImageSnapshot()
    })
  })
})
