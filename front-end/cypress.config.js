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
    specPattern: "cypress/e2e/todo/**/*.cy.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
})
