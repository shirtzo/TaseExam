@Library('prepare-env@main') _

pipeline {
    agent any 

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/shirtzo/TaseExam.git']],
                    extensions: [[$class: 'CloneOption', depth: 0, noTags: false]]
                ])
            }
        } 

        stage('Get Envs Variables') {
            steps {
                script {
                    def envParameters = prepareEnv()
                    echo "Code Commiter: ${envParameters.committerName}, Code Commiter Email: ${envParameters.committerEmail}, 
                    Commit Hash: ${envParameters.gitCommitHash}, Git URL: ${envParameters.gitUrl}, Git Branch: ${envParameters.gitBranch}"
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
                            npm publish --access public --@shirtzo:registry=https://npm.pkg.github.com --//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
                        '''
                    }
                }
            }
        }
    }
}

