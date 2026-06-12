# Lessons Learned

## Overview

I built this project to practice DevSecOps pipeline security using GitLab CI/CD and open-source tools.

The main goal was not only to run security tools, but also to understand how to collect evidence, review scan results, document findings, and explain remediation.

This project helped me understand how security can be added earlier in the development workflow.

## What I practiced

In this project, I practiced:

```text
Creating a safe demo application
Building a GitLab CI/CD pipeline
Running security checks locally
Running security checks in GitLab CI/CD
Saving scan outputs as evidence
Reviewing findings before marking them as confirmed
Writing remediation guidance
Documenting security gates
GitLab CI/CD

I learned how to create a pipeline with multiple stages:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary

I also learned that pipeline behavior depends on the pipeline source.

When I tried to run the pipeline manually from the GitLab UI, it did not run at first because the workflow: rules section did not allow the web pipeline source.

I fixed this by adding:

- if: '$CI_PIPELINE_SOURCE == "web"'

This was a useful lesson because a pipeline can be valid but still not run if the workflow rules do not allow that type of pipeline execution.

SAST with Semgrep

I used Semgrep to scan the application source code.

The demo application included an intentional insecure pattern:

eval(expression)

Semgrep detected request data flowing into eval() in app/server.js.

What I learned:

SAST can help detect insecure code patterns early.
SAST findings still need manual review.
A finding should only be confirmed when the tool output supports it.
It is important to save both text output and JSON reports as evidence.
Secret scanning with Gitleaks

I used Gitleaks to detect a demo-only fake API key.

I learned that fake secrets may not always match default scanner rules, so I created a custom Gitleaks rule for the project.

What I learned:

Secret scanning is important before code is merged.
Real secrets must never be committed.
Secret scanning output should be redacted before publishing.
Custom rules can be useful for controlled labs and internal patterns.

The Gitleaks output used redacted values, which helped keep the evidence safe to publish.

Dependency scanning with npm audit

I used npm audit to scan the Node.js dependencies.

The scan found:

3 low vulnerabilities
1 moderate vulnerability
4 high vulnerabilities
0 critical vulnerabilities
8 total vulnerabilities

What I learned:

Dependency scanning helps identify known vulnerable packages.
The result does not automatically prove exploitability.
Each advisory should be reviewed.
Updates should be tested before merging.
Forced upgrades can break applications.
Container scanning with Trivy

I used Trivy to scan the Docker image built from the demo application.

The scan found many vulnerabilities in the container image:

1478 low
3161 medium
1176 high
197 critical
6012 total

What I learned:

Container images can contain many vulnerabilities.
Base image choice matters a lot.
Large base images increase the attack surface.
Critical findings should be reviewed first.
A smaller or newer base image can reduce risk.

This was one of the most useful parts of the project because it showed how much risk can come from the base image, not only from application code.

Security gates

I learned that security gates need balance.

In this project, some jobs used:

allow_failure: true

This allowed the pipeline to continue while still saving security artifacts.

What I learned:

Not every finding should break the pipeline immediately.
A real secret should usually block the pipeline.
Critical vulnerabilities with available fixes may block the pipeline.
Low severity findings should usually be reviewed but not always block.
SAST findings may need manual triage before blocking.

For a real company, I would tune gates based on:

severity
confidence
exploitability
fix availability
business impact
environment exposure
Evidence handling

This project helped me understand that evidence is part of the security work.

I saved evidence as:

screenshots
tool outputs
JSON reports
pipeline artifacts
finding documents

I also reviewed the evidence before publishing.

What I learned:

Do not publish real secrets.
Use redacted outputs when possible.
Do not commit Docker image tar files.
Keep evidence organized by tool and stage.
Use clear filenames.
Document exactly what each evidence file proves.
Documentation

Writing the documentation helped me understand the project better.

I documented:

scope
rules of engagement
methodology
pipeline stages
tool usage
findings
remediation
lessons learned
career material

What I learned:

Good documentation makes a technical project easier to review.
Recruiters and interviewers need to understand what I built.
Security reports should be clear, evidence-based, and honest.
It is better to say what was confirmed than to exaggerate.
Main technical lessons

The main technical lessons from this project were:

How to build a GitLab CI/CD security pipeline
How to run Semgrep in CI/CD
How to run Gitleaks in CI/CD
How to run npm audit in CI/CD
How to build a Docker image in GitLab CI/CD
How to scan a Docker image with Trivy
How to save artifacts from each stage
How to troubleshoot workflow rules
How to document findings with evidence
Main professional lessons

The main professional lessons were:

Evidence matters.
Tool output needs review.
Findings should not be invented.
Security gates need tuning.
Clear documentation is part of DevSecOps.
A portfolio project should show process, not only screenshots.
Conclusion

This project helped me practice the full flow of a DevSecOps security pipeline.

I learned how to create a demo application, integrate security tools, run the pipeline in GitLab, collect evidence, document confirmed findings, and explain remediation.

This project improved my understanding of AppSec, DevSecOps, CI/CD security, and evidence-based reporting.
