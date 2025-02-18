pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-ecommerce-app"
        IMAGE_TAG = "latest"
        REGISTRY = "mydockerhub"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=ecommerce -Dsonar.sources=backend'
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh '''
                        docker build -t $REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
                        docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL $REGISTRY/$IMAGE_NAME:$IMAGE_TAG'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}

