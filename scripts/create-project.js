#!/usr/bin/env node

const fs = require("fs-extra");
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
    description: "Next.js 15 with Pages Router and shadcn/ui",
    path: "packages/nextjs-pages-router",
  },
};

function showUsage() {
  console.log("\nUsage: npx create-react-shadcn-app <template> <project-name>");
  console.log("\nTemplates:");
  Object.keys(TEMPLATES).forEach((key) => console.log(`  - ${key}`));
  console.log("\nExamples:");
  console.log("  npx create-react-shadcn-app react-vite my-app");
  console.log("  npx create-react-shadcn-app nextjs-app-router my-dashboard");
  console.log("  npx create-react-shadcn-app nextjs-pages-router my-blog");
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

  try {
    // fs-extra의 copySync 사용하되, 제외할 파일들은 필터링
    fs.copySync(src, dest, {
      filter: (srcPath) => {
        const relativePath = path.relative(src, srcPath);
        return !excludePatterns.some((pattern) => {
          if (pattern.includes("*")) {
            return relativePath.includes(pattern.replace("*", ""));
          }
          return relativePath.includes(pattern);
        });
      },
    });
  } catch (error) {
    throw new Error(`Failed to copy files: ${error.message}`);
  }
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
    const packageLockPath = path.join(projectPath, "package-lock.json");
    const yarnLockPath = path.join(projectPath, "yarn.lock");
    const pnpmLockPath = path.join(projectPath, "pnpm-lock.yaml");

    const hasPackageLock = fs.existsSync(packageLockPath);
    const hasYarnLock = fs.existsSync(yarnLockPath);
    const hasPnpmLock = fs.existsSync(pnpmLockPath);

    console.log(`Lockfile detection:`, {
      hasPackageLock,
      hasYarnLock,
      hasPnpmLock,
    });

    let packageManager = "npm";

    if (hasYarnLock) {
      packageManager = "yarn";
    } else if (hasPnpmLock) {
      packageManager = "pnpm";
    } else if (hasPackageLock) {
      packageManager = "npm";
      // package-lock.json이 있으면 다른 lockfile 제거
      if (hasYarnLock) fs.unlinkSync(yarnLockPath);
      if (hasPnpmLock) fs.unlinkSync(pnpmLockPath);
    } else {
      // lockfile이 없으면 npm을 기본으로 사용 (가장 안정적)
      packageManager = "npm";
    }

    console.log(`Using ${packageManager}...`);

    const installCommand = {
      npm: "npm install",
      yarn: "yarn install",
      pnpm: "pnpm install",
    }[packageManager];

    execSync(installCommand, { cwd: projectPath, stdio: "inherit" });

    return packageManager;
  } catch (error) {
    console.log(`Install failed: ${error.message}`);
    console.log("You can install dependencies manually by running:");
    console.log("  cd " + path.basename(projectPath));
    console.log("  npm install");
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
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Error: Both template and project name are required");
    showUsage();
    process.exit(1);
  }

  const template = args[0];
  const projectName = args[1];
  const targetDir = args[2] || ".";

  // 템플릿 검증
  if (!TEMPLATES[template]) {
    console.log(`Error: Unknown template "${template}"`);
    console.log("\nAvailable templates:");
    Object.keys(TEMPLATES).forEach((key) =>
      console.log(`  - ${key}: ${TEMPLATES[key].description}`)
    );
    process.exit(1);
  }

  // 프로젝트명 검증
  if (!projectName) {
    console.log("Error: Project name is required");
    showUsage();
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
      console.log(`Error: Directory "${projectName}" already exists`);
      process.exit(1);
    }

    console.log(
      `\nCreating ${projectName} with ${TEMPLATES[template].name}...`
    );

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
