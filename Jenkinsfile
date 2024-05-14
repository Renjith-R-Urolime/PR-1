pipeline {
    agent{
        label 'infithra-runner'
    }
    environment {
        AWS_ACCOUNT_ID="016222040435"
        AWS_DEFAULT_REGION="us-east-1"
        IMAGE_NAME="app-frontend"
        REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_NAME}"
        BRANCH=getBranch()
        DEPLOY_TAG="${BRANCH}_${GIT_COMMIT}"
        CONTAINER_IMAGE="${REPOSITORY_URI}:${DEPLOY_TAG}"
        CLUSTER_NAME=getClusterName()
        K8S_NS=getk8sns()
    }

    stages {
        // Logging into AWS ECR
        stage('Logging into AWS ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
            }
        }

         // Building Docker images for development
        stage('Building image for development') {
            when { environment name: 'BRANCH', value: 'development' }
            steps {
                dir('.') {
                    sh "docker build -t ${IMAGE_NAME}:${GIT_COMMIT} --build-arg BUILD_ENV=development . "
                    }
            }
        }

         // Building Docker images for Staging
        stage('Building image for Staging') {
            when { environment name: 'BRANCH', value: 'staging' }
            steps {
                dir('.') {
                    sh "docker build -t ${IMAGE_NAME}:${GIT_COMMIT} --build-arg BUILD_ENV=staging . "
                    }
            }
        }

        // Building Docker images for Production
        stage('Building image for production') {
            when { environment name: 'BRANCH', value: 'main' }
            steps {
                dir('.') {
                    sh "docker build -t ${IMAGE_NAME}:${GIT_COMMIT} --build-arg BUILD_ENV=production . "
                    }
            }
        }

        // Pushing to ECR
        stage('Pushing to ECR') {
            steps {
                script {
                    sh "docker tag ${IMAGE_NAME}:${GIT_COMMIT} ${CONTAINER_IMAGE}"
                    sh "docker push ${CONTAINER_IMAGE}"
                    sh "docker rmi ${CONTAINER_IMAGE} ${IMAGE_NAME}:${GIT_COMMIT}"
                }
            }
        }

        // Deployment
        stage('Prepare Env') {
            steps {
                   dir ('charts') {
                    withCredentials([file(credentialsId: 'helm-values', variable: 'values')]) {
                      sh '''cat $values > values.yaml'''
                    }
                 }
            }
        }
    
    stage('Setup Cluster Access') {
            when{
               environment (name: "BRANCH", value:"${BRANCH}")
            }
            steps {
                   sh '''aws sts get-caller-identity'''
                   sh '''aws eks update-kubeconfig --region us-east-1 --name ${CLUSTER_NAME}'''
            }
        }
    stage('Deployment') {
            steps {
                dir ('charts') {
                   sh '''helm upgrade --install ${IMAGE_NAME} . -n ${K8S_NS} --set image.tag=${DEPLOY_TAG} '''
                }
            }
        }
   }
    post {
          // Clean after build
          always {
              cleanWs()
              sh '''rm -rf ~/.kube/ ~/.aws/cli/cache'''
             
          }
          failure {
              emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
              to: 'devops@kpi.co',
              recipientProviders: [developers()],
              subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}", attachLog: true
          }
          changed {
            script {
              if(currentBuild.result == 'SUCCESS') {
                emailext body: "Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n is SUCCESS More info at: ${env.BUILD_URL}",
                to: 'devops@kpi.co',
                recipientProviders: [developers()],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}", attachLog: true
              }
            }
          }
    }
}
def getBranch() {
    branch=env.GIT_BRANCH.minus("origin/")
    return "${branch}"
}

def getk8sns() {
    if (env.GIT_BRANCH == 'origin/development') {
        return 'development'
    } else if (env.GIT_BRANCH == 'origin/staging') {
        return 'staging'
    } else if (env.GIT_BRANCH == 'origin/main') {
        return 'production'
    } 
}

def getClusterName() {
if (env.GIT_BRANCH == 'origin/development' || env.GIT_BRANCH == 'origin/staging' ) {
        return 'infithra-non-prod-cluster'
    }  else if (env.GIT_BRANCH == 'origin/main') {
        return 'infithra-production-cluster'
    } 
}
