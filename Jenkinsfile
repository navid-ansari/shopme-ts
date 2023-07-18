pipeline{
  agent any
  environment {
    CI = 'false'
  }
  tools {nodejs "node"}
  stages {
    stage('Install dependencies') {
      steps {
        git branch: 'main', url: 'https://github.com/navid-ansari/shopme-ts.git'
        bat 'rm -r -force node_modules'
        bat 'npm install'
      }
    }
    stage('Check Format') {
      steps {
        bat encoding: 'UTF-8', script: 'npm run format:check'
      }
    }
    stage('Fix Format') {
      steps {
        bat encoding: 'UTF-8', script: 'npm run format:fix'
      }
    }
    stage('Lint Check') {
      steps {
        bat encoding: 'UTF-8', script: 'npm run lint:check'
      }
    }
    stage('Lint Fix') {
      steps {
       bat encoding: 'UTF-8', script: 'npm run lint:fix'
      }
    }
    stage('Unit & Integration Test') {
      steps {
        bat encoding: 'UTF-8', script: 'npm run test:prod'
      }
    }
    stage('Production Build') {
      steps {
        bat 'npm run start:prod -- --profile'
      }
    }
    stage('Start Server') {
      steps {
        bat 'START /B npm start'
      }
    }
    stage('E2E Test') {
      steps {
        bat encoding: 'UTF-8', script: 'npx cypress run --spec cypress/e2e/tests/*.cy.ts'
      }
    }
  }
}