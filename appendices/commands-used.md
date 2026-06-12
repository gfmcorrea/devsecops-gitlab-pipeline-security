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
