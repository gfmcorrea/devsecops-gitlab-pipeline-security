# Project Scope

## Overview

This file defines the scope of the DevSecOps Security Pipeline project.

The project was created for learning and portfolio purposes. All testing was performed against a safe demo application created specifically for this repository.

## In scope

The following items were in scope:

```text
Local Node.js demo application
Application source code
Application dependencies
Docker image built from the demo app
GitLab CI/CD pipeline
Pipeline artifacts
Local security scan reports
GitLab CI/CD security scan reports
Screenshots and tool outputs collected as evidence
In-scope folders
app/
.gitlab-ci.yml
.gitleaks.toml
pipeline/
findings/
reports/
remediation/
evidence/
docs/
methodology/
scope/
lessons-learned/
Security checks in scope

The following checks were included:

SAST with Semgrep
Secret scanning with Gitleaks
Dependency scanning with npm audit
Docker image build
Container scanning with Trivy
Security gate observation
Evidence review
Out of scope

The following items were not in scope:

External targets
Third-party systems
Real company code
Real customer data
Real production secrets
Cloud infrastructure
Production deployment
Phishing
Malware
Persistence
Evasion
Destructive actions
Unauthorized testing
Target

The only target was the controlled demo application located in:

app/
Authorization

This project was created and executed in a controlled local and GitLab CI/CD environment owned by the repository author.

No third-party target was scanned.

Limitations

This project is not a full production security assessment.

It is a portfolio lab designed to demonstrate DevSecOps concepts, CI/CD security tooling, evidence collection, and security documentation.
