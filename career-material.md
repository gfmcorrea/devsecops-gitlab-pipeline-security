# Career Material — DevSecOps Security Pipeline with GitLab CI/CD

## Short resume bullet

Built a DevSecOps security pipeline using GitLab CI/CD, Semgrep, Gitleaks, npm audit, Docker, and Trivy to automate SAST, secret scanning, dependency scanning, and container image scanning for a safe Node.js demo application. Documented confirmed findings, remediation guidance, security gate behavior, CI/CD artifacts, and evidence-based results.

## Resume bullets

- Built a GitLab CI/CD security pipeline for a Node.js demo application using open-source DevSecOps tools.
- Integrated Semgrep for SAST, Gitleaks for secret scanning, npm audit for dependency scanning, and Trivy for container image scanning.
- Created a Dockerized demo application and validated it locally before running CI/CD scans.
- Collected and organized security evidence, including screenshots, JSON reports, tool outputs, and pipeline artifacts.
- Documented confirmed findings with technical impact, business impact, remediation guidance, limitations, and evidence references.
- Configured learning-focused security gates using `allow_failure` and documented how they would be tuned in a real environment.
- Troubleshot GitLab CI/CD workflow rules to support manual pipeline execution from the GitLab UI.

## LinkedIn project description

I built a DevSecOps security pipeline project using GitLab CI/CD and open-source security tools.

For this project, I created a safe Node.js/Express demo application and integrated security checks into the CI/CD workflow:

```text
Semgrep for SAST
Gitleaks for secret scanning
npm audit for dependency scanning
Docker for image build
Trivy for container image scanning

The pipeline ran successfully in GitLab with 7 jobs:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary

I collected real evidence from local scans and GitLab CI/CD artifacts, documented confirmed findings, wrote remediation guidance, and explained the security gate behavior.

This project helped me practice AppSec, DevSecOps, CI/CD security, container security, evidence handling, and technical reporting.

GitHub:

https://github.com/gfmcorrea/devsecops-gitlab-pipeline-security
GitHub repository description

DevSecOps security pipeline using GitLab CI/CD, Semgrep, Gitleaks, npm audit, Docker, and Trivy for SAST, secret scanning, dependency scanning, and container image scanning.

GitHub About section

Description:

DevSecOps security pipeline with GitLab CI/CD, Semgrep, Gitleaks, npm audit, Docker, and Trivy.

Topics:

devsecops
gitlab-ci
application-security
appsec
sast
secret-scanning
dependency-scanning
container-security
trivy
semgrep
gitleaks
docker
security-pipeline
cybersecurity-portfolio
Interview explanation

I built this project to practice how security checks can be integrated into a CI/CD pipeline.

I created a small Node.js/Express demo application and added a GitLab CI/CD pipeline with multiple security stages.

The pipeline runs:

Semgrep for SAST
Gitleaks for secret scanning
npm audit for dependency scanning
Docker build
Trivy for container image scanning

I first validated the tools locally, collected evidence, and then executed the pipeline in GitLab CI/CD.

The final GitLab pipeline passed with 7 jobs.

I documented the confirmed findings, including an insecure eval() pattern, a fake demo secret, vulnerable dependencies, container image vulnerabilities, and security gate behavior.

One important thing I learned was that running tools is only part of DevSecOps. The other part is reviewing results, saving evidence, documenting limitations, and defining when a security issue should block the pipeline.

Technical interview talking points

If asked what I built:

I built a GitLab CI/CD DevSecOps pipeline for a safe Node.js demo application.

If asked what tools I used:

I used Semgrep, Gitleaks, npm audit, Docker, and Trivy.

If asked what the pipeline did:

It installed dependencies, ran SAST, scanned for secrets, checked vulnerable dependencies, built a Docker image, scanned the image, and saved reports as artifacts.

If asked what findings were confirmed:

Semgrep confirmed an insecure eval pattern.
Gitleaks confirmed a fake demo secret.
npm audit confirmed vulnerable dependencies.
Trivy confirmed container image vulnerabilities.
The pipeline confirmed security gate behavior with allow_failure.

If asked why I used allow_failure:

Because this is a learning portfolio project with controlled findings. I wanted the pipeline to continue and generate artifacts for review. In a real company, I would tune security gates based on severity, confidence, exploitability, and fix availability.

If asked what I would improve:

I would remove eval, use environment variables or protected CI/CD variables for secrets, update dependencies, switch to a smaller and newer base image, add stronger security gates, and add SBOM generation.
Skills list for LinkedIn
Application Security
DevSecOps
GitLab CI/CD
CI/CD Security
Secure SDLC
SAST
Secret Scanning
Dependency Scanning
Container Security
Docker
Trivy
Semgrep
Gitleaks
npm audit
Security Automation
Security Gates
Vulnerability Management
Evidence-Based Reporting
Security Documentation
Technical Writing
Git
GitHub
Linux
Node.js
Project title for LinkedIn
DevSecOps Security Pipeline with GitLab CI/CD
Short project summary
Built and documented a GitLab CI/CD security pipeline for a Node.js demo application using Semgrep, Gitleaks, npm audit, Docker, and Trivy. The project includes confirmed findings, remediation guidance, CI/CD artifacts, screenshots, and evidence-based reporting.

Recruiter-friendly explanation

This project shows that I can build a basic DevSecOps workflow and document it clearly.

It includes practical work with CI/CD, AppSec tools, Docker, container scanning, dependency scanning, secret scanning, and security reporting.

The project was designed as a safe portfolio lab, with no real secrets, no company code, and no external targets.
