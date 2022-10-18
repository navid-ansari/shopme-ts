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
        /*stage('Format') {
            steps {
                bat 'npm run format:check'
            }
        }*/
        stage('Check lint errors') {
            steps {
                bat 'npm run lint:check'
            }
        }
        stage('Run unit and integration test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Create production build') {
            steps {
                bat 'npm run build -- --profile'
            }
        }
        stage('Start server') {
            steps {
                bat 'START /B npm start'
            }
        }
        stage('Run E2E test') {
            steps {
                bat 'npx cypress run'
            }
        }
    }
}