## Phase 1 — Local Repository Validation

These commands were used to validate the local repository structure and Git status.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
pwd
ls -la
tree -a -L 2
git status
test -f .gitlab-ci.yml && echo ".gitlab-ci.yml exists" || echo ".gitlab-ci.yml missing"
test -f .gitignore && echo ".gitignore exists" || echo ".gitignore missing"
test -f app/package.json && echo "package.json exists" || echo "package.json missing"
test -f app/server.js && echo "server.js exists" || echo "server.js missing"
test -f app/Dockerfile && echo "Dockerfile exists" || echo "Dockerfile missing"
tree -a -L 2 | tee evidence/tool-outputs/01-project-structure.txt
git status | tee evidence/tool-outputs/02-git-status-after-gitignore.txt

Evidence saved:

evidence/tool-outputs/01-project-structure.txt
evidence/tool-outputs/02-git-status-after-gitignore.txt
evidence/screenshots/environment/01-project-structure-and-git-status.png



## Phase 2 — Local Demo Application Validation

These commands were used to validate Node.js, npm, install the application dependencies, run the demo app locally, and test the local endpoints.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
pwd
node -v
npm -v
```

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security/app
npm install
npm list --depth=0
npm test
npm start
```

The application was tested locally using a browser and curl.

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/health
curl -i http://localhost:3000/demo/lodash
curl -i "http://localhost:3000/demo/eval?expression=1%2B1"
```

Evidence saved:

```text
evidence/tool-outputs/03-node-npm-version.txt
evidence/tool-outputs/04-npm-dependencies-installed.txt
evidence/tool-outputs/05-npm-test-output.txt
evidence/tool-outputs/06-curl-homepage.txt
evidence/tool-outputs/07-curl-health.txt
evidence/tool-outputs/08-curl-lodash.txt
evidence/tool-outputs/09-curl-eval-demo.txt

evidence/screenshots/environment/02-node-npm-version.png
evidence/screenshots/environment/03-npm-install-and-test.png
evidence/screenshots/environment/04-npm-start-running.png
evidence/screenshots/environment/05-app-homepage-browser.png
evidence/screenshots/environment/06-app-health-browser.png
evidence/screenshots/environment/07-app-lodash-endpoint.png
evidence/screenshots/environment/08-app-eval-demo-endpoint.png
evidence/screenshots/environment/09-curl-endpoints.png
```

Notes:

The demo application was validated locally before running the CI/CD security pipeline.

The `/demo/eval` endpoint is intentionally included as a demo-only insecure code pattern for SAST testing. I only used a simple `1+1` expression during local validation.

The dependency versions were not fixed during this phase because the project needs controlled dependency findings for the dependency scanning stage.



## Phase 3 — Local Dependency Scanning with npm audit

These commands were used to run a local dependency scan against the demo Node.js application.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
git status

mkdir -p evidence/reports/dependency-check
mkdir -p evidence/screenshots/dependency-scanning
mkdir -p evidence/tool-outputs

npm --prefix app audit 2>&1 | tee evidence/reports/dependency-check/npm-audit-output.txt
npm --prefix app audit --json > evidence/reports/dependency-check/npm-audit-report.json || true

node -e "const r=require('./evidence/reports/dependency-check/npm-audit-report.json'); console.log('npm audit vulnerability summary'); console.log(JSON.stringify(r.metadata.vulnerabilities, null, 2));" | tee evidence/tool-outputs/10-npm-audit-summary.txt
```

Evidence saved:

```text
evidence/reports/dependency-check/npm-audit-output.txt
evidence/reports/dependency-check/npm-audit-report.json
evidence/tool-outputs/10-npm-audit-summary.txt
evidence/screenshots/dependency-scanning/01-npm-audit-output.png
evidence/screenshots/dependency-scanning/02-npm-audit-output.png
evidence/screenshots/dependency-scanning/02-npm-audit-summary.png
evidence/screenshots/dependency-scanning/03-vulnerable-packages-summary.png
```

