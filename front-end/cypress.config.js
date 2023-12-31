const { defineConfig } = require("cypress")
const {
  addMatchImageSnapshotPlugin,
} = require("@simonsmith/cypress-image-snapshot/plugin")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      addMatchImageSnapshotPlugin(on)
    },
    baseUrl: "http://localhost:3000/",
    //specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    specPattern: "cypress/e2e/smoke/todo/smoke.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "cypress/e2e/1-getting-started/",
      "cypress/e2e/2-advanced-examples",
      "cypress/e2e/**.cy.js",
      "cypress/e2e/functional/daily/**.cy.js",
    ],
    experimentalRunAllSpecs: true,
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
