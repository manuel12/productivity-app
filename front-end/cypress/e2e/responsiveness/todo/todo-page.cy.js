/// <reference types="cypress" />

describe("Responsiveness Section - Todo Page", () => {
  const resolutions = [
    {
      breakpoint: "<600px",
      viewportWidthToUse: 414,
    },
    {
      breakpoint: ">600px",
      viewportWidthToUse: 601,
    },
    {
      breakpoint: ">768px",
      viewportWidthToUse: 770,
    },
    {
      breakpoint: ">992px",
      viewportWidthToUse: 1000,
    },
    {
      breakpoint: ">1200px",
      viewportWidthToUse: 1300,
    },
  ]

  const isMobile = (resolution) => resolution.viewportWidthToUse < 992

  resolutions.forEach((resolution) => {
    context(`${resolution.breakpoint} resolution `, () => {
      before(() => {
        cy.viewport(resolution.viewportWidthToUse, 900)
        cy.visit("/")
      })

      it(`should be displayed correctly on ${resolution.breakpoint} of width`, () => {
        cy.getBySel("app-navbar")
          .should("be.visible")
          .matchImageSnapshot(`Navbar at ${resolution.viewportWidthToUse}`)

        if (isMobile(resolution)) {
          // Open the navbar and take snapshot of the menu
          cy.get(".navbar-toggler").click()
          cy.getBySel("app-navbar")
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
