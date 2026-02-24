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
