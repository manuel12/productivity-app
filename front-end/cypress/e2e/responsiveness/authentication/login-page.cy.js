/// <reference types="cypress" />

const resolutions = require("../../../fixtures/resolutions.json")

describe("Responsiveness Section - LoginPage", () => {
  resolutions.forEach((resolution) => {
    context(`${resolution.breakpoint} resolution `, () => {
      before(() => {
        cy.viewport(resolution.viewportWidthToUse, 900)
        cy.visit("/")
      })

      it(`should be displayed correctly on ${resolution.breakpoint} of width`, () => {
        cy.getBySel("login-page")
          .should("be.visible")
          .matchImageSnapshot(`LoginPage at ${resolution.viewportWidthToUse}`)
      })
    })
  })
})
