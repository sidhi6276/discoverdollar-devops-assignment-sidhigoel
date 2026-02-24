🚀 DiscoverDollar DevOps Assignment – Sidhi Goel

Full-stack MEAN (MongoDB, Express, Angular, Node.js) application — Containerized, CI/CD enabled, deployed on cloud with Nginx reverse proxy.


📁 Repository Structure
.
├── frontend/                  # Angular frontend application
│   └── Dockerfile
├── backend/                   # Node.js + Express backend API
│   └── Dockerfile
├── docker-compose.yml         # Multi-container orchestration
├── nginx/
│   └── nginx.conf             # Reverse proxy configuration
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD pipeline
└── README.md

🛠️ Tech Stack
LayerTechnologyFrontendAngularBackendNode.js + Express.jsDatabaseMongoDB (Docker image)ContainerDocker + Docker ComposeCI/CDGitHub ActionsWeb ServerNginx (Reverse Proxy)CloudAWS EC2 (Ubuntu 22.04)

⚙️ Local Setup & Running
Prerequisites

Docker & Docker Compose installed
Git installed

## 📌 EC2 Server Details

Cloud Provider: AWS  
Instance Type: t3.small  
OS: Ubuntu 22.04

Application URL: http://13.127.89.222

---

## 📌 Docker Images

DockerHub Repository:

Backend Image: sidhigoel/dd-backend:latest


Frontend Image:sidhigoel/dd-frontend:latest
---

## 📌 Project Structure

crud-dd-task-mean-app
│
├── backend
│ ├── Dockerfile
│ ├── server.js
│ └── package.json
│
├── frontend
│ ├── Dockerfile
│ └── angular files
│
├── docker-compose.yml
│
└── README.md

---

## 📌 Backend Dockerfile


FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","start"]


---

## 📌 Frontend Dockerfile


FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/angular-15-crud /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]


---

## 📌 Docker Compose Configuration


version: '3'

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


---

## 📌 Setup Instructions

### Step 1: Clone Repository


git clone https://github.com/sidhi6276/discoverdollar-devops-assignment-sidhigoel.git

cd discoverdollar-devops-assignment-sidhigoel


---

### Step 2: Install Docker


sudo apt update
sudo apt install docker.io -y


---

### Step 3: Install Docker Compose


sudo apt install docker-compose -y


---

### Step 4: Run Application


sudo docker-compose up -d --build


---

### Step 5: Check Containers


sudo docker ps


---

## 📌 CI/CD Pipeline

GitHub Actions is used for CI/CD automation.

Pipeline automatically:

- Builds Docker Images
- Pushes images to DockerHub
- Deploys application to EC2

Workflow File Location:


.github/workflows/deploy.yml


---

## 📌 Nginx Reverse Proxy

Nginx is configured on EC2.

All traffic is routed through:


Port 80


Frontend:


http://13.127.89.222


Backend API:


http://13.127.89.222/api/tutorials


---

## 📌 API Testing


curl http://13.127.89.222/api/tutorials


Expected Output:


[]


---

## 📌 Screenshots Required

### Docker Containers


docker ps


### Docker Images


docker images


### CI/CD Pipeline

GitHub Actions workflow run screenshot

### Application UI

Angular application running screenshot

### Nginx Setup

Nginx reverse proxy screenshot

---

## 📌 Author

Sidhi Goel  
MCA Student  
DevOps Enthusiast

GitHub:


https://github.com/sidhi6276


DockerHub:


https://hub.docker.com/u/sidhigoel
