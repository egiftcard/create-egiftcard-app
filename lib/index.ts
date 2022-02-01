#! /usr/bin/env node

"use strict";
import inquirer from "inquirer";
import fs from "fs";
import fetch from "node-fetch";
import { handler } from "./handler";
import path from "path";
var generate = require("project-name-generator");
const args = process.argv.slice(2);
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

console.clear();
let examples: any;
// TODO: change url to https://raw.githubusercontent.com/nftlabs/cli/main/lib/examples.json when repo is made public
fetch(
  "https://gist.githubusercontent.com/ayshptk/c0244844556fa43e8eacf737a678245f/raw/0caa36a56f153c0d6cdf75a15b3f28fde8d62766/create-thirdweb-app.json"
).then(async (res) => {
  fs.writeFile(
    path.resolve(__dirname, "examples.json"),
    await res.text(),
    (err) => {
      examples = require(path.resolve(__dirname, "examples.json"));
      switch (args[0]) {
        case undefined:
          let languageName: string;
          let moduleName: string;
          inquirer
            .prompt([
              {
                type: "list",
                name: "answer",
                message: "Language?",
                choices: Object.keys(examples),
              },
            ])
            .then((language) => {
              languageName = language.answer;
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "answer",
                    message: "Module?",
                    choices: Object.keys(examples[languageName]),
                  },
                ])
                .then((module) => {
                  moduleName = module.answer;
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "answer",
                        message: "Example?",
                        choices: Object.keys(
                          examples[languageName][moduleName]
                        ),
                      },
                      {
                        type: "input",
                        name: "name",
                        message: "Name of the app?",
                        default: generate().dashed,
                      },
                    ])
                    .then(async (example) => {
                      console.clear();
                      await handler(
                        languageName,
                        moduleName,
                        example.answer,
                        example.name
                      );
                    });
                });
            });
          break;
      }
    }
  );
});