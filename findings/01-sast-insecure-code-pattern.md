# Finding 01 — SAST Insecure Code Pattern

Status: Confirmed

Severity: Medium

Tool used: Semgrep

Pipeline stage: sast

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

## Description

The SAST scan identified an insecure code pattern in the demo Node.js application.

The affected endpoint uses `eval()` to process a query parameter value. This pattern is intentionally included in the demo application for SAST testing and must not be used in real applications.

I used Semgrep to scan the application source code and saved the scan output as evidence.

## Technical details

The affected route is located in:

```text
app/server.js
```

The demo endpoint is:

```text
/demo/eval
```

The insecure pattern is:

```javascript
const result = eval(expression);
```

Semgrep reported one finding:

```text
Check ID: javascript.lang.security.audit.code-string-concat.code-string-concat
File: app/server.js
Line: 41
Severity: ERROR
```

Semgrep reported that data from an Express request flows into `eval()`.

This is dangerous because `eval()` can execute dynamic JavaScript code. If user-controlled input reaches `eval()`, it may lead to code execution risks.

In this project, the endpoint is only used in a safe local demo application to show how SAST can identify insecure code patterns.

## Evidence

Evidence files:

```text
evidence/reports/semgrep/semgrep-output.txt
evidence/reports/semgrep/semgrep-report.json
evidence/tool-outputs/12-semgrep-summary.txt
evidence/tool-outputs/13-semgrep-eval-evidence.txt
evidence/tool-outputs/14-semgrep-affected-code.txt
```

Screenshots:

```text
evidence/screenshots/sast/02-semgrep-text-output.png
evidence/screenshots/sast/03-semgrep-summary.png
evidence/screenshots/sast/04-semgrep-eval-evidence.png
evidence/screenshots/sast/05-semgrep-affected-code.png
```

Evidence status:

```text
Confirmed with local Semgrep output.
```

## Steps to reproduce

1. Clone the repository.
2. Go to the project root.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
```

3. Run Semgrep against the application folder.

```bash
docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:latest semgrep scan --config p/javascript app
```

4. Generate the JSON report.

```bash
docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:latest semgrep scan --config p/javascript app --json -o evidence/reports/semgrep/semgrep-report.json || true
```

## Observed result

Semgrep completed successfully and reported one finding.

The scan summary showed:

```text
Findings: 1
Rules run: 68
Targets scanned: 1
```

The finding pointed to:

```text
app/server.js:41
```

## Technical impact

Using `eval()` with user-controlled input can be dangerous because it may allow dynamic code execution.

Possible technical risks include:

* execution of unexpected JavaScript code
* application logic abuse
* increased attack surface
* harder code review and maintenance
* potential code injection if input is not controlled

## Business impact

If this pattern existed in a real application, it could increase the risk of application compromise and create security review concerns before deployment.

SAST helps detect this type of issue early in the development workflow before code reaches production.

## Recommended remediation

Recommended actions:

1. Remove the use of `eval()`.
2. Do not execute user-controlled input as code.
3. Replace dynamic evaluation with safe parsing or allowlisted operations.
4. Add input validation.
5. Add unit tests for safe behavior.
6. Run Semgrep again after the fix.

A safer approach for this demo endpoint would be to avoid accepting arbitrary expressions and only support predefined operations.

Example safer idea:

```javascript
const allowedOperations = {
  add: (a, b) => a + b
};
```

## Limitations

This finding is based on automated SAST output.

SAST tools can produce false positives and false negatives. Manual review is still required to confirm the real risk and understand whether the vulnerable code path is reachable.

In this project, the pattern was intentionally included for controlled learning and local validation.

## Conclusion

This finding was confirmed because Semgrep detected an insecure code pattern in the demo application.

The result shows how SAST can help identify risky code earlier in the CI/CD workflow.
