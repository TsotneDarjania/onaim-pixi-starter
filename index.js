#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the project name from command-line arguments or use a default name
const projectName = process.argv[2] || "onaim-pixi-game-starter";
const targetDir = path.join(process.cwd(), projectName);

// Define the path to the template directory
const templateDir = path.resolve(__dirname, "./template");

// Ensure the template directory exists
if (!fs.existsSync(templateDir)) {
  console.error(
    chalk.red("Error: Template directory does not exist:"),
    templateDir
  );
  process.exit(1);
}

// Ensure the target directory does not already exist
if (fs.existsSync(targetDir)) {
  console.error(
    chalk.red(`Error: Target directory "${projectName}" already exists.`)
  );
  process.exit(1);
}

// Copy the template files to the target directory
const copyRecursiveSync = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Display ASCII art banner
console.log(
  chalk.greenBright(
    figlet.textSync("Onaim Pixi Starter", { horizontalLayout: "default" })
  )
);

// Log creation process with spinner
console.log(
  chalk.bold.green(`\nCreating a new project in "${chalk.cyan(targetDir)}"...`)
);
const creationSpinner = ora("Setting up project structure...").start();
try {
  fs.mkdirSync(targetDir, { recursive: true });
  copyRecursiveSync(templateDir, targetDir);
  creationSpinner.succeed("Project structure created successfully!");
} catch (error) {
  creationSpinner.fail("Failed to create project structure.");
  console.error(chalk.red(error.message));
  process.exit(1);
}

// Log dependencies installation with spinner
const installSpinner = ora("Installing dependencies...").start();
try {
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });
  installSpinner.succeed("Dependencies installed successfully!");
} catch (error) {
  installSpinner.fail("Failed to install dependencies.");
  console.error(chalk.red(error.message));
  process.exit(1);
}

// Success message
console.log(chalk.bold.green("\nProject created successfully!"));
console.log(chalk.yellow("\nTo get started:"));
console.log(chalk.cyan(`  cd ${projectName}`));
console.log(chalk.cyan("  npm run dev\n"));
console.log(chalk.bold.green("Happy coding! 🚀"));
