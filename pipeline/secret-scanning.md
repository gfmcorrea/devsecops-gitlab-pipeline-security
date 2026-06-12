# Secret Scanning — Gitleaks

## Overview

This file documents the secret scanning stage of the DevSecOps pipeline.

Secret scanning helps identify hardcoded credentials, tokens, API keys, and sensitive values committed to source code.

In this project, secret scanning was performed with Gitleaks.

## Tool

Tool used:

```text
Gitleaks
```

Purpose:

```text
Detect secret-like patterns in the repository.
```

## Target

The scan targeted the repository files.

Main affected file:

```text
app/server.js
```

## Custom rule

This project used a custom Gitleaks rule defined in:

```text
.gitleaks.toml
```

The custom rule was created to detect a demo-only fake API key pattern:

```text
FAKE_DEMO_API_KEY
```

This value is fake and was included only for safe validation.

## Local command

The local Gitleaks scan was executed with Docker:

```bash
docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest detect --source . --config .gitleaks.toml --redact --no-git
```

JSON report command:

```bash
docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest detect --source . --config .gitleaks.toml --redact --no-git --report-format json --report-path evidence/reports/gitleaks/gitleaks-report.json || true
```

## GitLab CI/CD command

The GitLab pipeline ran Gitleaks in the `secret_scan` job.

The job used:

```text
zricethezav/gitleaks:latest
```

Main command:

```bash
gitleaks detect --source . --config .gitleaks.toml --redact --no-git
```

## Confirmed finding

Gitleaks confirmed one secret scanning finding.

Finding:

```text
Finding 02 — Secret Detection Fake Secret
```

Affected file:

```text
app/server.js
```

Affected line:

```text
Line 9
```

Detected pattern:

```text
FAKE_DEMO_API_KEY
```

## Result

Gitleaks detected the demo-only fake API key pattern.

The output was generated with redaction enabled:

```text
--redact
```

This helped avoid exposing secret values in reports.

## Evidence

Local evidence:

```text
evidence/reports/gitleaks/gitleaks-output.txt
evidence/reports/gitleaks/gitleaks-report.json
evidence/tool-outputs/15-gitleaks-summary.txt
evidence/tool-outputs/16-gitleaks-affected-code.txt
```

GitLab CI/CD evidence:

```text
evidence/reports/gitleaks/ci-gitleaks-output.txt
evidence/reports/gitleaks/ci-gitleaks-report.json
evidence/tool-outputs/ci-gitleaks-version.txt
```

Screenshots:

```text
evidence/screenshots/secret-scanning/
```

## Remediation idea

For a real secret, recommended remediation would be:

```text
Remove the secret from source code.
Rotate or revoke the exposed credential.
Move the value to a secret manager or protected CI/CD variable.
Review Git history.
Add secret scanning to CI/CD.
Use pre-commit secret scanning when possible.
```

Safer approach:

```javascript
const apiKey = process.env.DEMO_API_KEY;
```

## Limitations

This project used a controlled fake secret.

The goal was not to expose a real credential, but to validate the secret scanning workflow safely.

Secret scanning tools can produce false positives and false negatives, so findings should always be reviewed.

## Conclusion

The secret scanning stage successfully detected the controlled fake API key pattern and generated redacted evidence.
