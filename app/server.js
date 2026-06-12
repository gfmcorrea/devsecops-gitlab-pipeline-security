const express = require('express');
const _ = require('lodash');

const app = express();
const PORT = process.env.PORT || 3000;

// Demo-only fake secret used for secret scanning validation.
// This is not a real credential and must never be used in production.
const FAKE_DEMO_API_KEY = 'demo_fake_key_do_not_use';

app.get('/', (req, res) => {
  res.json({
    message: 'DevSecOps demo application is running.',
    project: 'DevSecOps Security Pipeline with GitLab CI/CD',
    purpose: 'Safe local demo app for CI/CD security scanning'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'devsecops-demo-app'
  });
});

app.get('/demo/lodash', (req, res) => {
  const items = ['sast', 'secret-scanning', 'dependency-scanning', 'container-scanning'];

  res.json({
    message: 'Lodash demo endpoint',
    firstItem: _.first(items),
    totalItems: items.length
  });
});

app.get('/demo/eval', (req, res) => {
  const expression = req.query.expression || '1+1';

  // Demo-only insecure code pattern for SAST validation.
  // Do not use eval() in real applications.
  const result = eval(expression);

  res.json({
    message: 'Demo-only eval endpoint',
    expression,
    result
  });
});

app.listen(PORT, () => {
  console.log(`DevSecOps demo app running on port ${PORT}`);
});
