@Library('prepare-env@main') _

pipeline {
    agent any 

    tools {
        nodejs 'NodeJS'
    }

    environment {
        GITHUB_TOKEN = credentials('publishPackage')
    }

    stages {
        stage('Get Envs Variables') {
            steps {
                script {
                    prepareEnv()
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build Package') {
            steps {
                script {
                    sh 'npm pack'
                }
            }
        }

        stage('Publish to GitHub Packages') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'publishPackage', variable: 'GITHUB_TOKEN')]) {
                        sh ''' 
                            npm publish --access public
                        '''
                    }
                }
            }
        }
    }
}

