pipeline{
    agent any
    environment {
        CI = 'false'
    }
    tools {nodejs "node"}
    stages {
        stage('pull dependencies') {
            steps {
                git branch: 'main', url: 'https://github.com/navid-ansari/shopme-ts.git'
                bat 'npm install'
            }
        }
        stage('run test cases') {
            steps {
                bat 'npm test'
            }
        }
        /*stage('check file formatting') {
            steps {
                bat 'npm run format:check'
            }
        }*/
        stage('check code linting') {
            steps {
                bat 'npm run lint:check'
            }
        }
        stage('generate prod build') {
            steps {
                bat 'npm run build -- --profile'
            }
        }
    }
}