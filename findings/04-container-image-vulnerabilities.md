# Finding 04 — Container Image Vulnerabilities

Status: Confirmed

Severity: Critical

Tool used: Trivy

Pipeline stage: container_scan

Affected image:

```text
devsecops-demo-app:local
```

Affected file:

```text
app/Dockerfile
```

Base image:

```text
node:18-bullseye
```

## Description

The container image scan identified vulnerabilities in the Docker image used by the demo application.

I built the application image locally and scanned it with Trivy. The scan found vulnerabilities across multiple severities, including critical and high severity issues.

This result shows why container image scanning is important in a DevSecOps pipeline.

## Technical details

The local image was built with:

```bash
docker build -t devsecops-demo-app:local app
```

The image was exported and scanned with Trivy:

```bash
docker save devsecops-demo-app:local -o evidence/tool-outputs/devsecops-demo-app-local.tar

docker run --rm -v "$PWD:/repo" -w /repo aquasec/trivy:latest image --input evidence/tool-outputs/devsecops-demo-app-local.tar --severity LOW,MEDIUM,HIGH,CRITICAL
```

The Trivy summary showed:

```text
Total vulnerabilities: 6012
LOW: 1478
MEDIUM: 3161
HIGH: 1176
CRITICAL: 197
```

Example findings included packages such as:

```text
apt
bash
binutils
```

The full evidence is saved in the Trivy reports and tool output files.

## Evidence

Evidence files:

```text
evidence/reports/trivy/trivy-output.txt
evidence/reports/trivy/trivy-report.json
evidence/tool-outputs/17-docker-build-output.txt
evidence/tool-outputs/18-docker-image-list.txt
evidence/tool-outputs/19-docker-container-running.txt
evidence/tool-outputs/20-container-curl-homepage.txt
evidence/tool-outputs/21-container-curl-health.txt
evidence/tool-outputs/22-trivy-summary.txt
evidence/tool-outputs/23-trivy-vulnerability-examples.txt
```

Screenshots:

```text
evidence/screenshots/container-scanning/01-docker-build-output.png
evidence/screenshots/container-scanning/02-docker-image-list.png
evidence/screenshots/container-scanning/03-docker-container-running.png
evidence/screenshots/container-scanning/04-container-curl-validation.png
evidence/screenshots/container-scanning/05-trivy-text-output.png
evidence/screenshots/container-scanning/06-trivy-summary.png
evidence/screenshots/container-scanning/07-trivy-vulnerability-examples.png
```

Evidence status:

```text
Confirmed with local Trivy output.
```

## Steps to reproduce

1. Clone the repository.
2. Go to the project root.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
```

3. Build the Docker image.

```bash
docker build -t devsecops-demo-app:local app
```

4. Run the container.

```bash
docker run --rm -d --name devsecops-demo-app-test -p 3001:3000 devsecops-demo-app:local
```

5. Validate the application.

```bash
curl -i http://localhost:3001/
curl -i http://localhost:3001/health
```

6. Stop the container.

```bash
docker stop devsecops-demo-app-test
```

7. Export the image.

```bash
docker save devsecops-demo-app:local -o evidence/tool-outputs/devsecops-demo-app-local.tar
```

8. Scan the image with Trivy.

```bash
docker run --rm -v "$PWD:/repo" -w /repo aquasec/trivy:latest image --input evidence/tool-outputs/devsecops-demo-app-local.tar --severity LOW,MEDIUM,HIGH,CRITICAL
```

## Observed result

Trivy identified vulnerabilities in the container image.

The scan summary showed:

```text
Total vulnerabilities: 6012
LOW: 1478
MEDIUM: 3161
HIGH: 1176
CRITICAL: 197
```

## Technical impact

Container image vulnerabilities can increase the attack surface of an application.

Possible technical risks include:

* vulnerable operating system packages
* outdated base image packages
* vulnerable runtime dependencies
* increased exposure if the container is deployed to production
* difficulty meeting security and compliance requirements

The real risk depends on whether the vulnerable package is reachable, exploitable, and exposed in the deployed environment.

## Business impact

If a container image with known critical vulnerabilities is deployed, it can increase the risk of compromise, delay releases, and create remediation work for engineering and security teams.

Container scanning helps identify these issues before deployment.

## Recommended remediation

Recommended actions:

1. Review the Trivy report.
2. Identify the most important critical and high severity vulnerabilities.
3. Update the base image.
4. Use a smaller and more secure base image when possible.
5. Rebuild the image.
6. Run Trivy again after remediation.
7. Add a security gate for critical vulnerabilities in the CI/CD pipeline.
8. Avoid shipping unnecessary packages in the final image.

Possible Dockerfile improvements:

```dockerfile
FROM node:20-bookworm-slim
```

or, if compatible with the application:

```dockerfile
FROM node:20-alpine
```

A more mature remediation approach would use:

* minimal base images
* multi-stage builds
* dependency updates
* regular base image rebuilds
* Trivy scanning in CI/CD
* image signing and SBOM generation in more mature environments

## Security gate recommendation

For a real CI/CD pipeline, I would not block all vulnerabilities immediately.

A practical security gate could be:

```text
Block on critical vulnerabilities with available fixes.
Warn on high vulnerabilities during the learning phase.
Review medium and low findings manually.
Avoid blocking the pipeline on findings that are not exploitable or have no available fix.
```

This prevents the pipeline from becoming noisy while still reducing important risk.

## Limitations

This finding is based on automated container image scanning.

Trivy reports known vulnerabilities from vulnerability databases. The result does not prove that every vulnerability is exploitable in this application.

Manual review is required to understand:

* whether the vulnerable package is used
* whether a fix is available
* whether the vulnerable component is reachable
* whether the vulnerability is relevant to the runtime environment

## Conclusion

This finding was confirmed because Trivy reported vulnerabilities in the demo container image.

The result shows why container scanning is useful in a DevSecOps pipeline. It helps identify risky base images and vulnerable packages before deployment.
