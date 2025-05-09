const { defineConfig } = require("cypress")
const {
  addMatchImageSnapshotPlugin,
} = require("@simonsmith/cypress-image-snapshot/plugin")
const addAccessibilityTasks = require("wick-a11y/accessibility-tasks")

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Productivity App - Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      //   implement node event listeners here
      addMatchImageSnapshotPlugin(on)
      require("cypress-mochawesome-reporter/plugin")(on)
      addAccessibilityTasks(on)

      config.env.NODE_ENV = "somethingElse" // This sets NODE_ENV to 'test' for your backend
      return config
    },
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern:
      "cypress/tests/functional/daily/**/*.cy.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
    screenshotOnRunFailure: false,
    screenshotsFolder: false,
  },

  component: {
    viewportHeight: 1200,
    viewportWidth: 1600,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
})