Notes:

I did not run `npm audit fix` during this phase because the goal was to collect dependency scanning evidence first.

The vulnerable dependencies are part of the controlled demo application used for this portfolio project.

A dependency finding should only be marked as confirmed after reviewing the real `npm audit` output.




## Phase 4 — Local SAST with Semgrep

These commands were used to run a local SAST scan against the demo Node.js application using Semgrep.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
git status

docker --version
docker info

mkdir -p evidence/reports/semgrep
mkdir -p evidence/screenshots/sast
mkdir -p evidence/tool-outputs

docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:latest semgrep scan --config p/javascript app 2>&1 | tee evidence/reports/semgrep/semgrep-output.txt

docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:latest semgrep scan --config p/javascript app --json -o evidence/reports/semgrep/semgrep-report.json || true

node -e "const r=require('./evidence/reports/semgrep/semgrep-report.json'); const results=r.results || []; console.log('Semgrep findings summary'); console.log('Total findings: ' + results.length); for (const item of results) { console.log('- ' + item.check_id + ' | ' + item.path + ':' + item.start.line + ' | ' + item.extra.message); }" | tee evidence/tool-outputs/12-semgrep-summary.txt

node -e "const r=require('./evidence/reports/semgrep/semgrep-report.json'); const results=r.results || []; for (const item of results) { console.log('Semgrep eval finding evidence'); console.log('Check ID: ' + item.check_id); console.log('File: ' + item.path); console.log('Line: ' + item.start.line); console.log('Severity: ' + item.extra.severity); console.log('Message: ' + item.extra.message); console.log('CWE: ' + ((item.extra.metadata.cwe || []).join(', '))); console.log('OWASP: ' + ((item.extra.metadata.owasp || []).join(', '))); }" | tee evidence/tool-outputs/13-semgrep-eval-evidence.txt

nl -ba app/server.js | sed -n '35,45p' | tee evidence/tool-outputs/14-semgrep-affected-code.txt
```

Evidence saved:

```text
evidence/reports/semgrep/semgrep-output.txt
evidence/reports/semgrep/semgrep-report.json
evidence/tool-outputs/12-semgrep-summary.txt
evidence/tool-outputs/13-semgrep-eval-evidence.txt
evidence/tool-outputs/14-semgrep-affected-code.txt

evidence/screenshots/sast/02-semgrep-text-output.png
evidence/screenshots/sast/03-semgrep-summary.png
evidence/screenshots/sast/04-semgrep-eval-evidence.png
evidence/screenshots/sast/05-semgrep-affected-code.png
```

Notes:

I used Semgrep to run a local SAST scan against the demo Node.js application.

The application contains a demo-only insecure code pattern using `eval()` in `app/server.js`.

Semgrep confirmed one finding in `app/server.js`, where data from an Express request flows into `eval()`.

This finding was marked as confirmed because the result is supported by the real Semgrep output.




## Phase 5 — Local Secret Scanning with Gitleaks

These commands were used to run a local secret scanning test against the demo repository using Gitleaks.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
git status

mkdir -p evidence/reports/gitleaks
mkdir -p evidence/screenshots/secret-scanning
mkdir -p evidence/tool-outputs

docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest detect --source . --config .gitleaks.toml --redact --no-git --verbose 2>&1 | tee evidence/reports/gitleaks/gitleaks-output.txt

docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest detect --source . --config .gitleaks.toml --redact --no-git --report-format json --report-path evidence/reports/gitleaks/gitleaks-report.json || true

node -e "const r=require('./evidence/reports/gitleaks/gitleaks-report.json'); console.log('Gitleaks findings summary'); console.log('Total findings: ' + r.length); for (const item of r) { console.log('- Rule: ' + (item.RuleID || item.RuleId || item.ruleID)); console.log('  Description: ' + item.Description); console.log('  File: ' + item.File); console.log('  Line: ' + item.StartLine); console.log('  Secret: redacted'); }" | tee evidence/tool-outputs/15-gitleaks-summary.txt

nl -ba app/server.js | sed -n '5,12p' | tee evidence/tool-outputs/16-gitleaks-affected-code.txt
```

