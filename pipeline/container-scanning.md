# Container Scanning — Docker and Trivy

## Overview

This file documents the container build and container scanning stages of the DevSecOps pipeline.

The demo application was built as a Docker image and scanned with Trivy.

## Tools

Tools used:

```text
Docker
Trivy
```

Docker was used to build and run the application image.

Trivy was used to scan the image for known vulnerabilities.

## Target

The container scan targeted the Docker image built from:

```text
app/Dockerfile
```

Local image name:

```text
devsecops-demo-app:local
```

Base image:

```text
node:18-bullseye
```

## Local Docker build

The local image was built with:

```bash
docker build -t devsecops-demo-app:local app
```

The container was tested with:

```bash
docker run --rm -d --name devsecops-demo-app-test -p 3001:3000 devsecops-demo-app:local
curl -i http://localhost:3001/
curl -i http://localhost:3001/health
docker stop devsecops-demo-app-test
```

## Local Trivy scan

The image was exported for local scanning:

```bash
docker save devsecops-demo-app:local -o evidence/tool-outputs/devsecops-demo-app-local.tar
```

Then scanned with Trivy:

```bash
docker run --rm -v "$PWD:/repo" -w /repo aquasec/trivy:latest image --input evidence/tool-outputs/devsecops-demo-app-local.tar --severity LOW,MEDIUM,HIGH,CRITICAL
```

JSON report command:

```bash
docker run --rm -v "$PWD:/repo" -w /repo aquasec/trivy:latest image --input evidence/tool-outputs/devsecops-demo-app-local.tar --severity LOW,MEDIUM,HIGH,CRITICAL --format json --output evidence/reports/trivy/trivy-report.json || true
```

The exported `.tar` file was used only for scanning and was not committed to GitHub.

## GitLab CI/CD build

The GitLab pipeline built the image in the `container_build` job.

The job used:

```text
docker:24-cli
docker:24-dind
```

Main commands:

```bash
docker build -t "$IMAGE_NAME:$IMAGE_TAG" app
docker save "$IMAGE_NAME:$IMAGE_TAG" -o evidence/tool-outputs/devsecops-demo-app-ci.tar
```

## GitLab CI/CD scan

The GitLab pipeline scanned the image in the `container_scan` job.

The job used:

```text
aquasec/trivy:latest
```

Main commands:

```bash
trivy image --input evidence/tool-outputs/devsecops-demo-app-ci.tar --severity LOW,MEDIUM,HIGH,CRITICAL
trivy image --input evidence/tool-outputs/devsecops-demo-app-ci.tar --severity LOW,MEDIUM,HIGH,CRITICAL --format json --output evidence/reports/trivy/ci-trivy-report.json || true
```

## Confirmed finding

Trivy confirmed one container scanning finding.

Finding:

```text
Finding 04 — Container Image Vulnerabilities
```

Observed summary:

```text
Low: 1478
Medium: 3161
High: 1176
Critical: 197
Total: 6012
```

## Result

Trivy identified vulnerabilities in the demo container image.

The result shows why base image selection and container scanning are important in a DevSecOps workflow.

## Evidence

Local evidence:

```text
evidence/reports/trivy/trivy-output.txt
evidence/reports/trivy/trivy-report.json
evidence/tool-outputs/17-docker-build-output.txt
evidence/tool-outputs/18-docker-image-list.txt
evidence/tool-outputs/19-docker-container-running.txt
evidence/tool-outputs/20-container-curl-homepage.txt
evidence/tool-outputs/21-container-curl-health.txt
evidence/tool-outputs/22-trivy-summary.txt
evidence/tool-outputs/23-trivy-vulnerability-examples.txt
```

GitLab CI/CD evidence:

```text
evidence/reports/trivy/ci-trivy-output.txt
evidence/reports/trivy/ci-trivy-report.json
evidence/tool-outputs/ci-docker-build-output.txt
evidence/tool-outputs/ci-docker-image-list.txt
evidence/tool-outputs/ci-trivy-version.txt
```

Screenshots:

```text
evidence/screenshots/container-scanning/
```

## Remediation idea

Recommended remediation:

```text
Review the Trivy report.
Prioritize critical and high severity findings.
Check if fixes are available.
Update the base image.
Use a smaller runtime image.
Remove unnecessary packages.
Rebuild the image.
Run Trivy again.
```

Possible base image improvement:

```dockerfile
FROM node:20-bookworm-slim
```

Another possible option if compatible:

```dockerfile
FROM node:20-alpine
```

## Limitations

Trivy reports known vulnerabilities, but not every finding is exploitable in the deployed application.

Manual review is required to understand:

```text
whether the vulnerable package is used
whether a fix is available
whether the package is present at runtime
whether the vulnerability is reachable
whether the deployed environment exposes the risk
```

## Conclusion

The container scanning stage successfully built the demo application image, scanned it with Trivy, and generated evidence showing container image vulnerabilities.
