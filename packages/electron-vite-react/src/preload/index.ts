import { contextBridge, ipcRenderer } from "electron";

const api = {
  app: {
    getVersion: (): Promise<string> => ipcRenderer.invoke("app:get-version"),
    getPlatform: (): Promise<NodeJS.Platform> =>
      ipcRenderer.invoke("app:get-platform"),
  },
  updater: {
    check: (): Promise<unknown> => ipcRenderer.invoke("updater:check"),
    download: (): Promise<unknown> => ipcRenderer.invoke("updater:download"),
    quitAndInstall: (): Promise<void> =>
      ipcRenderer.invoke("updater:quit-and-install"),
    onUpdateAvailable: (callback: (info: unknown) => void) => {
      const listener = (_: Electron.IpcRendererEvent, info: unknown) =>
        callback(info);
      ipcRenderer.on("update-available", listener);
      return () => ipcRenderer.removeListener("update-available", listener);
    },
    onUpdateNotAvailable: (callback: () => void) => {
      const listener = () => callback();
      ipcRenderer.on("update-not-available", listener);
      return () => ipcRenderer.removeListener("update-not-available", listener);
    },
    onDownloadProgress: (callback: (progress: unknown) => void) => {
      const listener = (_: Electron.IpcRendererEvent, progress: unknown) =>
        callback(progress);
      ipcRenderer.on("update-download-progress", listener);
      return () =>
        ipcRenderer.removeListener("update-download-progress", listener);
    },
    onUpdateDownloaded: (callback: (info: unknown) => void) => {
      const listener = (_: Electron.IpcRendererEvent, info: unknown) =>
        callback(info);
      ipcRenderer.on("update-downloaded", listener);
      return () => ipcRenderer.removeListener("update-downloaded", listener);
    },
    onError: (callback: (message: string) => void) => {
      const listener = (_: Electron.IpcRendererEvent, message: string) =>
        callback(message);
      ipcRenderer.on("update-error", listener);
      return () => ipcRenderer.removeListener("update-error", listener);
    },
  },
};

contextBridge.exposeInMainWorld("api", api);

export type Api = typeof api;
