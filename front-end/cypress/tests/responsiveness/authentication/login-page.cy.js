/// <reference types="cypress" />

const resolutions = require("../../../fixtures/resolutions/resolutions.json")

describe("Responsiveness Section - LoginPage", () => {
  resolutions.forEach((resolution) => {
    context(`${resolution.breakpoint} resolution `, () => {
      before(() => {
        cy.viewport(resolution.viewportWidthToUse, 900)
        cy.visit("/")
      })

      it.only(`should be displayed correctly on ${resolution.breakpoint} of width`, () => {
        cy.log(resolution.viewportWidthToUse)
        cy.getBySel("login-page")
          .should("be.visible")
          .matchImageSnapshot(`LoginPage at ${resolution.viewportWidthToUse}`)
      })
    })
  })
})
