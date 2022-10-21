import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

const env = dotenv.config().parsed as any

console.log(env)
export default defineConfig({
  watchForFileChanges: true, // hot reload
  //screenshotOnRunFailure: true, // screenshot
  video: false, // video
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' ? [] : ['cypress/e2e/play.cy.ts']
  }
})
