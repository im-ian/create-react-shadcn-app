/**
 * Typed message contract between the native shell (React Native) and
 * the embedded web app (Next.js or any other web frontend).
 *
 *   Web → Native:  window.ReactNativeWebView.postMessage(JSON.stringify(message))
 *   Native → Web:  window.dispatchEvent(new MessageEvent('native-message', { data }))
 */

export type WebMessage =
  | { type: "ready"; payload?: undefined }
  | { type: "pong"; payload: { receivedAt: string } }
  | { type: "log"; payload: { level: "info" | "warn" | "error"; text: string } }
  | { type: string; payload?: unknown };

export type NativeMessage =
  | { type: "ping"; payload: { sentAt: string } }
  | { type: "navigate"; payload: { path: string } }
  | { type: string; payload?: unknown };

export function parseWebMessage(raw: string): WebMessage | null {
  try {
    const parsed = JSON.parse(raw) as WebMessage;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.type !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function buildNativeMessage<T extends NativeMessage>(
  type: T["type"],
  payload?: T["payload"],
): NativeMessage {
  return { type, payload } as NativeMessage;
}
