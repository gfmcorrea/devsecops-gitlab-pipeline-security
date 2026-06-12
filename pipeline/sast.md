# SAST — Semgrep

## Overview

This file documents the SAST stage of the DevSecOps pipeline.

SAST means Static Application Security Testing.

In this project, SAST was performed with Semgrep against the demo Node.js application.

## Tool

Tool used:

```text
Semgrep
```

Purpose:

```text
Identify insecure code patterns in application source code.
```

## Target

The SAST scan targeted:

```text
app/
```

Main affected file:

```text
app/server.js
```

## Local command

The local Semgrep scan was executed with Docker:

```bash
docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:latest semgrep scan --config p/javascript app
```

JSON report command:

```bash
docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:latest semgrep scan --config p/javascript app --json -o evidence/reports/semgrep/semgrep-report.json || true
```

## GitLab CI/CD command

The GitLab pipeline ran Semgrep in the `sast` job.

The job used:

```text
semgrep/semgrep:latest
```

Main command:

```bash
semgrep scan --config p/javascript app
```

## Confirmed finding

Semgrep confirmed one SAST finding.

Finding:

```text
Finding 01 — SAST Insecure Code Pattern
```

Affected file:

```text
app/server.js
```

Affected line:

```text
Line 41
```

Affected code pattern:

```javascript
eval(expression)
```

## Semgrep result

Semgrep detected request data flowing into `eval()`.

This is risky because `eval()` can execute dynamic JavaScript code.

If user-controlled input reaches `eval()`, it may create code execution risk.

## Evidence

Local evidence:

```text
evidence/reports/semgrep/semgrep-output.txt
evidence/reports/semgrep/semgrep-report.json
evidence/tool-outputs/12-semgrep-summary.txt
evidence/tool-outputs/13-semgrep-eval-evidence.txt
evidence/tool-outputs/14-semgrep-affected-code.txt
```

GitLab CI/CD evidence:

```text
evidence/reports/semgrep/ci-semgrep-output.txt
evidence/reports/semgrep/ci-semgrep-report.json
evidence/tool-outputs/ci-semgrep-eval-evidence.txt
```

Screenshots:

```text
evidence/screenshots/sast/
```

## Remediation idea

Recommended remediation:

```text
Remove eval().
Do not execute user-controlled input as code.
Use allowlisted operations.
Validate input.
Add tests.
Run Semgrep again after remediation.
```

Safer approach example:

```javascript
const allowedOperations = {
  add: (a, b) => a + b
};
```

## Limitations

SAST findings require manual review.

A SAST result does not always prove exploitability.

Manual review should check whether the affected code path is reachable and whether user input can control the dangerous function.

## Conclusion

The SAST stage successfully detected the controlled insecure code pattern in the demo application.
