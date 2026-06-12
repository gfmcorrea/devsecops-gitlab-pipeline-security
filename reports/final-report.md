# Final Report — DevSecOps Security Pipeline with GitLab CI/CD

## Executive summary

I built this project to practice DevSecOps pipeline security using GitLab CI/CD and open-source security tools.

The project used a small Node.js and Express demo application. I added security checks to the CI/CD pipeline and validated the results with real evidence.

The pipeline ran successfully in GitLab CI/CD and executed 7 jobs:

```text
setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
```

Final pipeline result:

```text
Status: Passed
Branch: main
Pipeline source: web
Jobs executed: 7
Jobs passed: 7
```

The project confirmed 5 findings or observations:

```text
Finding 01 — SAST Insecure Code Pattern
Finding 02 — Secret Detection Fake Secret
Finding 03 — Vulnerable Dependency
Finding 04 — Container Image Vulnerabilities
Finding 05 — Security Gate Observation
```

All findings were documented with evidence from local testing and GitLab CI/CD artifacts.

## Scope

The scope of this project was limited to the safe demo application created for this repository.

In scope:

```text
Local Node.js demo application
Application source code
Application dependencies
Docker image built from the demo app
GitLab CI/CD pipeline
Pipeline artifacts and reports
```

Out of scope:

```text
External targets
Third-party systems
Real company code
Real secrets
Production environments
Cloud infrastructure
Phishing
Malware
Persistence
Evasion
Destructive actions
```

## Environment

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

## Methodology

The methodology followed a simple DevSecOps workflow:

```text
Create a safe demo application.
Add controlled demo security issues.
Run tools locally first.
Collect evidence from local scans.
Create a GitLab CI/CD pipeline.
Run the same security checks in CI/CD.
Download and review artifacts.
Document confirmed findings.
Write remediation guidance.
Review evidence before publishing.
```

The project followed an evidence-based approach.

A finding was only marked as confirmed when the scan output or manual validation supported it.

## Pipeline overview

The pipeline was defined in:

```text
.gitlab-ci.yml
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

The pipeline used open-source tools and did not require GitLab Ultimate security features.

## Tools used

### Semgrep

Purpose:

```text
Static application security testing.
```

Used to detect insecure code patterns in the Node.js application.

Confirmed result:

```text
Semgrep detected user-controlled request data flowing into eval() in app/server.js.
```

### Gitleaks

Purpose:

```text
Secret scanning.
```

Used to detect a fake demo API key pattern.

Confirmed result:

```text
Gitleaks detected the demo-only fake API key pattern in app/server.js.
The output was redacted.
```

### npm audit

Purpose:

```text
Dependency scanning.
```

Used to identify known vulnerabilities in Node.js packages.

Confirmed result:

```text
npm audit found 8 vulnerabilities.
```

### Docker

Purpose:

```text
Container image build.
```

Used to build the demo application image.

### Trivy

Purpose:

```text
Container image vulnerability scanning.
```

Used to scan the Docker image built from the demo app.

Confirmed result:

```text
Trivy found vulnerabilities in the container image.
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

Affected file:

```text
app/server.js
```

Affected line:

```text
Line 41
```

Summary:

```text
Semgrep detected data from an Express request flowing into eval().
```

Evidence:

```text
evidence/reports/semgrep/
evidence/tool-outputs/12-semgrep-summary.txt
evidence/tool-outputs/13-semgrep-eval-evidence.txt
evidence/screenshots/sast/
findings/01-sast-insecure-code-pattern.md
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

Affected file:

```text
app/server.js
```

Affected line:

```text
Line 9
```

Summary:

```text
Gitleaks detected a demo-only fake API key pattern.
```

Evidence:

```text
evidence/reports/gitleaks/
evidence/tool-outputs/15-gitleaks-summary.txt
evidence/tool-outputs/16-gitleaks-affected-code.txt
evidence/screenshots/secret-scanning/
findings/02-secret-detection-fake-secret.md
```

No real secret was used.

The Gitleaks output was redacted.

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

Affected files:

```text
app/package.json
app/package-lock.json
```

Summary:

```text
npm audit found vulnerable dependencies in the demo application.
```

Observed result:

```text
Low: 3
Moderate: 1
High: 4
Critical: 0
Total: 8
```

Evidence:

```text
evidence/reports/dependency-check/
evidence/tool-outputs/10-npm-audit-summary.txt
evidence/tool-outputs/11-npm-audit-vulnerable-packages.txt
evidence/screenshots/dependency-scanning/
findings/03-vulnerable-dependency.md
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

