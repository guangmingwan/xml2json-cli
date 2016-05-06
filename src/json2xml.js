#!/usr/bin/env node

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Brandon Sara (http://bsara.github.io/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const fs   = require('fs');
const path = require('path');

const chalk     = require('chalk');
const commander = require('commander');
const json2xml  = require('json2xml');
const log       = require('fancy-log');





// Constants
//---------------------------------------------

const errorMsg   = chalk.red;
const successMsg = chalk.green;



// Process Args
//---------------------------------------------

;(function() {

  function _parseJSONString(json) {
    return eval(`(${json})`);
  }


  function _parseJSONFile(jsonFilePath) {
    if (typeof jsonFilePath !== 'string') {
      _logError("Error reading JSON file:", `JSON file path must be a string, but a value of type "${typeof jsonFilePath}" was given.`);
      process.exit(1);
    }

    try {
      fs.accessSync(jsonFilePath, fs.F_OK);
      fs.accessSync(jsonFilePath, fs.R_OK);
    } catch (e) {
      _logError("Error reading JSON file:", e.message);
      process.exit(1);
    }

    commander.json = _parseJSONString(fs.readFileSync(jsonFilePath));

    return jsonFilePath;
  }


  commander
    .version("1.0.0-beta")
    .usage("(-i jsonFilePath | -j json) [options]")
    .option("-i, --input-file <jsonFilePath>", "Input JSON file path", _parseJSONFile)
    .option("-j, --json <json>",               "Input JSON", _parseJSONString)
    .option("-o, --out <outFilePath>",         "Output XML file path (default: 'out.xml')")
    .option("-k, --key <attributesKey>",       "Key for reading attributes from JSON")
    .option("--header",                        "Adds standard XML header to output file")
    .parse(process.argv);

})();



// Helper Functions
//---------------------------------------------

function _logError(msg, subMsg) {
  if (subMsg != null) {
    return log.error(`${errorMsg(msg)}\n             ${errorMsg(subMsg)}`);
  }
  return log.error(errorMsg(msg));
}


function _logSuccess(msg) {
  return log(successMsg(msg));
}


function _getJSON() {
  if (commander.json == null) {
    _logError("Error:", "No JSON was given (run 'json2xml --help' for correct usage information).");
    process.exit(1);
  }
  if (typeof commander.json !== 'object') {
    _logError("Error:", "Invalid JSON given (run 'json2xml --help' for correct usage information).");
    process.exit(1);
  }

  return commander.json;
}


function _getOutFilePath() {
  if (commander.out == null && commander.inputFile != null) {
    return `${path.basename(commander.inputFile, path.extname(commander.inputFile))}.xml`;
  }
  if (commander.out == null) {
    return 'out.xml';
  }
  return commander.out;
}


function _getOptions() {
  if (commander.attrsKey == null
        && (commander.header == null || commander.header !== true)) {
    return undefined;
  }

  var options = {
    header: (commander.header === true)
  };

  if (commander.attrsKey != null) {
    options['attributes_key'] = commander.attrsKey;
  }

  return options;
}



// Conversion Code
//---------------------------------------------

var json        = _getJSON();
var outFilePath = _getOutFilePath();
var options     = _getOptions();

fs.writeFile(outFilePath, json2xml(json, options), (err) => {
  if (err) {
    return _logError(err);
  }

  _logSuccess("XML conversion successful!");
});
