# Finding 02 — Secret Detection Fake Secret

Status: Confirmed

Severity: Medium

Tool used: Gitleaks

Pipeline stage: secret_scan

Affected file:

```text
app/server.js
```

Affected line:

```text
Line 9
```

Affected pattern:

```text
FAKE_DEMO_API_KEY
```

## Description

The secret scanning test detected a demo-only fake API key in the application source code.

The value is intentionally fake and was included only to validate the secret scanning stage of this DevSecOps project.

No real secrets, real credentials, company data, or third-party tokens were used in this repository.

## Technical details

The fake secret is located in:

```text
app/server.js
```

The detected pattern is:

```text
FAKE_DEMO_API_KEY
```

I used Gitleaks with a custom rule in:

```text
.gitleaks.toml
```

The custom rule was created to detect the demo-only fake secret in a safe and controlled way.

Gitleaks was executed with `--redact` to avoid exposing secret values in the output.

The local summary showed:

```text
Gitleaks findings summary
Total findings: 1
Rule: fake-demo-api-key
File: app/server.js
Line: 9
Secret: redacted
```

## Evidence

Evidence files:

```text
.gitleaks.toml
evidence/reports/gitleaks/gitleaks-output.txt
evidence/reports/gitleaks/gitleaks-report.json
evidence/tool-outputs/15-gitleaks-summary.txt
evidence/tool-outputs/16-gitleaks-affected-code.txt
```

Screenshots:

```text
evidence/screenshots/secret-scanning/01-gitleaks-text-output.png
evidence/screenshots/secret-scanning/02-gitleaks-summary.png
evidence/screenshots/secret-scanning/03-gitleaks-affected-code.png
```

Evidence status:

```text
Confirmed with local Gitleaks output.
```

## Steps to reproduce

1. Clone the repository.
2. Go to the project root.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
```

3. Run Gitleaks with the custom configuration.

```bash
docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest detect --source . --config .gitleaks.toml --redact --no-git
```

4. Generate the JSON report.

```bash
docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest detect --source . --config .gitleaks.toml --redact --no-git --report-format json --report-path evidence/reports/gitleaks/gitleaks-report.json || true
```

## Observed result

Gitleaks detected the demo-only fake API key pattern in:

```text
app/server.js
```

The detected rule was:

```text
fake-demo-api-key
```

The output was redacted before being saved as evidence.

## Technical impact

In a real project, hardcoded secrets in source code can expose sensitive credentials.

Possible technical risks include:

* leaked API keys
* unauthorized access to services
* credential reuse
* secret exposure through Git history
* increased risk if the repository becomes public

In this project, the detected value is fake and used only for safe validation.

## Business impact

If a real secret were committed to a repository, it could lead to unauthorized access, financial impact, incident response work, and loss of trust.

Secret scanning helps identify this issue early before code is merged or deployed.

## Recommended remediation

For a real exposed secret, recommended actions are:

1. Remove the secret from the source code.
2. Rotate or revoke the exposed credential.
3. Move the secret to a secure secret manager or CI/CD protected variable.
4. Review Git history for exposed values.
5. Add secret scanning to the CI/CD pipeline.
6. Add pre-commit checks when possible.
7. Educate developers to avoid committing secrets.

For this demo project, the fake secret was intentionally kept to validate the scanning workflow.

## Safer approach

Secrets should not be hardcoded in application files.

A safer approach is to use environment variables:

```javascript
const apiKey = process.env.DEMO_API_KEY;
```

In a real project, the value should come from:

```text
GitLab CI/CD protected variables
secret manager
environment-specific configuration
```

## Limitations

This finding is based on a controlled demo rule and a fake secret.

The goal was not to expose a real secret, but to show how a secret scanning tool can detect sensitive patterns in source code.

Secret scanning tools can produce false positives and false negatives, so manual review is still required.

## Conclusion

This finding was confirmed because Gitleaks detected the fake demo API key pattern in the application source code.

The result shows why secret scanning is important in a CI/CD pipeline and why real secrets must never be committed to repositories.
