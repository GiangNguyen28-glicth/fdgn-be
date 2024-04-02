import groovy.json.JsonSlurper

// @NonCPS
// def jsonParse(def json) {
//     new groovy.json.JsonSlurperClassic().parseText(json)
// }
// packages = []

pipeline {
    environment { 
        registryCredential = 'docker-hub-2' 
        dockerImage = '' 
    }
    agent any
    
    stages {
        stage('Cloning our Git') {
            steps {
                sh 'git config --global user.email "giangnguyen3246@gmail.com"'
                sh 'git config --global user.name "GiangNguyen28-glicth"'
                git credentialsId: 'github', url: 'https://github.com/GiangNguyen28-glicth/fdgn-be.git'
            }
        }
        
        stage('Build and Publish') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-hub-2', url: 'https://index.docker.io/v1/') {
                        withCredentials([usernamePassword(credentialsId: 'github', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                            // echo 'git password ${GIT_PASSWORD}'
                            // sh 'git config --global user.password "${GIT_PASSWORD}"'
                            sh 'yarn lerna publish prerelease --preid=beta --ignore-scripts --exact --yes'
                        }
        
                        // sh 'yarn install'
                        // sh 'yarn build'
                        def rawStdout = sh (
                                script: 'yarn lerna list --json',
                                returnStdout: true
                            ).trim()
                        def jsonStartIndex = rawStdout.indexOf('[')
                        def jsonEndIndex = rawStdout.lastIndexOf(']') + 1
                        def packagesString = rawStdout.substring(jsonStartIndex, jsonEndIndex)
                        def jsonSlurper = new groovy.json.JsonSlurperClassic()
                        packages = jsonSlurper.parseText(packagesString)
                        echo "Done Build and Publish"
                    }

                    
                }
                
            }
        }
        
        stage('Build images') {
            steps {
                script {
                    // echo "Over here"
                    echo "Changed services ${packages}"
                    docker.withRegistry( '', registryCredential ) {
                        packages.each { p ->
                            def name = p.name.replace('@', '').replace('/', '-')
                            def imageName = "giangnguyen3246/${name}:${p.version}"
                            def dockerImage = docker.build(imageName,"--build-arg SERVICE_PACKAGE_NAME=${p.name} --build-arg SERVICE_PACKAGE_VERSION=${p.version} .")
                            dockerImage.push()
                            echo "Pushed Docker Image ${imageName} Successfully"
                        } 
                        dockerImage.push() 
                    }
                    
                }
            }
        }
    }
}
