#! /usr/bin/env node

"use strict";
import inquirer from "inquirer";
import fs from "fs";
import fetch from "node-fetch";
import { handler } from "./handler";
import path from "path";
import chalk from "chalk";
var generate = require("project-name-generator");
const args = process.argv.slice(2);
const supportedCommands: string[] = ["-v", "--version", "-h", "--help"];
console.clear();
let examples: any = {};
fetch(
  "https://raw.githubusercontent.com/egiftcard/create-egiftcard-app/main/examples.json"
)
  .then(async (res) => {
    fs.writeFile(
      path.resolve(__dirname, "examples.json"),
      await res.text(),
      async (err) => {
        examples = require(path.resolve(__dirname, "examples.json"));
        switch (args.length) {
          case 0:
            let languageName: string;
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "language",
                  message: "Choose example",
                  choices: Object.keys(examples),
                },
              ])
              .then((answer) => {
                languageName = answer.language;
                chooseName()
                  .then(async (answer) => {
                    await handler(languageName, answer);
                  })
                  .catch((err) => {
                    console.clear();
                    if (err.command) {
                      console.log(`${chalk.cyan(err.command)} has failed.`);
                    } else {
                      console.log(
                        chalk.red(
                          "Unexpected error. Please report it as a bug:"
                        )
                      );
                      console.log(err.message);
                    }
                  });
              })
              .catch((err) => {
                console.clear();
                console.log(
                  chalk.red("Unexpected error. Please report it as a bug:")
                );
                console.log(err.message);
              });
            break;
          case 1:
            if (Object.keys(examples).includes(args[0])) {
              let name: string;

              chooseName()
                .then(async (answer) => {
                  await handler(args[0], answer);
                })
                .catch((err) => {
                  console.clear();
                  if (err.command) {
                    console.log(`${chalk.cyan(err.command)} has failed.`);
                  }
                  console.log(
                    chalk.red("Unexpected error. Please report it as a bug:")
                  );
                  console.log(err.message);
                });
            } else {
              flags(args[0]);
            }
            break;
          case 2:
            if (Object.keys(examples).includes(args[0])) {
              await handler(args[0], args[1]);
            } else {
              flags(args[0]);
            }
            break;
          default:
            if (args.filter((x) => !supportedCommands.includes(x)).length > 0) {
              console.log(chalk.red("Unexpected flag(s) :", args.join(" ")));
              process.exit(1);
            }

            if (args.includes("-v") || args.includes("--version")) {
            }
        }
      }
    );
  })
  .catch((err) => {
    console.log(chalk.red(`Error fetching latest examples: ${err.message}`));
    process.exit(1);
  });

function flags(flag: string) {
  switch (flag) {
    case "-h" || "--help":
      console.log(
        `Please visit  ${chalk.cyan(
          "https://github.com/egiftcard/create-egiftcard-app#readme"
        )} to know more about the usage of this CLI.`
      );
      break;

    case "-v" || "--version":
      console.log(
        `${chalk.cyan("create-egiftcard-app")} ${chalk.green(
          require(path.resolve(__dirname, "../package.json")).version
        )}`
      );
      break;
    default:
      console.log(chalk.red("Unexpected flag:", flag));
      process.exit(1);
  }
}

async function chooseName() {
  return await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Name of the app?",
        default: generate().dashed,
      },
    ])
    .then((answer) => {
      return answer.name;
    })
    .catch((err) => {
      console.log(chalk.red("Unexpected error:", err));
      process.exit(1);
    });
}
