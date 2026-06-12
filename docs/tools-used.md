# Tools Used

## Overview

This file documents the main tools used in the DevSecOps Security Pipeline project.

The project used open-source tools to run security checks locally and in GitLab CI/CD.

## Git

Git was used for version control.

Main uses:

```text
Track repository changes
Create commits by project phase
Push updates to GitHub
Keep the working tree clean
```

## GitHub

GitHub was used to host the portfolio repository.

Main uses:

```text
Publish the project
Organize documentation
Store evidence and reports
Show the project to recruiters and interviewers
```

## GitLab CI/CD

GitLab CI/CD was used to run the automated pipeline.

Main uses:

```text
Run setup jobs
Run security scanning jobs
Build the Docker image
Scan the Docker image
Save artifacts
Validate the full DevSecOps workflow
```

Pipeline stages:

```text
setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
```

## Node.js

Node.js was used to run the demo application.

Main uses:

```text
Run the Express application
Execute npm scripts
Support local validation and CI setup
```

## npm

npm was used for dependency installation and dependency scanning.

Main uses:

```text
Install dependencies
Run npm test
List installed packages
Run npm audit
Generate dependency vulnerability evidence
```

## Docker

Docker was used to containerize the demo application.

Main uses:

```text
Build the application image
Run the application container locally
Export the image for scanning
Support GitLab CI/CD container build
```

## Semgrep

Semgrep was used for SAST.

Main uses:

```text
Scan JavaScript source code
Detect insecure code patterns
Generate text and JSON reports
Validate the eval() demo finding
```

Confirmed result:

```text
Semgrep detected request data flowing into eval() in app/server.js.
```

## Gitleaks

Gitleaks was used for secret scanning.

Main uses:

```text
Scan the repository for secret patterns
Use a custom rule for the fake demo API key
Generate redacted reports
Validate the secret scanning stage
```

Confirmed result:

```text
Gitleaks detected the demo-only fake API key pattern in app/server.js.
```

## npm audit

npm audit was used for dependency scanning.

Main uses:

```text
Identify vulnerable Node.js dependencies
Generate text output
Generate JSON report
Create vulnerability summaries
```

Confirmed result:

```text
npm audit found 8 vulnerabilities in the demo application dependencies.
```

## Trivy

Trivy was used for container image scanning.

Main uses:

```text
Scan Docker image vulnerabilities
Generate text output
Generate JSON report
Review operating system and package vulnerabilities
Validate the container scanning stage
```

Confirmed result:

```text
Trivy found vulnerabilities in the demo container image.
```

## curl

curl was used to test local application endpoints.

Main uses:

```text
Validate the running Node.js app
Validate the containerized application
Save HTTP responses as evidence
```

## nano

nano was used to edit project files from the terminal.

Main uses:

```text
Edit Markdown documentation
Edit pipeline configuration
Edit application files
```

## tree

tree was used to review the repository structure.

Main uses:

```text
Show project organization
Generate repository structure evidence
Support final review
```

## Summary

The tools used in this project helped demonstrate a practical DevSecOps workflow with security automation, evidence collection, and technical documentation.
