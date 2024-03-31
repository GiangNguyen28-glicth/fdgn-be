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
                git 'https://github.com/GiangNguyen28-glicth/fdgn-be.git' 
            }
        } 
        stage('Build and Publish') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub-2', url: 'https://index.docker.io/v1/') {
                    sh 'yarn install'
                    sh 'yarn build'
                    def packagesString = sh (
                        script: 'yarn lerna list --json',
                        returnStdout: true
                    ).trim()
                    def packages = jsonParse(packagesString)
                    changedPackages = []
                    changedPackages = packages
                    echo "Changed services ${changedPackages}"
                }
                
            }
        }
        stage('Build images') { 
            steps { 
                script { 
                    echo "Hello world"
                    // docker.withRegistry( '', registryCredential ) { 
                    //     dockerImage.push() 
                    // }
                } 
            }
        } 
    }
}