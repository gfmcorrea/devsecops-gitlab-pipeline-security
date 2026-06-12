# Dependency Scanning — npm audit

## Overview

This file documents the dependency scanning stage of the DevSecOps pipeline.

Dependency scanning helps identify known vulnerabilities in third-party packages used by an application.

In this project, dependency scanning was performed with `npm audit`.

## Tool

Tool used:

```text
npm audit
```

Purpose:

```text
Identify known vulnerabilities in Node.js dependencies.
```

## Target

The dependency scan targeted the demo application located in:

```text
app/
```

Affected files:

```text
app/package.json
app/package-lock.json
```

## Local command

The local dependency scan was executed with:

```bash
npm --prefix app audit
```

JSON report command:

```bash
npm --prefix app audit --json > evidence/reports/dependency-check/npm-audit-report.json || true
```

## GitLab CI/CD command

The GitLab pipeline ran npm audit in the `dependency_scan` job.

The job used:

```text
node:18-bullseye
```

Main commands:

```bash
npm --prefix app audit
npm --prefix app audit --json > evidence/reports/dependency-check/ci-npm-audit-report.json || true
```

## Confirmed finding

npm audit confirmed one dependency scanning finding.

Finding:

```text
Finding 03 — Vulnerable Dependency
```

Observed summary:

```text
Low: 3
Moderate: 1
High: 4
Critical: 0
Total: 8
```

## Result

The scan identified vulnerable dependencies in the demo Node.js application.

This result was intentionally kept for learning and documentation.

## Evidence

Local evidence:

```text
evidence/reports/dependency-check/npm-audit-output.txt
evidence/reports/dependency-check/npm-audit-report.json
evidence/tool-outputs/10-npm-audit-summary.txt
evidence/tool-outputs/11-npm-audit-vulnerable-packages.txt
```

GitLab CI/CD evidence:

```text
evidence/reports/dependency-check/ci-npm-audit-output.txt
evidence/reports/dependency-check/ci-npm-audit-report.json
evidence/tool-outputs/ci-npm-audit-summary.txt
```

Screenshots:

```text
evidence/screenshots/dependency-scanning/
```

## Remediation idea

Recommended remediation:

```text
Review the npm audit report.
Identify vulnerable direct and transitive dependencies.
Update affected packages.
Avoid forced major upgrades without testing.
Run tests after updates.
Run npm audit again.
```

Useful commands:

```bash
npm --prefix app audit
npm --prefix app outdated
npm --prefix app update
npm --prefix app test
npm --prefix app audit
```

## Limitations

Dependency scanning identifies known vulnerable packages, but it does not automatically prove exploitability.

Manual review is required to understand:

```text
whether the vulnerable package is used
whether the vulnerable function is reachable
whether a fix is available
whether the issue matters in the current environment
```

## Conclusion

The dependency scanning stage successfully identified vulnerable Node.js dependencies and generated evidence for review.
