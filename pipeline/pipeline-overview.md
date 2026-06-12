# Pipeline Overview

This project uses GitLab CI/CD to run security checks against a safe demo Node.js application.

I built this pipeline to practice how security tools can be added to a CI/CD workflow.

The pipeline does not scan external targets. It only scans the local demo application and the Docker image built from it.

## Pipeline stages

The pipeline has these stages:

```text
setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary


Stage 1 — setup

The setup stage installs the Node.js dependencies and runs the basic test command.

Main actions:

npm install
npm list --depth=0
npm test

Artifacts saved:

ci-node-version.txt
ci-npm-version.txt
ci-npm-dependencies.txt
ci-npm-test-output.txt
Stage 2 — sast

The SAST stage runs Semgrep against the demo application source code.

Main action:

semgrep scan --config p/javascript app

Artifacts saved:

ci-semgrep-output.txt
ci-semgrep-report.json
ci-semgrep-eval-evidence.txt

This stage helps identify insecure code patterns, such as unsafe use of eval().

Stage 3 — secret_scan

The secret scanning stage runs Gitleaks.

Main action:

gitleaks detect --source . --config .gitleaks.toml --redact --no-git

Artifacts saved:

ci-gitleaks-output.txt
ci-gitleaks-report.json

This project uses a fake demo secret only for safe validation.

No real secrets are used.

Stage 4 — dependency_scan

The dependency scanning stage runs npm audit.

Main actions:

npm --prefix app audit
npm --prefix app audit --json

Artifacts saved:

ci-npm-audit-output.txt
ci-npm-audit-report.json
ci-npm-audit-summary.txt

This stage identifies known vulnerabilities in Node.js packages.

Stage 5 — container_build

The container build stage builds the Docker image for the demo application.

Main actions:

docker build
docker save

Artifacts saved:

ci-docker-build-output.txt
ci-docker-image-list.txt
devsecops-demo-app-ci.tar

The exported image tar file is used only as a temporary pipeline artifact for Trivy scanning.

Stage 6 — container_scan

The container scanning stage runs Trivy against the built image.

Main action:

trivy image --input devsecops-demo-app-ci.tar

Artifacts saved:

ci-trivy-output.txt
ci-trivy-report.json

This stage identifies known vulnerabilities in the container image.

Stage 7 — report_summary

The report summary stage prints a simple list of generated evidence files.

It reminds me to review scan results before confirming findings.

Security gate behavior

Some scan jobs use:

allow_failure: true

I used this because the project has controlled demo findings and the goal is to collect evidence first.

In a real company, I would tune the gates based on severity, confidence, fix availability, and business context.

A practical approach would be:

Block on confirmed real secrets.
Block on critical vulnerabilities with available fixes.
Warn on high vulnerabilities during early adoption.
Review SAST findings manually before blocking.
Do not block the pipeline on every low severity finding.
Evidence handling

The pipeline saves reports as artifacts.

Before publishing anything on GitHub, I review the outputs and make sure no real secrets, tokens, private data, or sensitive values are exposed.
