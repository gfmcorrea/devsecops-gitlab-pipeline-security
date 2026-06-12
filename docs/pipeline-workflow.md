# Pipeline Workflow

## Overview

This file explains the GitLab CI/CD workflow used in this project.

The pipeline was designed to run security checks against a safe Node.js demo application and save evidence as artifacts.

## Pipeline file

The pipeline is defined in:

```text
.gitlab-ci.yml
```

## Workflow rules

The pipeline supports these execution sources:

```text
push
merge_request_event
web
```

The `web` source was added to allow manual pipeline execution from the GitLab UI.

Relevant workflow configuration:

```yaml
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_PIPELINE_SOURCE == "web"'
    - when: never
```

## Pipeline stages

The pipeline includes these stages:

```text
setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary
```

## Stage flow

The workflow follows this order:

```text
1. setup
2. sast
3. secret_scan
4. dependency_scan
5. container_build
6. container_scan
7. report_summary
```

## setup

The setup stage installs dependencies and validates the application.

Main actions:

```text
Check Node.js version
Check npm version
Install dependencies
Run npm test
Save setup artifacts
```

## sast

The SAST stage runs Semgrep against the application source code.

Main actions:

```text
Run Semgrep
Save text output
Save JSON report
Search for eval-related evidence
Save artifacts
```

## secret_scan

The secret scanning stage runs Gitleaks with a custom configuration.

Main actions:

```text
Run Gitleaks
Use the custom .gitleaks.toml file
Use redacted output
Save text output
Save JSON report
Save artifacts
```

## dependency_scan

The dependency scanning stage runs npm audit.

Main actions:

```text
Run npm audit
Save text output
Save JSON report
Generate vulnerability summary
Save artifacts
```

## container_build

The container build stage builds the Docker image.

Main actions:

```text
Run docker build
List the generated image
Save the image as a temporary pipeline artifact
```

The exported image tar file is used only inside the pipeline for Trivy scanning.

## container_scan

The container scanning stage runs Trivy against the image artifact.

Main actions:

```text
Run Trivy
Save text output
Save JSON report
Save artifacts
```

## report_summary

The report summary stage lists generated evidence files.

Main actions:

```text
Print completion message
List evidence files
Save final artifacts
```

## Pipeline result

The GitLab pipeline passed successfully.

Final result:

```text
Status: Passed
Jobs: 7
Branch: main
Pipeline source: web
```

## Notes

Some security scan jobs use `allow_failure: true` because this is a learning portfolio project with controlled demo findings.

In a real production environment, security gates should be tuned based on severity, confidence, exploitability, and fix availability.
