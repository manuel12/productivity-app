/// <reference types="cypress" />

const resolutions = require("../../../fixtures/resolutions.json")

describe("Responsiveness Section - RegisterPage", () => {
  resolutions.forEach((resolution) => {
    context(`${resolution.breakpoint} resolution `, () => {
      before(() => {
        cy.viewport(resolution.viewportWidthToUse, 900)
        cy.visit("/")
        cy.getBySel("register-button").click()
      })

      it(`should be displayed correctly on ${resolution.breakpoint} of width`, () => {
        cy.getBySel("register-page")
          .should("be.visible")
          .matchImageSnapshot(
            `RegisterPage at ${resolution.viewportWidthToUse}`
          )
      })
    })
  })
})
