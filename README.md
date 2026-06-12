# DevSecOps Security Pipeline with GitLab CI/CD

## Overview

I built this project to practice DevSecOps pipeline security using GitLab CI/CD and open-source security tools.

The goal was to create a small demo application, add security checks to the CI/CD pipeline, collect real evidence, and document the results in a clear way.

This project shows how I integrated security checks into a pipeline for:

```text
SAST
secret scanning
dependency scanning
container image scanning
security gate observation
evidence-based reporting
```

The project uses a safe local/demo Node.js application. It does not scan external targets, third-party systems, real company code, or real production data.

## Project repositories

GitHub repository:

```text
https://github.com/gfmcorrea/devsecops-gitlab-pipeline-security
```

GitLab CI/CD project:

```text
https://gitlab.com/gfmcorrea/devsecops-gitlab-pipeline-security
```

## Why I built this project

I built this project to practice how security tools can be added to a CI/CD workflow.

I wanted to understand how a DevSecOps pipeline works from start to finish:

```text
create a demo app
add a GitLab CI/CD pipeline
run security tools
save scan reports as artifacts
review findings
document evidence
explain remediation
```

This project helped me practice both technical security testing and documentation.

## Demo application

The demo application is a simple Node.js and Express app located in:

```text
app/
```

Main files:

```text
app/server.js
app/package.json
app/package-lock.json
app/Dockerfile
app/.dockerignore
```

The app includes controlled demo issues for security validation:

```text
A demo-only insecure code pattern for SAST
A fake API key for secret scanning
Vulnerable dependencies for dependency scanning
A Docker image for container scanning
```

The fake secret is not real and must never be used in production.

## Lab environment

The project was built and tested using:

```text
Ubuntu
Git
GitHub
GitLab CI/CD
Docker
Node.js
npm
Semgrep
Gitleaks
npm audit
Trivy
Markdown
```

## Tools used

Semgrep:

```text
Used for static application security testing.
```

Gitleaks:

```text
Used for secret scanning.
```

npm audit:

```text
Used for dependency scanning.
```

Docker:

```text
Used to build the demo application container image.
```

Trivy:

```text
Used to scan the container image for known vulnerabilities.
```

GitLab CI/CD:

```text
Used to automate the security pipeline.
```

## Pipeline stages

The GitLab CI/CD pipeline includes these stages:

```text
setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
```

## Pipeline result

The pipeline was executed successfully in GitLab CI/CD.

Final result:

```text
Status: Passed
Jobs: 7
Branch: main
Pipeline source: web
```

Jobs executed:

```text
setup: passed
sast: passed
secret_scan: passed
dependency_scan: passed
container_build: passed
container_scan: passed
report_summary: passed
```

Evidence:

```text
evidence/screenshots/pipeline/06-gitlab-all-jobs-passed.png
evidence/tool-outputs/24-final-pipeline-summary.txt
```

## Findings summary

### Finding 01 — SAST Insecure Code Pattern

Status:

```text
Confirmed
```

Severity:

```text
Medium
```

Tool:

```text
Semgrep
```

Summary:

```text
Semgrep detected user-controlled request data flowing into eval() in app/server.js.
```

Evidence:

```text
findings/01-sast-insecure-code-pattern.md
evidence/reports/semgrep/
evidence/screenshots/sast/
```

### Finding 02 — Secret Detection Fake Secret

Status:

```text
Confirmed
```

Severity:

```text
Medium
```

Tool:

```text
Gitleaks
```

Summary:

```text
Gitleaks detected a demo-only fake API key pattern in app/server.js.
The output was redacted.
```

Evidence:

```text
findings/02-secret-detection-fake-secret.md
evidence/reports/gitleaks/
evidence/screenshots/secret-scanning/
```

### Finding 03 — Vulnerable Dependency

Status:

```text
Confirmed
```

Severity:

```text
High
```

Tool:

```text
npm audit
```

Summary:

```text
npm audit found 8 vulnerabilities in the demo application dependencies.
```

Observed summary:

```text
Low: 3
Moderate: 1
High: 4
Critical: 0
Total: 8
```

Evidence:

