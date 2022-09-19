pipeline{
    agent any
    environment {
        CI = 'false'
    }
    tools {nodejs "node"}
    stages {
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/navid-ansari/shopme-ts.git'
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Format check') {
            steps {
                bat 'npm run format:check'
            }
        }
        stage('Lint check') {
            steps {
                bat 'npm run lint:check'
            }
        }
    }
}