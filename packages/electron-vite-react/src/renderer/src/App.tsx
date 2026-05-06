import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { Button } from "@/components/ui/button";

const counterAtom = atom(0);

type UpdateStatus =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "available" }
  | { kind: "not-available" }
  | { kind: "downloading"; percent: number }
  | { kind: "downloaded" }
  | { kind: "error"; message: string };

function App() {
  const [count, setCount] = useAtom(counterAtom);
  const [version, setVersion] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    kind: "idle",
  });

  useEffect(() => {
    window.api.app.getVersion().then(setVersion);
    window.api.app.getPlatform().then(setPlatform);

    const offAvailable = window.api.updater.onUpdateAvailable(() => {
      setUpdateStatus({ kind: "available" });
    });
    const offNotAvailable = window.api.updater.onUpdateNotAvailable(() => {
      setUpdateStatus({ kind: "not-available" });
    });
    const offProgress = window.api.updater.onDownloadProgress((progress) => {
      const percent =
        typeof progress === "object" &&
        progress !== null &&
        "percent" in progress
          ? Number((progress as { percent: number }).percent)
          : 0;
      setUpdateStatus({ kind: "downloading", percent });
    });
    const offDownloaded = window.api.updater.onUpdateDownloaded(() => {
      setUpdateStatus({ kind: "downloaded" });
    });
    const offError = window.api.updater.onError((message) => {
      setUpdateStatus({ kind: "error", message });
    });

    return () => {
      offAvailable();
      offNotAvailable();
      offProgress();
      offDownloaded();
      offError();
    };
  }, []);

  const checkForUpdates = async () => {
    setUpdateStatus({ kind: "checking" });
    try {
      await window.api.updater.check();
    } catch (err) {
      setUpdateStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-10 flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Electron + Vite + React + shadcn/ui
        </h1>
        <p className="text-muted-foreground">
          v{version || "?"} on {platform || "?"}
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Jotai counter</h2>
        <div className="flex items-center gap-3">
          <Button onClick={() => setCount((c) => c - 1)} variant="outline">
            -
          </Button>
          <span className="font-mono text-lg w-12 text-center">{count}</span>
          <Button onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Auto-updater</h2>
        <div className="flex items-center gap-3">
          <Button onClick={checkForUpdates} variant="secondary">
            Check for updates
          </Button>
          {updateStatus.kind === "available" && (
            <Button onClick={() => window.api.updater.download()}>
              Download
            </Button>
          )}
          {updateStatus.kind === "downloaded" && (
            <Button onClick={() => window.api.updater.quitAndInstall()}>
              Restart and install
            </Button>
          )}
        </div>
        <UpdateStatusLine status={updateStatus} />
      </section>
    </main>
  );
}

function UpdateStatusLine({ status }: { status: UpdateStatus }) {
  switch (status.kind) {
    case "idle":
      return (
        <p className="text-sm text-muted-foreground">
          Click to check for updates.
        </p>
      );
    case "checking":
      return <p className="text-sm">Checking…</p>;
    case "available":
      return <p className="text-sm">Update available.</p>;
    case "not-available":
      return (
        <p className="text-sm text-muted-foreground">No updates available.</p>
      );
    case "downloading":
      return (
        <p className="text-sm">Downloading {status.percent.toFixed(1)}%…</p>
      );
    case "downloaded":
      return <p className="text-sm">Update downloaded. Ready to install.</p>;
    case "error":
      return (
        <p className="text-sm text-destructive">Error: {status.message}</p>
      );
  }
}

export default App;