Evidence saved:

```text
.gitleaks.toml
evidence/reports/gitleaks/gitleaks-output.txt
evidence/reports/gitleaks/gitleaks-report.json
evidence/tool-outputs/15-gitleaks-summary.txt
evidence/tool-outputs/16-gitleaks-affected-code.txt

evidence/screenshots/secret-scanning/01-gitleaks-text-output.png
evidence/screenshots/secret-scanning/02-gitleaks-summary.png
evidence/screenshots/secret-scanning/03-gitleaks-affected-code.png
```

Notes:

I used Gitleaks to scan the repository for secrets.

The project uses a fake demo API key only for secret scanning validation.

The fake value is not a real credential and must never be used in production.

I used a custom Gitleaks rule to detect the demo-only fake secret in a controlled way.

The Gitleaks output was generated with `--redact` to avoid exposing secret values in reports.

Gitleaks confirmed one finding in `app/server.js` on line 9.




## Phase 6 — Local Docker Build and Trivy Container Scanning

These commands were used to build the demo application container image locally, run the container, validate the application, and scan the image with Trivy.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
git status

mkdir -p evidence/reports/trivy
mkdir -p evidence/screenshots/container-scanning
mkdir -p evidence/tool-outputs

docker build -t devsecops-demo-app:local app 2>&1 | tee evidence/tool-outputs/17-docker-build-output.txt

docker images | grep devsecops-demo-app | tee evidence/tool-outputs/18-docker-image-list.txt

docker run --rm -d --name devsecops-demo-app-test -p 3001:3000 devsecops-demo-app:local

docker ps | grep devsecops-demo-app-test | tee evidence/tool-outputs/19-docker-container-running.txt

curl -i http://localhost:3001/ | tee evidence/tool-outputs/20-container-curl-homepage.txt

curl -i http://localhost:3001/health | tee evidence/tool-outputs/21-container-curl-health.txt

docker stop devsecops-demo-app-test

docker save devsecops-demo-app:local -o evidence/tool-outputs/devsecops-demo-app-local.tar

docker run --rm -v "$PWD:/repo" -w /repo aquasec/trivy:latest image --input evidence/tool-outputs/devsecops-demo-app-local.tar --severity LOW,MEDIUM,HIGH,CRITICAL 2>&1 | tee evidence/reports/trivy/trivy-output.txt

docker run --rm -v "$PWD:/repo" -w /repo aquasec/trivy:latest image --input evidence/tool-outputs/devsecops-demo-app-local.tar --severity LOW,MEDIUM,HIGH,CRITICAL --format json --output evidence/reports/trivy/trivy-report.json || true

node -e "const r=require('./evidence/reports/trivy/trivy-report.json'); const counts={LOW:0,MEDIUM:0,HIGH:0,CRITICAL:0}; let total=0; for (const result of r.Results || []) { for (const v of result.Vulnerabilities || []) { counts[v.Severity]=(counts[v.Severity]||0)+1; total++; } } console.log('Trivy vulnerability summary'); console.log('Total vulnerabilities: ' + total); console.log(JSON.stringify(counts, null, 2));" | tee evidence/tool-outputs/22-trivy-summary.txt

