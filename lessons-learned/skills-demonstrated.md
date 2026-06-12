# Skills Demonstrated

## Overview

This project demonstrates practical DevSecOps and application security skills using a safe demo application and a GitLab CI/CD pipeline.

The focus was on security automation, evidence collection, and clear documentation.

## DevSecOps skills

Skills demonstrated:

```text
Secure CI/CD pipeline design
Shift-left security
Security automation
Pipeline artifact handling
Security gate documentation
Evidence-based reporting
Finding validation
Remediation planning
GitLab CI/CD skills

I created and executed a GitLab CI/CD pipeline with these stages:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary

Skills demonstrated:

Writing .gitlab-ci.yml
Using pipeline stages
Using job artifacts
Using Docker images in jobs
Using Docker-in-Docker for container build
Using needs for artifact dependency
Using allow_failure for learning-focused security gates
Troubleshooting workflow rules
Running manual pipelines from the GitLab UI
Application security skills

Skills demonstrated:

SAST result review
Insecure code pattern identification
Secret scanning
Dependency vulnerability review
Container vulnerability review
Security finding documentation
Technical impact explanation
Business impact explanation
Remediation recommendation
SAST with Semgrep

I used Semgrep to scan JavaScript code.

Confirmed finding:

Semgrep detected request data flowing into eval() in app/server.js.

Skills demonstrated:

Running Semgrep locally
Running Semgrep in CI/CD
Saving Semgrep reports
Reviewing Semgrep findings
Documenting SAST evidence
Explaining insecure eval usage
Secret scanning with Gitleaks

I used Gitleaks to scan for a demo-only fake secret.

Confirmed finding:

Gitleaks detected the fake demo API key pattern in app/server.js.

Skills demonstrated:

Running Gitleaks locally
Running Gitleaks in CI/CD
Using redacted output
Creating a custom Gitleaks rule
Saving Gitleaks reports
Documenting secret scanning evidence
Explaining why real secrets must not be committed
Dependency scanning with npm audit

I used npm audit to identify vulnerable dependencies.

Confirmed result:

npm audit found 8 vulnerabilities.

Skills demonstrated:

Running npm audit locally
Running npm audit in CI/CD
Generating JSON reports
Reviewing vulnerability severity
Documenting vulnerable dependencies
Explaining safe dependency remediation
Container security with Docker and Trivy

I built and scanned a Docker image.

Confirmed result:

Trivy found 6012 vulnerabilities in the demo container image.

Skills demonstrated:

Writing a Dockerfile
Creating a .dockerignore file
Building Docker images
Running containers locally
Testing containerized applications
Exporting images for scanning
Running Trivy locally
Running Trivy in CI/CD
Reviewing container vulnerability results
Explaining base image risk
Evidence handling

I collected and organized evidence in:

evidence/reports
evidence/screenshots
evidence/tool-outputs

Skills demonstrated:

Saving scan outputs
Saving JSON reports
Capturing screenshots
Downloading CI/CD artifacts
Reviewing outputs before publishing
Avoiding real secret exposure
Avoiding large unnecessary artifacts
Using clear evidence filenames
Git and GitHub skills

Skills demonstrated:

Creating a structured repository
Using feature-like commits by phase
Writing clear commit messages
Pushing updates to GitHub
Keeping the working tree clean
Publishing a professional portfolio project
Technical writing skills

Documentation written for this project includes:

README.md
final report
finding reports
remediation summary
pipeline documentation
methodology
scope
rules of engagement
lessons learned
career material

Skills demonstrated:

Writing clear technical documentation
Explaining methodology
Writing confirmed findings
Explaining remediation
Writing recruiter-friendly project summaries
Avoiding exaggerated claims
Using simple and direct English
Security consultant mindset

This project demonstrates a consultant-style approach:

Define scope
Run controlled tests
Collect evidence
Confirm findings
Explain technical impact
Explain business impact
Recommend remediation
Document limitations
Avoid unsupported claims
Role alignment

This project is relevant for:

Junior Application Security Engineer
Junior DevSecOps Engineer
Junior Security Engineer
Junior Pentester
Security Analyst
Cloud or Platform Security Intern
Summary

This project demonstrates that I can build and document a security-focused CI/CD workflow using real tools and real evidence.

It also shows that I understand how to review findings, avoid exposing sensitive data, and explain remediation in a clear way.
