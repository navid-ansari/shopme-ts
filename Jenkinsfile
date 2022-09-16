pipeline{
	agent any
	tools {nodejs "node"}
	stages {
		stage('Build') {
			steps {
				git 'https://github.com/navid-ansari/shopme-ts.git'
				sh 'npm install'
			}
		}
	}
}