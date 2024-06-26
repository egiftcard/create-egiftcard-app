import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import fetch from "node-fetch";
import zipper from "node-stream-zip";

export async function handler(lang: string, name: string) {
  console.clear();
  const examples = require(path.resolve(__dirname, "examples.json"));
  console.log(chalk.gray("Example: "), chalk.green(lang));
  console.log(chalk.gray("Directory name: "), chalk.green(name));
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Proceed?",
        default: true,
      },
    ])
    .then(async (answers) => {
      if (answers.confirm) {
        console.clear();
        var start = new Date();
        const pathname = `${path.resolve("./")}/${name}`;
        console.log(chalk.gray(`Directory already exists: ${pathname}`));
        if (fs.existsSync(pathname)) {
          await inquirer
            .prompt([
              {
                type: "confirm",
                name: "confirm",
                message: "Overwrite?",
                default: false,
              },
            ])
            .then(async (answers) => {
              if (!answers.confirm) {
                process.exit(1);
              }
            });
        }
        const ex = examples[lang];
        console.log(chalk.gray("Setting up..."));
        console.log(chalk.gray("Cloning repo..."));
        await download(ex.repo, pathname, name);
        console.clear();
        console.log(chalk.gray("Setting up..."));
        console.log(chalk.gray("Installing Dependencies..."));
        execSync(`cd ${pathname} && ${ex.install}`, {
          stdio: [1],
        });
        console.clear();
        console.log(
          `Done in ${(new Date().getTime() - start.getTime()) / 1000}s ✨ `
        );
        const startCommand = ex.run;

        if (ex.guide !== undefined || ex.guide !== "") {
          console.log(`Find accompanying tutorial at ${chalk.green(ex.guide)}`);
        }
        if (ex.docs !== undefined || ex.docs !== "") {
          console.log(`Check out docs at ${chalk.green(ex.docs)}`);
        }
        console.log(
          "run `" +
            chalk.green(
              `cd ${name}${startCommand ? " && " + startCommand : ""}`
            ) +
            "` to get started"
        );
        console.log(
          "Stuck somewhere? Join our discord at " +
            chalk.green(`https://discord.gg/egiftcard`)
        );
      } else {
        console.log(chalk.red("Operation cancelled by user"));
      }
    })
    .catch((err) => {
      console.clear();
      if (err.command) {
        console.log(`${chalk.cyan(err.command)} has failed.`);
      } else {
        console.log(chalk.red("Unexpected error. Please report it as a bug:"));
        console.log(err.message);
      }
    });
}
async function download(repo: string, path: string, name: string) {
  const res = (await fetch(
    `https://codeload.github.com/egiftcard/${repo}/zip/refs/heads/main`
  )) as any;
  const fileStream = fs.createWriteStream(`${__dirname}/${name}.zip`);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });

  fs.mkdirSync(path);
  const zip = new zipper.async({ file: `${__dirname}/${name}.zip` });
  await zip.extract(`${repo}-main`, path);
  await zip.close();
  fs.unlinkSync(`${__dirname}/${name}.zip`);
}
