# Rules of Engagement

## Purpose

This file defines the rules followed during this DevSecOps portfolio project.

The project was designed to be safe, controlled, and ethical.

## General rules

The project followed these rules:

```text
Only test the demo application created for this repository.
Do not scan external targets.
Do not use real secrets.
Do not use company code.
Do not use customer data.
Do not perform destructive actions.
Do not attempt persistence, evasion, phishing, or malware activity.
Review evidence before publishing.
Redact sensitive values if any appear.
Allowed activities

Allowed activities included:

Local application testing
Local Docker builds
Local security scans
GitLab CI/CD pipeline execution
SAST scanning
Secret scanning with fake demo values
Dependency scanning
Container image scanning
Documentation and evidence collection
Prohibited activities

The following activities were prohibited:

Testing third-party systems
Scanning public targets
Using real credentials
Publishing real secrets
Running destructive payloads
Uploading malware
Attempting persistence
Attempting evasion
Testing without authorization
Evidence handling

Evidence was handled with care.

Rules for evidence:

Use screenshots only when relevant.
Use redacted outputs when possible.
Do not publish real secrets.
Do not publish private tokens.
Do not publish customer data.
Do not commit Docker image tar files.
Review outputs before pushing to GitHub.
Secret handling

The project used a fake demo API key only for secret scanning validation.

The fake value is not a real credential.

Gitleaks reports were generated with redacted output.

Conclusion

All testing was performed in a safe and controlled environment.

The project was created only for learning, documentation, and portfolio demonstration.