node -e "const r=require('./evidence/reports/trivy/trivy-report.json'); const vulns=[]; for (const result of r.Results || []) { for (const v of result.Vulnerabilities || []) { vulns.push({target: result.Target, id: v.VulnerabilityID, pkg: v.PkgName, installed: v.InstalledVersion, fixed: v.FixedVersion || 'not listed', severity: v.Severity, title: v.Title || ''}); } } console.log('Trivy top vulnerability examples'); for (const v of vulns.slice(0,20)) { console.log('- ' + v.severity + ' | ' + v.id + ' | ' + v.pkg + ' | installed: ' + v.installed + ' | fixed: ' + v.fixed); }" | tee evidence/tool-outputs/23-trivy-vulnerability-examples.txt
```

Evidence saved:

```text
app/.dockerignore
evidence/reports/trivy/trivy-output.txt
evidence/reports/trivy/trivy-report.json
evidence/tool-outputs/17-docker-build-output.txt
evidence/tool-outputs/18-docker-image-list.txt
evidence/tool-outputs/19-docker-container-running.txt
evidence/tool-outputs/20-container-curl-homepage.txt
evidence/tool-outputs/21-container-curl-health.txt
evidence/tool-outputs/22-trivy-summary.txt
evidence/tool-outputs/23-trivy-vulnerability-examples.txt

evidence/screenshots/container-scanning/01-docker-build-output.png
evidence/screenshots/container-scanning/02-docker-image-list.png
evidence/screenshots/container-scanning/03-docker-container-running.png
evidence/screenshots/container-scanning/04-container-curl-validation.png
evidence/screenshots/container-scanning/05-trivy-text-output.png
evidence/screenshots/container-scanning/06-trivy-summary.png
evidence/screenshots/container-scanning/07-trivy-vulnerability-examples.png
```

Notes:

I built the demo application as a Docker image and validated that it worked locally.

I used Trivy to scan the image for known vulnerabilities.

The scan found 6012 total vulnerabilities: 1478 low, 3161 medium, 1176 high, and 197 critical.

This finding was marked as confirmed because the result is supported by the real Trivy output.

The exported Docker image tar file was used for local scanning and should not be committed to GitHub.




## Phase 7 — GitLab CI/CD Pipeline Configuration

These commands were used to review and update the GitLab CI/CD pipeline file.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security
git status
sed -n '1,260p' .gitlab-ci.yml
git diff -- .gitlab-ci.yml

Files updated:

.gitlab-ci.yml
appendices/commands-used.md

Notes:

I updated the GitLab CI/CD pipeline to include the following stages:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary

The pipeline uses open-source tools:

Semgrep for SAST
Gitleaks for secret scanning
npm audit for dependency scanning
Docker for image build
Trivy for container image scanning

The security scan jobs save reports as GitLab artifacts.

Some security scan jobs use allow_failure: true because this is a learning portfolio project with controlled demo findings.

In a real company, security gates should be tuned carefully before blocking deployments.




## Phase 8 — GitLab CI/CD Pipeline Execution

These steps were used to run the real GitLab CI/CD pipeline.

GitLab project:

```text
https://gitlab.com/gfmcorrea/devsecops-gitlab-pipeline-security

Pipeline result:

Status: Passed
Jobs: 7
Branch: main
Pipeline source: web

Jobs executed:

setup
sast
secret_scan
dependency_scan
container_build
container_scan
report_summary

All jobs passed successfully.

The pipeline was first blocked by the workflow: rules configuration because manual pipelines from the GitLab UI use the web pipeline source.

I updated the workflow rules to allow manual pipeline runs:

workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_PIPELINE_SOURCE == "web"'
    - when: never

Evidence captured:

evidence/screenshots/gitlab/02-gitlab-project-imported.png
evidence/screenshots/gitlab/03-gitlab-ci-yml-visible.png
evidence/screenshots/gitlab/04-gitlab-runner-available.png
evidence/screenshots/pipeline/02-gitlab-pipeline-started.png
evidence/screenshots/pipeline/03-gitlab-pipeline-jobs-visible.png
evidence/screenshots/pipeline/04-gitlab-all-jobs-passed.png

CI artifacts downloaded and reviewed:

