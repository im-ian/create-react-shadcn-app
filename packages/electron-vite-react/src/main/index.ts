import { app, BrowserWindow, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import { join } from "path";

const isDev = !app.isPackaged;

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.on("ready-to-show", () => {
    window.show();
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
    window.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    window.loadFile(join(__dirname, "../renderer/index.html"));
  }

  return window;
}

function setupAutoUpdater(window: BrowserWindow): void {
  if (isDev) {
    return;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("update-available", (info) => {
    window.webContents.send("update-available", info);
  });

  autoUpdater.on("update-not-available", () => {
    window.webContents.send("update-not-available");
  });

  autoUpdater.on("download-progress", (progress) => {
    window.webContents.send("update-download-progress", progress);
  });

  autoUpdater.on("update-downloaded", (info) => {
    window.webContents.send("update-downloaded", info);
  });

  autoUpdater.on("error", (err) => {
    window.webContents.send("update-error", err.message);
  });

  ipcMain.handle("updater:check", async () => {
    return autoUpdater.checkForUpdates();
  });

  ipcMain.handle("updater:download", async () => {
    return autoUpdater.downloadUpdate();
  });

  ipcMain.handle("updater:quit-and-install", () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.checkForUpdates().catch(() => {
    // Suppress: handled via the `error` event above.
  });
}

function registerIpc(): void {
  ipcMain.handle("app:get-version", () => app.getVersion());
  ipcMain.handle("app:get-platform", () => process.platform);
}

app.whenReady().then(() => {
  registerIpc();

  const window = createWindow();
  setupAutoUpdater(window);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
