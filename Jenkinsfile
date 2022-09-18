pipeline{
    agent any
    tools {nodejs "node"}
    stages {
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/navid-ansari/shopme-ts.git'
                bat 'npm install'
            }
        },
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
}