Affected image:

```text
devsecops-demo-app:local
```

Affected file:

```text
app/Dockerfile
```

Base image:

```text
node:18-bullseye
```

Summary:

```text
Trivy found vulnerabilities in the container image.
```

Observed result:

```text
Low: 1478
Medium: 3161
High: 1176
Critical: 197
Total: 6012
```

Evidence:

```text
evidence/reports/trivy/
evidence/tool-outputs/22-trivy-summary.txt
evidence/tool-outputs/23-trivy-vulnerability-examples.txt
evidence/screenshots/container-scanning/
findings/04-container-image-vulnerabilities.md
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
The jobs still generated artifacts and allowed manual review.
```

Evidence:

```text
.gitlab-ci.yml
evidence/tool-outputs/24-final-pipeline-summary.txt
evidence/tool-outputs/25-final-findings-summary.txt
evidence/screenshots/pipeline/
findings/05-security-gate-observation.md
```

## GitLab CI/CD result

The GitLab pipeline passed successfully.

Pipeline result:

```text
Status: Passed
Jobs: 7
Branch: main
Pipeline source: web
```

Jobs:

```text
setup: passed
sast: passed
secret_scan: passed
dependency_scan: passed
container_build: passed
container_scan: passed
report_summary: passed
```

The pipeline generated artifacts for:

```text
Semgrep
Gitleaks
npm audit
Trivy
Docker build output
Pipeline summary
```

## Evidence handling

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

Before publishing evidence, I reviewed the outputs to avoid exposing sensitive values.

The Gitleaks reports used redacted output.

Exported Docker image tar files were not committed to the repository.

## Security gates

Some security scan jobs used:

```text
allow_failure: true
```

This was intentional because the project contains controlled demo findings.

The goal was to collect evidence and review the results without blocking the entire pipeline during the learning phase.

In a real company, I would tune the gates gradually.

Recommended gate strategy:

```text
Block on confirmed real secrets.
Block on critical vulnerabilities with available fixes.
Warn on high vulnerabilities during early adoption.
Review SAST findings manually before blocking.
Do not block every low severity finding.
Track exceptions with expiration dates.
```

## Remediation summary

Recommended remediation themes:

```text
Remove unsafe eval usage.
Do not commit secrets to source code.
Use environment variables or a secret manager.
Update vulnerable dependencies.
Use smaller and more secure base images.
Scan container images in CI/CD.
Tune security gates based on severity, confidence, and fix availability.
```

More detailed remediation guidance is documented in:

```text
remediation/remediation-summary.md
```

## Limitations

This project used a controlled demo application.

The results are useful for learning and portfolio demonstration, but they are not the same as a real production security review.

Limitations:

```text
The application is intentionally simple.
Some findings are controlled demo issues.
Automated tools may produce false positives or false negatives.
Trivy results require manual review to understand real exploitability.
npm audit results do not automatically prove runtime exploitability.
The pipeline does not deploy to production.
```

## Lessons learned

I learned how to build a DevSecOps pipeline step by step.

Main lessons:

```text
Security tools need tuning.
Evidence matters.
Pipeline artifacts are useful for review.
Not every finding should break the pipeline immediately.
Secret scanning outputs must be redacted.
Container images can contain many vulnerabilities if the base image is large or outdated.
Documentation is part of the security work.
```

## Conclusion

This project successfully demonstrated a DevSecOps security pipeline using GitLab CI/CD and open-source tools.

The pipeline ran SAST, secret scanning, dependency scanning, Docker build, and container image scanning.

The final GitLab pipeline passed with all 7 jobs completed successfully.

The project produced real evidence, confirmed findings, and remediation guidance.

This project helped me practice practical DevSecOps skills that are relevant for Junior AppSec, Junior DevSecOps, Junior Security Engineer, Junior Pentester, and Security Analyst roles.
