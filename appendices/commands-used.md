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
