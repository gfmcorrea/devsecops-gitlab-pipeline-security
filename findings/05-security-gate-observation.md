# Finding 05 — Security Gate Observation

Status: Confirmed

Severity: Informational

Tool used: GitLab CI/CD

Pipeline stage:

```text
sast
secret_scan
dependency_scan
container_scan

Affected file:

.gitlab-ci.yml
Description

The GitLab CI/CD pipeline used security scanning stages with controlled allow_failure behavior.

This means the pipeline was able to run the security checks, save evidence, and continue execution even when the tools found demo security issues.

I used this approach because the project is a learning portfolio project with intentionally controlled findings.

Concept

A security gate is a pipeline rule that decides whether a build should continue or stop based on security results.

For example, a company may choose to block a deployment if:

A real secret is detected.
A critical vulnerability has an available fix.
A high confidence SAST finding is confirmed.
A container image contains critical vulnerabilities.

In this project, I used a softer gate approach because the goal was to collect evidence and document the results.

What was tested

The following jobs were configured with allow_failure: true:

sast
secret_scan
dependency_scan
container_scan

This allowed the pipeline to continue while still generating reports and artifacts.

Observed result

The GitLab pipeline completed successfully.

All 7 jobs passed:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary

The pipeline generated artifacts for:

Semgrep
Gitleaks
npm audit
Trivy
Evidence

Evidence files:

.gitlab-ci.yml
evidence/tool-outputs/24-final-pipeline-summary.txt
evidence/tool-outputs/25-final-findings-summary.txt

Screenshots:

evidence/screenshots/pipeline/02-gitlab-pipeline-started.png
evidence/screenshots/pipeline/03-gitlab-pipeline-jobs-visible.png
evidence/screenshots/pipeline/06-gitlab-all-jobs-passed.png

CI artifacts:

evidence/reports/semgrep/ci-semgrep-output.txt
evidence/reports/gitleaks/ci-gitleaks-output.txt
evidence/reports/dependency-check/ci-npm-audit-output.txt
evidence/reports/trivy/ci-trivy-output.txt

Evidence status:

Confirmed with real GitLab CI/CD pipeline execution.
Steps to reproduce
Open the GitLab project.
Go to:
Build > Pipelines
Run a new pipeline from the main branch.
Wait for all jobs to complete.
Review the job logs and artifacts.
Technical impact

Security gates help teams decide when security findings should block the software delivery process.

If gates are too strict too early, teams may ignore the pipeline because it becomes noisy.

If gates are too weak, serious issues may reach production.

A balanced approach is important.

Business impact

Security gates can help reduce risk before deployment.

They also help engineering and security teams create a repeatable review process.

For business teams, this can reduce emergency fixes, production incidents, and manual review effort.

Recommended security gate strategy

For a real company, I would tune the gates gradually.

Recommended approach:

Block on confirmed real secrets.
Block on critical vulnerabilities with available fixes.
Warn on high vulnerabilities during early rollout.
Review SAST findings manually before blocking.
Do not block on every low severity finding.
Track exceptions with expiration dates.
Why not every finding should break the pipeline

Not every finding has the same risk.

Some findings may be:

false positives
not reachable
low severity
without available fixes
only present in build-time packages
not exploitable in the deployed environment

Because of that, security gates should consider:

severity
confidence
exploitability
fix availability
business context
environment exposure
Limitations

This project used controlled demo findings.

The security gate behavior was designed for learning and evidence collection, not for production enforcement.

A real production pipeline would need stronger policies, approval flows, exception handling, and ownership.

Conclusion

This finding was confirmed because the GitLab CI/CD pipeline successfully ran all security stages and used allow_failure as a learning-focused security gate strategy.

This showed how security tools can be integrated into CI/CD without immediately blocking the whole workflow.
