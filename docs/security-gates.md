# Security Gates

## Overview

This file explains the security gate strategy used in this project.

A security gate is a decision point in a CI/CD pipeline that determines whether the pipeline should continue or stop based on security results.

## Project approach

This project used a learning-focused security gate approach.

Some scan jobs were configured with:

```text
allow_failure: true
```

This allowed the pipeline to continue while still saving security reports and artifacts.

## Why allow_failure was used

The project contains controlled demo findings.

The goal was to:

```text
Run the tools
Collect artifacts
Review results
Document findings
Avoid blocking the whole learning pipeline
```

Because the findings were intentionally included for demonstration, blocking the pipeline immediately would make the workflow less useful for learning.

## Jobs using allow_failure

The following jobs used `allow_failure: true`:

```text
sast
secret_scan
dependency_scan
container_scan
```

## What this means

The pipeline can still complete even if a security tool finds an issue.

This does not mean the issue is ignored.

Instead, the result is saved as evidence and reviewed manually.

## Real-world security gate strategy

In a real company, security gates should be tuned carefully.

Recommended approach:

```text
Block on confirmed real secrets.
Block on critical vulnerabilities with available fixes.
Warn on high vulnerabilities during early rollout.
Review SAST findings manually before blocking.
Do not block every low severity finding.
Track exceptions with expiration dates.
```

## Factors to consider

A good security gate should consider:

```text
severity
confidence
exploitability
fix availability
asset exposure
business impact
environment
team maturity
```

## Example strict gate

A stricter Trivy gate could block on high and critical vulnerabilities:

```bash
trivy image --exit-code 1 --severity HIGH,CRITICAL image-name
```

## Example soft gate

A softer Trivy gate could report all findings but not block:

```bash
trivy image --exit-code 0 --severity LOW,MEDIUM,HIGH,CRITICAL image-name
```

## Secret scanning gate

Real secrets should usually block a pipeline.

A production policy could be:

```text
If a confirmed real secret is detected, fail the pipeline and rotate the secret.
```

## SAST gate

SAST findings may need manual triage before blocking.

A production policy could be:

```text
Block only on high-confidence, high-impact findings after validation.
```

## Dependency scanning gate

Dependency scanning gates should consider whether fixes are available.

A production policy could be:

```text
Block critical vulnerabilities with available fixes.
Warn on vulnerabilities without available fixes.
```

## Container scanning gate

Container scanning gates should focus on important risk first.

A production policy could be:

```text
Block critical vulnerabilities with available fixes in runtime images.
Warn on low and medium vulnerabilities.
```

## Conclusion

This project used soft gates for learning and evidence collection.

In a production environment, the gates should be stricter, risk-based, and aligned with engineering workflows.
