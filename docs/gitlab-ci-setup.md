# GitLab CI/CD Setup

This guide explains how I configured GitLab CI/CD for this portfolio project.

## Goal

The goal was to create a security-focused CI/CD pipeline using open-source tools.

The pipeline runs checks for:

```text
SAST
secret scanning
dependency scanning
Docker image build
container image scanning
Repository

GitHub repository:

https://github.com/gfmcorrea/devsecops-gitlab-pipeline-security

GitLab repository:

[INSERT YOUR GITLAB PROJECT URL HERE]
Pipeline file

The pipeline is defined in:

.gitlab-ci.yml
Pipeline stages

The pipeline uses these stages:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
Runner requirements

The pipeline can run on a GitLab runner that supports Docker.

The container_build job uses Docker-in-Docker.

If the Docker build job fails, I would check:

Runner supports Docker
Docker-in-Docker service is available
Runner has permission to run Docker builds
Network access to pull Docker images is working
Tools used in CI/CD

Semgrep:

SAST scan for JavaScript code

Gitleaks:

Secret scanning using a custom demo rule

npm audit:

Dependency scanning for Node.js packages

Docker:

Builds the demo application image

Trivy:

Scans the Docker image for known vulnerabilities
Artifacts

Each security stage saves artifacts under:

evidence/

Important artifact folders:

evidence/reports/semgrep
evidence/reports/gitleaks
evidence/reports/dependency-check
evidence/reports/trivy
evidence/tool-outputs
Security gates

For this portfolio project, some security scan jobs use:

allow_failure: true

I used this because the application contains controlled demo findings.

In a real company, I would tune the security gates carefully.

Examples:

Block on confirmed real secrets.
Block on critical vulnerabilities with available fixes.
Warn on lower severity findings.
Review SAST findings manually before blocking.
Evidence collection

After running the pipeline, I capture screenshots of:

GitLab project page
Pipeline overview
All stages visible
Each security job output
Artifacts page
Downloaded reports
Final pipeline result

I only publish evidence after reviewing and redacting sensitive values.

Notes

This pipeline is for a safe local demo application.

It does not scan third-party targets.

It does not use real secrets.

It does not contain company code.
