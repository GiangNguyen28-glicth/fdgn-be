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
                        def rawStdout = sh (
                                script: 'yarn lerna list --json',
                                returnStdout: true
                            ).trim()
                        def jsonStartIndex = rawStdout.indexOf('[')
                        def jsonEndIndex = rawStdout.lastIndexOf(']') + 1
                        def packagesString = rawStdout.substring(jsonStartIndex, jsonEndIndex)
                        // def packages = jsonParse(packagesString)
                        def jsonSlurper = new JsonSlurper()
                        def packages = jsonSlurper.parseText(packagesString)
                        // changedPackages = []
                        // changedPackages = packages
                        // changedPackages = packages
                        echo "Done Build and Publish"
                        // packages.each { p ->
                        //     def name = p.name.replace('@', '').replace('/', '-')
                        //     def imageName = "giangnguyen3246/${name}:${p.version}"
                        //     sh 'docker build -t giangnguyen3246/${imageName} --build-arg SERVICE_PACKAGE_NAME=${p.name} --build-arg SERVICE_PACKAGE_VERSION=${p.version} .'
                        //     sh 'docker push giangnguyen3246/${imageName}'
                        //     // def dockerImage = docker.build(imageName,"--build-arg SERVICE_PACKAGE_NAME=${p.name} --build-arg SERVICE_PACKAGE_VERSION=${p.version} --build-arg NPM_TOKEN=${SECRET} .")
                        //     // dockerImage.push()
                        //     echo "Pushed Docker Image ${imageName} Successfully"
                        // } 
                    }

                    
                }
                
            }
        }
        
        stage('Build images') {
            steps {
                script {
                    // echo "Over here"
                    echo "Changed services ${packages}"
                    withDockerRegistry(credentialsId: 'docker-hub-2', url: 'https://index.docker.io/v1/') {
                        packages.each { p ->
                            def name = p.name.replace('@', '').replace('/', '-')
                            def imageName = "giangnguyen3246/${name}:${p.version}"
                            def dockerImage = docker.build(imageName,"--build-arg SERVICE_PACKAGE_NAME=${p.name} --build-arg SERVICE_PACKAGE_VERSION=${p.version} --build-arg NPM_TOKEN=${SECRET} .")
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
