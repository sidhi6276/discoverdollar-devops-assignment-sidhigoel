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

Steps
bash# 1. Clone the repository
git clone https://github.com/sidhi6276/discoverdollar-devops-assignment-sidhigoel.git
cd discoverdollar-devops-assignment-sidhigoel

# 2. Build and start all containers
docker-compose up --build -d

# 3. Access the application
# Frontend: http://localhost
# Backend API: http://localhost/api

🐳 Docker Setup
Frontend Dockerfile
dockerfileFROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
EXPOSE 80
Backend Dockerfile
dockerfileFROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
Docker Compose
yamlversion: '3.8'

services:
  mongo:
    image: mongo:6
    container_name: mongo
    restart: always
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    container_name: backend
    restart: always
    environment:
      - MONGO_URI=mongodb://mongo:27017/meandb
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: frontend
    restart: always
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend

volumes:
  mongo_data:

🌐 Nginx Reverse Proxy Configuration
nginxevents {}

http {
  server {
    listen 80;

    location / {
      proxy_pass http://frontend:80;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
      proxy_pass http://backend:3000/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
The entire application is accessible via port 80 through Nginx.

☁️ Cloud Deployment (AWS EC2)
VM Setup

Launch an Ubuntu 22.04 EC2 instance (t2.micro or above)
Open inbound port 80 in the Security Group
SSH into the instance:

bashssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

Install Docker & Docker Compose:

bashsudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

Clone the repo and deploy:

bashgit clone https://github.com/sidhi6276/discoverdollar-devops-assignment-sidhigoel.git
cd discoverdollar-devops-assignment-sidhigoel
docker-compose up -d

Access the app at: http://<EC2_PUBLIC_IP>


🔄 CI/CD Pipeline (GitHub Actions)
The pipeline triggers on every push to the main branch:

Build Docker images for frontend and backend
Push images to Docker Hub
SSH into the EC2 VM and pull latest images + restart containers

.github/workflows/ci-cd.yml
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

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build & Push Frontend Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/mean-frontend:latest ./frontend
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/mean-frontend:latest

      - name: Build & Push Backend Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/mean-backend:latest ./backend
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/mean-backend:latest

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
```

### GitHub Secrets Required

| Secret Name          | Description                    |
|----------------------|--------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username       |
| `DOCKERHUB_TOKEN`    | Docker Hub access token        |
| `EC2_HOST`           | Public IP of your EC2 instance |
| `EC2_SSH_KEY`        | Private SSH key for EC2 access |

---

## 🐋 Docker Hub Images
```
docker pull sidhi6276/mean-frontend:latest
docker pull sidhi6276/mean-backend:latest

📸 Screenshots
CI/CD Pipeline Execution
(Add screenshot of GitHub Actions workflow run)
Docker Image Build & Push
(Add screenshot of Docker Hub with pushed images)
Application UI
(Add screenshot of working Angular app on the browser)
Nginx Setup
(Add screenshot of Nginx running / curl output)

📌 Notes

MongoDB runs as a Docker container using the official mongo:6 image
Data is persisted using Docker named volumes (mongo_data)
Cloud infrastructure (EC2) is kept running for live demo
HTTPS and domain mapping not configured (as per task requirements)


👩‍💻 Submitted By
Sidhi Goel
GitHub: sidhi6276
Assignment: DiscoverDollar DevOps Internship – Feb 2026
