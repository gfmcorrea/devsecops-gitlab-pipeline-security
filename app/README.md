# Demo Node.js Application

## Overview

This folder contains the safe demo application used in the DevSecOps pipeline project.

The application is a small Node.js and Express app created only for local testing, CI/CD validation, and security scanning practice.

It is not a production application.

## Purpose

The purpose of this application is to provide a controlled target for:

```text
SAST testing
secret scanning validation
dependency scanning
Docker image build
container image scanning
CI/CD pipeline execution
Main files
server.js
package.json
package-lock.json
Dockerfile
.dockerignore
Endpoints

The application exposes simple local endpoints:

GET /
GET /health
GET /demo/lodash
GET /demo/eval?expression=1%2B1
Controlled demo findings

The application intentionally includes controlled demo issues:

A demo-only eval() pattern for SAST validation
A fake API key pattern for secret scanning validation
Vulnerable dependencies for dependency scanning validation
A Dockerfile for container image scanning validation

The fake API key is not real and must never be used in production.

Run locally

Install dependencies:

npm install

Start the application:

npm start

Test locally:

curl -i http://localhost:3000/
curl -i http://localhost:3000/health
Build with Docker

From the project root:

docker build -t devsecops-demo-app:local app

Run the container:

docker run --rm -d --name devsecops-demo-app-test -p 3001:3000 devsecops-demo-app:local

Test the container:

curl -i http://localhost:3001/
curl -i http://localhost:3001/health

Stop the container:

docker stop devsecops-demo-app-test
Disclaimer

This application exists only for a controlled portfolio project.

It does not contain real secrets, real user data, production logic, company code, or external target scanning.
