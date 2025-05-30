#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// 사용 가능한 템플릿들
const TEMPLATES = {
  "react-vite": {
    name: "React + Vite",
    description: "React 18 with Vite, TanStack Router, and shadcn/ui",
    path: "packages/react-vite",
  },
  "nextjs-app-router": {
    name: "Next.js App Router",
    description: "Next.js 15 with App Router and shadcn/ui",
    path: "packages/nextjs-app-router",
  },
  "nextjs-pages-router": {
    name: "Next.js Pages Router",
    description: "Next.js with Pages Router and shadcn/ui (Coming Soon)",
    path: "packages/nextjs-pages-router",
  },
};

function showUsage() {
  console.log(
    "\nUsage: node scripts/create-project.js <template> <project-name> [target-dir]"
  );
  console.log("\nTemplates:");
  Object.keys(TEMPLATES).forEach((key) => console.log(`  - ${key}`));
}

function validateProjectName(name) {
  const validNameRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

  if (!validNameRegex.test(name)) {
    throw new Error("Invalid project name format");
  }

  if (name.length > 214) {
    throw new Error("Project name too long");
  }
}

function copyDirectory(src, dest) {
  console.log("Copying files...");

  const excludePatterns = [
    "node_modules",
    ".next",
    "dist",
    "build",
    ".git",
    ".DS_Store",
    "*.log",
  ];

  const shouldExclude = (filePath) => {
    return excludePatterns.some((pattern) => {
      if (pattern.includes("*")) {
        return filePath.includes(pattern.replace("*", ""));
      }
      return filePath.includes(pattern);
    });
  };

  function copyRecursive(srcPath, destPath) {
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      const files = fs.readdirSync(srcPath);
      files.forEach((file) => {
        const srcFile = path.join(srcPath, file);
        const destFile = path.join(destPath, file);

        if (!shouldExclude(srcFile)) {
          copyRecursive(srcFile, destFile);
        }
      });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  copyRecursive(src, dest);
}

function updatePackageJson(projectPath, projectName) {
  console.log("Updating package.json...");

  const packageJsonPath = path.join(projectPath, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.name = projectName;
    packageJson.version = "0.1.0";
    packageJson.description = "";

    delete packageJson.homepage;
    delete packageJson.repository;
    delete packageJson.bugs;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}

function updateReadme(projectPath, projectName, templateName) {
  const template = TEMPLATES[templateName];
  const readmeContent = `# ${projectName}

Built with ${template.name}

## Setup

\`\`\`bash
yarn install
yarn dev
\`\`\`
`;

  fs.writeFileSync(path.join(projectPath, "README.md"), readmeContent);
}

function initializeGit(projectPath) {
  console.log("Initializing git...");

  try {
    execSync("git init", { cwd: projectPath, stdio: "pipe" });
    execSync("git add .", { cwd: projectPath, stdio: "pipe" });
    execSync('git commit -m "Initial commit"', {
      cwd: projectPath,
      stdio: "pipe",
    });
  } catch (error) {
    console.log(`Git init failed: ${error.message}`);
  }
}

function installDependencies(projectPath) {
  console.log("Installing dependencies...");

  try {
    let packageManager = "npm";

    try {
      execSync("yarn --version", { stdio: "pipe" });
      packageManager = "yarn";
    } catch {
      packageManager = "npm";
    }

    const installCommand =
      packageManager === "yarn" ? "yarn install" : "npm install";

    execSync(installCommand, { cwd: projectPath, stdio: "inherit" });

    return packageManager;
  } catch (error) {
    console.log(`Install failed: ${error.message}`);
    return null;
  }
}

function showSuccessMessage(projectName, projectPath, packageManager) {
  const relativePath = path.relative(process.cwd(), projectPath);

  console.log("\nDone!");
  console.log(`cd ${relativePath}`);

  if (packageManager) {
    const devCommand = packageManager === "yarn" ? "yarn dev" : "npm run dev";
    console.log(`${devCommand}`);
  }
}

function main() {
  const [, , template, projectName, targetDir = "."] = process.argv;

  if (!template || !projectName) {
    showUsage();
    process.exit(1);
  }

  if (!TEMPLATES[template]) {
    console.log(`Unknown template: ${template}`);
    console.log("Available:");
    Object.keys(TEMPLATES).forEach((key) => console.log(`  - ${key}`));
    process.exit(1);
  }

  try {
    validateProjectName(projectName);

    const templatePath = path.resolve(
      __dirname,
      "..",
      TEMPLATES[template].path
    );
    const projectPath = path.resolve(targetDir, projectName);

    if (!fs.existsSync(templatePath)) {
      console.log(`Template not found: ${templatePath}`);
      process.exit(1);
    }

    if (fs.existsSync(projectPath)) {
      console.log(`Directory exists: ${projectPath}`);
      process.exit(1);
    }

    console.log(`\nCreating ${projectName}...`);

    copyDirectory(templatePath, projectPath);
    updatePackageJson(projectPath, projectName);
    updateReadme(projectPath, projectName, template);
    initializeGit(projectPath);
    const packageManager = installDependencies(projectPath);

    showSuccessMessage(projectName, projectPath, packageManager);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (require.main === module) {
  main();
}

module.exports = { main, TEMPLATES };
