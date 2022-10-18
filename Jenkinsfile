pipeline{
    agent any
    environment {
        CI = 'false'
    }
    tools {nodejs "node"}
    stages {
        stage('Dependencies') {
            steps {
                git branch: 'main', url: 'https://github.com/navid-ansari/shopme-ts.git'
                bat 'npm install'
            }
        }
        /*stage('Format') {
            steps {
                bat 'npm run format:check'
            }
        }*/
        stage('Lint') {
            steps {
                bat 'npm run lint:check'
            }
        }
        stage('Unit Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build -- --profile'
            }
        }
        stage('Start') {
            steps {
                bat 'START /B npm start'
            }
        }
        stage('E2E Test') {
            steps {
                bat 'npx cypress run'
            }
        }
    }
}