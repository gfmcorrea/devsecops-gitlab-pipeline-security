# DevSecOps Methodology

## Overview

This methodology explains how the DevSecOps Security Pipeline project was executed.

The project followed an evidence-based workflow. A finding was only marked as confirmed when supported by tool output, screenshots, or manual validation.

## Methodology phases

The project was executed in these phases:

```text
1. Repository structure setup
2. Demo application validation
3. Local dependency scanning
4. Local SAST scanning
5. Local secret scanning
6. Local Docker build and container scanning
7. GitLab CI/CD pipeline configuration
8. GitLab CI/CD pipeline execution
9. Final reporting and remediation documentation
10. Final repository review
Phase 1 — Repository setup

The repository was organized into folders for:

application code
pipeline documentation
findings
evidence
reports
remediation
scope
methodology
lessons learned
career material

This structure made the project easier to review.

Phase 2 — Demo application validation

The Node.js demo application was installed and tested locally.

Validation included:

node version
npm version
npm install
npm test
npm start
curl endpoint testing
browser endpoint testing
Phase 3 — Dependency scanning

npm audit was used to scan application dependencies.

The goal was to identify vulnerable packages and document results with text and JSON evidence.

Phase 4 — SAST scanning

Semgrep was used to scan the JavaScript application source code.

The goal was to detect insecure code patterns, including the controlled demo use of eval().

Phase 5 — Secret scanning

Gitleaks was used to scan the repository for secret patterns.

A custom Gitleaks rule was created to detect a demo-only fake API key in a safe and controlled way.

Phase 6 — Container scanning

Docker was used to build the application image.

Trivy was used to scan the container image for known vulnerabilities.

The goal was to understand base image risk and container scanning evidence.

Phase 7 — GitLab CI/CD configuration

A .gitlab-ci.yml file was created to automate the security checks.

The pipeline included:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
Phase 8 — GitLab CI/CD execution

The pipeline was executed in GitLab CI/CD.

All 7 jobs passed successfully.

Artifacts were downloaded and reviewed.

Phase 9 — Reporting

The confirmed findings were documented with:

description
technical details
evidence
steps to reproduce
technical impact
business impact
recommended remediation
limitations
conclusion
Phase 10 — Final review

The final repository review checked for:

empty files
placeholders
real secrets
unnecessary archives
large files
broken formatting
repository structure
documentation quality
Finding validation criteria

A finding was marked as confirmed only when evidence supported it.

Validation sources included:

tool output
JSON report
screenshot
local command output
GitLab CI/CD artifact
manual review
Security gate approach

Some scan jobs used allow_failure: true.

This was intentional because the project contains controlled demo findings.

The purpose was to collect artifacts and review results without blocking the learning pipeline.

Conclusion

This methodology helped transform a basic demo application into a complete DevSecOps portfolio project with automated security scanning, evidence collection, confirmed findings, remediation guidance, and final reporting.
