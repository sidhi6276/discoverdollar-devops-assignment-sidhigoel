Discover Dollar DevOps Assignment
MEAN Stack Application Deployment using Docker, Docker Compose, CI/CD and AWS EC2

📌 Project Overview
This project demonstrates containerization and deployment of a full-stack MEAN application.
Technologies Used:

MongoDB (Database)
Express.js (Backend Framework)
Angular 15 (Frontend Framework)
Node.js (Runtime)
Docker & Docker Compose
AWS EC2 (Ubuntu 22.04)
GitHub Actions (CI/CD)
Nginx Reverse Proxy

The application is deployed on an AWS EC2 Ubuntu instance using Docker Compose.

📌 Architecture
User → Nginx (Port 80) → Angular Frontend → Node.js Backend → MongoDB

📌 EC2 Server Details
DetailInfoCloud ProviderAWSInstance Typet3.smallOSUbuntu 22.04Application URLhttp://13.127.89.222

📌 Docker Images
DockerHub: https://hub.docker.com/u/sidhigoel
ServiceImageBackendsidhigoel/dd-backend:latestFrontendsidhigoel/dd-frontend:latest
bashdocker pull sidhigoel/dd-backend:latest
docker pull sidhigoel/dd-frontend:latest
```

---

## 📌 Project Structure
```
crud-dd-task-mean-app/
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   └── (angular files)
├── docker-compose.yml
└── README.md

📌 Backend Dockerfile
dockerfileFROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

📌 Frontend Dockerfile
dockerfileFROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/angular-15-crud /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

📌 Docker Compose Configuration
yamlversion: '3'
services:

  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    container_name: backend
    restart: always
    ports:
      - "5000:8080"
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo_data:

📌 Setup Instructions
Step 1: Clone Repository
bashgit clone https://github.com/sidhi6276/discoverdollar-devops-assignment-sidhigoel.git
cd discoverdollar-devops-assignment-sidhigoel
Step 2: Install Docker
bashsudo apt update
sudo apt install docker.io -y
Step 3: Install Docker Compose
bashsudo apt install docker-compose -y
Step 4: Run Application
bashsudo docker-compose up -d --build
Step 5: Check Containers
bashsudo docker ps

📌 CI/CD Pipeline
GitHub Actions is used for CI/CD automation.
Pipeline automatically:

Builds Docker images on every push to main
Pushes images to DockerHub
SSHs into EC2 and redeploys containers with latest images

Workflow file: .github/workflows/deploy.yml
yamlname: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Log in to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build & Push Backend
        run: |
          docker build -t sidhigoel/dd-backend:latest ./backend
          docker push sidhigoel/dd-backend:latest

      - name: Build & Push Frontend
        run: |
          docker build -t sidhigoel/dd-frontend:latest ./frontend
          docker push sidhigoel/dd-frontend:latest

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd discoverdollar-devops-assignment-sidhigoel
            git pull origin main
            docker-compose pull
            docker-compose up -d --force-recreate
GitHub Secrets needed:
SecretDescriptionDOCKERHUB_USERNAMEsidhigoelDOCKERHUB_TOKENDockerHub access tokenEC2_HOST13.127.89.222EC2_SSH_KEYEC2 private key

📌 Nginx Reverse Proxy
Nginx routes all traffic through Port 80.
RouteTarget/Angular Frontend/api/Node.js Backend (port 8080)
Frontend: http://13.127.89.222
Backend API: http://13.127.89.222/api/tutorials
API Test:
bashcurl http://13.127.89.222/api/tutorials
# Expected: []

📌 Screenshots

(Screenshots to be added after deployment)


docker ps — running containers
docker images — built images
GitHub Actions — CI/CD workflow run
Application UI — Angular app in browser
Nginx — reverse proxy working


📌 Author
Sidhi Goel | MCA Student | DevOps Enthusiast

GitHub: https://github.com/sidhi6276
DockerHub: https://hub.docker.com/u/sidhigoel
