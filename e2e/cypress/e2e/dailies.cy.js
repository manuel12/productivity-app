/// <reference types="cypress" />

describe("To Dos tests", () => {
  beforeEach(() => {
    cy.visit("/dailies")
  })

  it("should have a 'Dailies' heading", () => {
    cy.get("[data-test=dailies-heading]")
      .should("have.class", "display-1")
      .and("have.text", "Dailies")
  })

  it("should display a form with an input", () => {
    cy.get("[data-test=dailies-form]").within(() => {
      cy.get("[data-test=dailies-input]").should("be.visible")
    })
  })

  it("should display placeholder 'Add a new daily' on input", () => {
    cy.get("[data-test=dailies-input]")
      .should("be.visible")
      .and("have.attr", "placeholder", "Add a new daily...")
  })

  it("should add a new daily by writing on the input and pressing ENTER", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")

    cy.get("[data-test=dailies-item]").should("be.visible")
  })

  it("should display new daily below the input form", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-item]").should("be.visible")
  })

  it("should display correct text on daily", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-item]")
      .should("be.visible")
      .and("contain.text", "Clean room")
  })

  it("should display checkmark and remove buttons on daily", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-item]")
      .should("be.visible")
      .within(($el) => {
        cy.get("[data-test=dailies-check-icon-container]")
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

  it("should change checkmark color on daily when clicked", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-test=dailies-check-icon-container]")
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
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-test=dailies-text-container]")
          .should("be.visible")
          .and("have.class", "text-not-completed")
        cy.get(".fa-circle-check").click()

        cy.get("[data-test=dailies-text-container]")
          .should("be.visible")
          .and("have.class", "text-completed")
      })
  })

  it("should remove daily when remove button on daily is clicked", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-item]")
      .should("be.visible")
      .within(() => {
        cy.get(".fa-xmark").should("be.visible")

        cy.get(".fa-xmark").click()
      })

    cy.get("[data-test=dailies-item]").should("not.exist")
  })

  it("should add 2 dailies", () => {
    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-input]").type("Make lunch{enter}")

    cy.get("ul > :nth-child(1)")
      .should("be.visible")
      .and("contain.text", "Clean room")

    cy.get("ul > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Make lunch")
  })

  it("should add 10 dailies", () => {
    let dailyStr = "Clean room"
    for (let i = 0; i < 10; i++) {
      cy.get("[data-test=dailies-input]").type(`${dailyStr} ${i + 1} {enter}`)
    }
    cy.get("[data-test=dailies-item]")
      .should("have.length", 10)
      .each(($el, i) => {
        cy.get($el).should("contain.text", `Clean room ${i + 1}`)
      })
  })

  it("should have completed dailies set to uncompleted on next days", () => {
    const dateToCreateDailiesStr = "2023-09-01T12:00:00Z"
    const dateToCreateDailies = new Date(dateToCreateDailiesStr)
    cy.window().then((win) => {
      win.Date = class extends Date {
        constructor() {
          super(dateToCreateDailies)
        }
      }
    })

    cy.get("[data-test=dailies-input]").type("Clean room{enter}")
    cy.get("[data-test=dailies-input]").type("Make lunch{enter}")

    cy.get("[data-test=dailies-item]").each(($el) => {
      cy.get($el)
        .should("be.visible")
        .within(() => {
          cy.get(".fa-circle-check").click()
          cy.get(".fa-circle-check")
            .should("be.visible")
            .and("have.class", "check-completed")
        })
    })

    const dateToTestDailiesStr = "2023-09-15T12:00:00Z"
    const dateToTestDailies = new Date(dateToTestDailiesStr)
    cy.window().then((win) => {
      win.Date = class extends Date {
        constructor() {
          super(dateToTestDailies)
        }
      }
    })

    cy.reload()

    cy.get("[data-test=dailies-item]").each(($el) => {
      cy.get($el)
        .should("be.visible")
        .within(() => {
          cy.get(".fa-circle-check")
            .should("be.visible")
            .and("have.class", "check-not-completed")
        })
    })
  })

  it("should NOT add a daily with empty text when pressing enter", () => {
    cy.get("[data-test=dailies-input]").type("{enter}")

    cy.get("[data-test=dailies-item]").should("not.exist")
  })

  it("should NOT add a daily with a text more than 40 characters long when pressing enter", () => {
    const expectedLength = 40

    let longDailyStr = "A"
    for (let i = 0; i <= 50; i++) {
      longDailyStr += "A"
    }
    cy.get("[data-test=dailies-input]").type(`${longDailyStr} {enter}`)
    cy.get("[data-test=dailies-item]")
      .should("be.visible")
      .within(() => {
        cy.get("[data-test=dailies-text-container]")
          .should("be.visible")
          .invoke("text")
          .should("have.length", expectedLength)
      })
  })
})
