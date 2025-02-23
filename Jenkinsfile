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
                    sh 'npm run build'
                }
            }
        }

        stage('Publish to GitHub Packages') {
            steps {
                script {
                    sh 'npm config set registry https://npm.pkg.github.com/'
                    sh "npm config set //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}"
                    sh 'npm publish --access public'
                }
            }
        }
    }
}