```text
findings/03-vulnerable-dependency.md
evidence/reports/dependency-check/
evidence/screenshots/dependency-scanning/
```

### Finding 04 — Container Image Vulnerabilities

Status:

```text
Confirmed
```

Severity:

```text
Critical
```

Tool:

```text
Trivy
```

Summary:

```text
Trivy found vulnerabilities in the demo container image.
```

Observed summary:

```text
Low: 1478
Medium: 3161
High: 1176
Critical: 197
Total: 6012
```

Evidence:

```text
findings/04-container-image-vulnerabilities.md
evidence/reports/trivy/
evidence/screenshots/container-scanning/
```

### Finding 05 — Security Gate Observation

Status:

```text
Confirmed
```

Severity:

```text
Informational
```

Tool:

```text
GitLab CI/CD
```

Summary:

```text
The pipeline used allow_failure for learning-focused security scan jobs.
The jobs still generated evidence and artifacts for manual review.
```

Evidence:

```text
findings/05-security-gate-observation.md
evidence/tool-outputs/24-final-pipeline-summary.txt
evidence/tool-outputs/25-final-findings-summary.txt
```

## Evidence handling

I saved evidence in:

```text
evidence/
```

Main evidence folders:

```text
evidence/reports/
evidence/screenshots/
evidence/tool-outputs/
```

Before publishing evidence, I reviewed the outputs to avoid exposing real secrets or sensitive data.

The Gitleaks outputs use redacted secret values.

The Trivy reports include vulnerability descriptions and CVE information.

Exported Docker image tar files were not committed to the repository.

## How to run the application locally

Go to the app folder:

```bash
cd app
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm start
```

Test the app:

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/health
```

## How to run the Docker image locally

From the project root:

```bash
docker build -t devsecops-demo-app:local app
```

Run the container:

```bash
docker run --rm -d --name devsecops-demo-app-test -p 3001:3000 devsecops-demo-app:local
```

Test the container:

```bash
curl -i http://localhost:3001/
curl -i http://localhost:3001/health
```

Stop the container:

```bash
docker stop devsecops-demo-app-test
```

## How to run the pipeline

The pipeline is defined in:

```text
.gitlab-ci.yml
```

To run it in GitLab:

```text
Open the GitLab project
Go to Build > Pipelines
Click New pipeline
Select branch main
Run the pipeline
```

The pipeline supports manual runs from the GitLab UI using:

```yaml
- if: '$CI_PIPELINE_SOURCE == "web"'
```

## Repository structure

```text
devsecops-gitlab-pipeline-security/
├── app
├── appendices
├── docs
├── evidence
├── findings
├── lessons-learned
├── methodology
├── pipeline
├── remediation
├── reports
└── scope
```

## Important folders

app:

```text
Demo Node.js application and Dockerfile.
```

pipeline:

```text
Pipeline documentation and security scanning stages.
```

findings:

```text
Confirmed findings and security observations.
```

evidence:

```text
Screenshots, scan reports, CI artifacts, and tool outputs.
```

reports:

```text
Final project report.
```

remediation:

```text
Remediation guidance for the identified issues.
```

lessons-learned:

```text
What I learned while building the project.
```

## Skills demonstrated

This project demonstrates practical experience with:

```text
GitLab CI/CD
DevSecOps pipeline design
SAST
secret scanning
dependency scanning
container scanning
Docker
security artifacts
security gates
evidence-based reporting
technical documentation
Git and GitHub workflow
```

## Lessons learned

I learned how to build a simple security pipeline and validate each step with real evidence.

I also learned that security tools need review and tuning. Not every finding should automatically break a pipeline, especially during early adoption or in a learning project.

The most important lesson was that a DevSecOps pipeline is not only about running tools. It is also about collecting evidence, reviewing results, documenting findings, and improving the workflow over time.

## Ethical disclaimer

This project was created for learning and portfolio purposes.

The application is a safe local demo app.

This project does not include:

```text
real secrets
real company code
real customer data
malware
phishing
persistence
evasion
destructive actions
external target scanning
third-party system testing
```

All testing was performed against a controlled demo application created for this project.
