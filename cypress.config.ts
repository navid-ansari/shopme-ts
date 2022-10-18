import { defineConfig } from 'cypress'

export default defineConfig({
  watchForFileChanges: true, // hot reload
  //screenshotOnRunFailure: true, // screenshot
  video: false, // video
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: process.env.CI ? ['cypress/e2e/play.cy.ts'] : [] // exclude play.cy.ts in CI
  }
})
