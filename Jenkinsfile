pipeline{
	agent any
	tools {nodejs "node"}
	stages {
		stage('Build') {
			steps {
				git branch: 'main', credentialsId: 'jenkins-token', url: 'https://github.com/navid-ansari/shopme-ts.git'
				sh 'npm install'
			}
		}
	}
}