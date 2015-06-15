#!/usr/bin/env node

var fs = require('fs'),
  path = require('path');

fs.writeFileSync(
  path.join(__dirname, 'process.js'),
  JSON.stringify(process.env, null, 4)
);