evidence/reports/semgrep/
evidence/reports/gitleaks/
evidence/reports/dependency-check/
evidence/reports/trivy/
evidence/tool-outputs/

Notes:

The GitLab pipeline successfully ran the security checks using open-source tools.

The scan outputs were saved as job artifacts.

Before publishing evidence, I reviewed the outputs and avoided committing exported Docker image tar files.




## Phase 9 — Final Result Summaries and Security Gate Documentation

These files were updated to document the final GitLab CI/CD results and the security gate behavior.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security

nano evidence/tool-outputs/24-final-pipeline-summary.txt
nano evidence/tool-outputs/25-final-findings-summary.txt
nano findings/05-security-gate-observation.md

Files updated:

evidence/tool-outputs/24-final-pipeline-summary.txt
evidence/tool-outputs/25-final-findings-summary.txt
findings/05-security-gate-observation.md
appendices/commands-used.md

Notes:

The GitLab CI/CD pipeline passed successfully with 7 jobs.

The final summaries were created to make the evidence easier to review.

The security gate observation explains why some scan jobs used allow_failure in this learning project.


## Final Report and Remediation Summary

These files were updated with the final confirmed results and remediation guidance.

cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security

nano reports/final-report.md
nano remediation/remediation-summary.md
nano appendices/commands-used.md

Files updated:

reports/final-report.md
remediation/remediation-summary.md
appendices/commands-used.md

Notes:

The final report documents the full project scope, methodology, pipeline result, confirmed findings, evidence handling, limitations, and conclusion.

The remediation summary explains how each confirmed issue could be fixed in a real environment.

The documentation was updated using real results collected during local testing and GitLab CI/CD execution.


## Lessons Learned, Skills Demonstrated and Career Material

These files were updated to document lessons learned, skills demonstrated, and career material for resume, LinkedIn, GitHub, and interviews.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security

nano lessons-learned/lessons-learned.md
nano lessons-learned/skills-demonstrated.md
nano career-material.md
nano appendices/commands-used.md

Files updated:

lessons-learned/lessons-learned.md
lessons-learned/skills-demonstrated.md
career-material.md
appendices/commands-used.md

Notes:

The lessons learned file explains what I practiced and learned while building the project.

The skills demonstrated file maps the project work to practical AppSec and DevSecOps skills.

The career material file includes resume bullets, a LinkedIn project description, GitHub repository description, and interview talking points.




## Phase 10 — Final Repository Review

These commands were used to review the final repository before considering the project ready for portfolio use.

```bash
cd ~/Cybersecurity-Portfolio/devsecops-gitlab-pipeline-security

git status

grep -RniE "INSERT|TODO|PLACEHOLDER|YOUR_|REPLACE|TBD|TO BE ADDED|ADD SCREENSHOT|ADD EVIDENCE" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude="*.json" \
  --exclude="*.png" \
  --exclude="*.jpg" \
  --exclude="*.jpeg" \
  --exclude="*.tar" \
  --exclude="*.gz"

find . -name "*.tar" -o -name "*.tar.gz" -o -name "*.zip" -o -name ".env" -o -name ".env.*"

grep -RniE "password|token|secret|api_key|private_key|authorization|bearer|aws_access_key|github_pat|ghp_|glpat-" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude="*.png" \
  --exclude="*.jpg" \
  --exclude="*.jpeg" \
  --exclude="*.tar" \
  --exclude="*.gz" \
  | head -n 100

find . -type f -size +10M -not -path "./.git/*" -exec ls -lh {} \;

tree -a -L 3 -I ".git|node_modules|*.tar|*.tar.gz"

Files updated:

appendices/evidence-checklist.md
appendices/commands-used.md

Evidence saved:

evidence/screenshots/environment/11-final-repository-structure.png

Notes:

The final review checked for placeholders, secrets, unnecessary large files, Docker image archives, and repository structure.

The project was reviewed before being considered ready for GitHub portfolio use.
