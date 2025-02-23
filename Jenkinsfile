@Library('prepare-env@main') _

pipeline {
    agent any 

    tools {
        nodejs 'NodeJS'
    }

    environment {
        GITHUB_TOKEN = credentials('publishPackage')
        GITHUB_USER = 'shirtzo'
        GITHUB_REPO = 'TaseExam'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Get Envs') {
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
                            npm config set @shirtzo:registry https://npm.pkg.github.com/:_authToken=$GITHUB_TOKEN
                            npm publish --access public
                        '''
                    }
                }
            }
        }
    }
}

