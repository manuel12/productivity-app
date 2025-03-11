import cypress from "cypress"

module.exports = cypress.defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-qase-reporter",
    cypressQaseReporterReporterOptions: {
      debug: true,

      testops: {
        api: {
          token:
            "da3559105505c7a8df9e5aba2714e01d2de1c1895db18f7bc983bd3509a717e0",
        },

        project: "PA",
        uploadAttachments: true,

        run: {
          title: "Cypress test run",
          description: "Functional test run",
          complete: true,
        },
        useV2: true,
      },

      framework: {
        cypress: {
          screenshotsFolder: "cypress/screenshots",
        },
      },
    },
  },
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-qase-reporter/plugin")(on, config)
      require("cypress-qase-reporter/metadata")(on)
    },
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/tests/qase/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
})
