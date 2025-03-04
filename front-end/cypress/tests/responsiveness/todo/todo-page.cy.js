/// <reference types="cypress" />

const resolutions = require("../../../fixtures/resolutions.json")

describe("Responsiveness Section - Todo Page", () => {
  const isMobile = (resolution) => resolution.viewportWidthToUse < 992

  resolutions.forEach((resolution) => {
    context(`${resolution.breakpoint} resolution `, () => {
      before(() => {
        cy.viewport(resolution.viewportWidthToUse, 900)

        cy.visit("/")
        cy.registerWithAPI()
        cy.login()
      })

      it(`should be displayed correctly on ${resolution.breakpoint} of width`, () => {
        cy.getBySel("navbar")
          .should("be.visible")
          .matchImageSnapshot(`Navbar at ${resolution.viewportWidthToUse}`)

        if (isMobile(resolution)) {
          // Open the navbar and take snapshot of the menu
          cy.getBySel("navbar-toggler").click()
          cy.getBySel("navbar")
            .should("be.visible")
            .matchImageSnapshot(
              `Navbar (opened) at ${resolution.viewportWidthToUse}`
            )
        }

        cy.getBySel("todo-page-container")
          .should("be.visible")
          .matchImageSnapshot(`Container at ${resolution.viewportWidthToUse}`)
      })
    })
  })
})
