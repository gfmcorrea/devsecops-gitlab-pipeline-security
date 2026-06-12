# Environment Setup

## Overview

This file documents the environment used to build and validate the DevSecOps Security Pipeline project.

The project was tested locally and then executed in GitLab CI/CD.

## Local environment

The local environment was used to:

```text
Validate the demo application
Run npm commands
Build the Docker image
Run local security scans
Collect local evidence
Prepare files for GitHub
```

## Operating system

The project was built on Ubuntu.

Main local tools used:

```text
Git
Docker
Node.js
npm
curl
nano
tree
```

## Repository location

Local project path:

```text
~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
```

## Application environment

The demo application is located in:

```text
app/
```

Important files:

```text
server.js
package.json
package-lock.json
Dockerfile
.dockerignore
```

## Node.js and npm

Node.js and npm were used to install and validate the demo application.

Commands used:

```bash
node -v
npm -v
cd app
npm install
npm test
npm start
```

## Docker environment

Docker was used to build and run the demo application as a container.

Commands used:

```bash
docker --version
docker info
docker build -t devsecops-demo-app:local app
docker run --rm -d --name devsecops-demo-app-test -p 3001:3000 devsecops-demo-app:local
docker ps
docker stop devsecops-demo-app-test
```

## GitLab CI/CD environment

GitLab CI/CD was used to run the pipeline.

The pipeline executed these jobs:

```text
setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
```

The project used GitLab instance runners.

## Evidence folders

Evidence was saved under:

```text
evidence/
```

Main evidence folders:

```text
evidence/reports/
evidence/screenshots/
evidence/tool-outputs/
```

## Notes

This environment was used only for a safe demo application.

No external targets, real company code, customer data, or production secrets were used.
