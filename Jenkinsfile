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
                        echo "Packages ${packages}"
                        // changedPackages = packages
                        changedPackages = []
                        changedPackages = packages
                        
                        echo "Changed services ${changedPackages}"
                    }
                }
                
            }
        }
        
        stage('Build images') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                    echo "Hello world"
                    changedPackages.each { p ->
                        def name = p.name.replace('@', '').replace('/', '-')
                        def imageName = "giangnguyen3246/${name}:${p.version}"
                        def dockerImage = docker.build(imageName,"--build-arg SERVICE_PACKAGE_NAME=${p.name} --build-arg SERVICE_PACKAGE_VERSION=${p.version} --build-arg NPM_TOKEN=${SECRET} .")
                        dockerImage.push()
                        echo "Pushed Docker Image ${imageName} Successfully"
                    }
                }
            }
        }
    }
}
