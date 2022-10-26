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
                bat 'npm install'
            }
        }
        stage('Format') {
            steps {
                bat 'npm run format:check'
            }
        }
        stage('Lint Errors') {
            steps {
                bat 'npm run lint:check'
            }
        }
        stage('Unit & Integration Test') {
            steps {
                bat encoding: 'UTF-8', script: 'npm test'
            }
        }
        stage('Production Build') {
            steps {
                bat 'npm run build -- --profile'
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