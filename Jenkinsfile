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
        stage('Test') {
            steps {
                bat 'npm test'
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
        stage('Build') {
            steps {
                bat 'npm run build -- --profile'
            }
        }
    }
}