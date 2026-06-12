# Finding 03 — Vulnerable Dependency

Status: Confirmed

Severity: High

Tool used: npm audit

Pipeline stage: dependency_scan

Affected file:

```text
app/package.json
app/package-lock.json
```

Affected component:

```text
Node.js application dependencies
```

## Description

The dependency scan identified vulnerable packages in the demo Node.js application.

I used `npm audit` to review known vulnerabilities in the packages installed by the application. The scan found vulnerable dependencies with low, moderate, and high severity findings.

This issue was intentionally kept in the demo application to show how dependency scanning can be added to a DevSecOps workflow and documented with real evidence.

## Technical details

The local dependency scan was executed with:

```bash
npm --prefix app audit
```

The JSON report was generated with:

```bash
npm --prefix app audit --json
```

The scan summary showed:

```text
Low: 3
Moderate: 1
High: 4
Critical: 0
Total: 8
```

The affected packages should be reviewed in the generated evidence files:

```text
evidence/reports/dependency-check/npm-audit-output.txt
evidence/reports/dependency-check/npm-audit-report.json
evidence/tool-outputs/10-npm-audit-summary.txt
evidence/tool-outputs/11-npm-audit-vulnerable-packages.txt
```

## Evidence

Evidence files:

```text
evidence/reports/dependency-check/npm-audit-output.txt
evidence/reports/dependency-check/npm-audit-report.json
evidence/tool-outputs/10-npm-audit-summary.txt
evidence/tool-outputs/11-npm-audit-vulnerable-packages.txt
```

Screenshots:

```text
evidence/screenshots/dependency-scanning/01-npm-audit-output.png
evidence/screenshots/dependency-scanning/02-npm-audit-summary.png
evidence/screenshots/dependency-scanning/03-vulnerable-packages-summary.png
```

Evidence status:

```text
Confirmed with local npm audit output.
```

## Steps to reproduce

1. Clone the repository.
2. Go to the project root.
3. Install the application dependencies.

```bash
cd app
npm install
```

4. Return to the project root.

```bash
cd ..
```

5. Run npm audit.

```bash
npm --prefix app audit
```

6. Generate the JSON report.

```bash
npm --prefix app audit --json > evidence/reports/dependency-check/npm-audit-report.json || true
```

## Observed result

The dependency scan reported vulnerable packages in the demo application.

The summary showed:

```text
8 total vulnerabilities
3 low
1 moderate
4 high
0 critical
```

## Technical impact

Vulnerable dependencies may expose the application to known security issues, depending on how the affected package is used.

Possible technical risks include:

* use of packages with known CVEs
* vulnerable transitive dependencies
* insecure package versions
* higher attack surface if vulnerable code paths are reachable

The real impact must be validated by reviewing each advisory and checking whether the vulnerable function is actually used by the application.

## Business impact

If this happened in a real application, vulnerable dependencies could increase the risk of exploitation, create compliance issues, and reduce trust in the software delivery process.

For a company, dependency scanning helps identify these risks earlier in the development lifecycle.

## Recommended remediation

Recommended actions:

1. Review the npm audit report.
2. Identify the vulnerable direct and transitive dependencies.
3. Update affected packages to safe versions.
4. Rebuild the application.
5. Run `npm audit` again.
6. Confirm that the vulnerability count was reduced or resolved.
7. Review the application after updates to make sure nothing broke.

Do not blindly run forced updates in production projects without testing.

A safe remediation workflow would be:

```bash
npm --prefix app audit
npm --prefix app outdated
npm --prefix app update
npm --prefix app audit
npm --prefix app test
```

If a major version upgrade is required, it should be tested carefully before merging.

## Limitations

This finding is based on automated dependency scanning.

The scanner identifies known vulnerabilities from package advisory databases, but it does not prove exploitability in this specific application.

Manual review is still required to understand whether the vulnerable code path is reachable.

## Conclusion

This finding was confirmed because `npm audit` reported vulnerable dependencies in the demo application.

The result shows why dependency scanning is important in a CI/CD pipeline. It helps identify known vulnerable packages early and gives developers a clear path for remediation.
