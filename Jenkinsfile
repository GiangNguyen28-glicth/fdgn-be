import groovy.json.JsonSlurper

@NonCPS
def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
}

pipeline {
    agent any
    
    stages {
        stage('Cloning our Git') {
            steps {
                echo "Changed services ggg"
                git 'https://github.com/GiangNguyen28-glicth/fdgn-be.git'
            }
        }
        
        stage('Build and Publish') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-hub-2', url: 'https://index.docker.io/v1/') {
                        // sh 'yarn install'
                        // sh 'yarn build'
                    
                    // Run 'yarn lerna list --json' and parse the output
                        def packagesString = sh (
                            script: 'yarn lerna list --json',
                            returnStdout: true
                        ).trim()
                        
                        echo "====packagesString services ${packagesString}===="
                        def packages = jsonParse(packagesString)
                        // changedPackages = packages
                        changedPackages = []
                        changedPackages = changedPackages.collect({ name -> packages.find({ p -> p.name == name }) })
                        
                        echo "Changed services ${changedPackages}"
                    }
                }
                
            }
        }
        
        stage('Build images') {
            steps {
                script {
                    echo "Hello world"
                    // You can add docker commands here to build images
                }
            }
        }
    }
}
