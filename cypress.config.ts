import { defineConfig } from 'cypress'
//import * as dotenv from 'dotenv'

//const env = dotenv.config().parsed as unknown as EnvVars
//const env = dotenv.config().parsed as any

//console.log(env)
export default defineConfig({
  watchForFileChanges: true, // hot reload
  //screenshotOnRunFailure: true, // screenshot
  video: false, // video
  e2e: {
    setupNodeEvents(on, config) {
      //config.excludeSpecPattern = ['cypress/e2e/tests/*.cy.ts']
      //config.ignoreTestFiles
      // implement node event listeners here
    },
    //excludeSpecPattern: ['cypress/e2e/tests']
  }
})
