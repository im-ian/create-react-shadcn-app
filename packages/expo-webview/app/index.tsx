import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import * as Network from "expo-network";
import Constants from "expo-constants";
import { Button } from "@/components/ui/button";
import {
  buildNativeMessage,
  parseWebMessage,
  type NativeMessage,
} from "@/lib/bridge";

const WEB_URL =
  (Constants.expoConfig?.extra?.webUrl as string | undefined) ??
  "http://localhost:3000";

type LoadState =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "error"; description: string }
  | { kind: "offline" };

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [loadState, setLoadState] = useState<LoadState>({ kind: "loading" });
  const [lastFromWeb, setLastFromWeb] = useState<string>("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Network.getNetworkStateAsync().then((state) => {
      if (cancelled) return;
      if (!state.isInternetReachable && !state.isConnected) {
        setLoadState({ kind: "offline" });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const sendToWeb = useCallback((message: NativeMessage) => {
    const payload = JSON.stringify(message).replace(/'/g, "\\'");
    webViewRef.current?.injectJavaScript(
      `window.dispatchEvent(new MessageEvent('native-message', { data: '${payload}' })); true;`,
    );
  }, []);

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    const parsed = parseWebMessage(event.nativeEvent.data);
    if (!parsed) return;
    setLastFromWeb(`${parsed.type} ${JSON.stringify(parsed.payload ?? {})}`);
  }, []);

  const handleRetry = () => {
    setLoadState({ kind: "loading" });
    setReloadKey((k) => k + 1);
  };

  if (loadState.kind === "offline") {
    return (
      <Fallback
        title="오프라인 상태"
        description="네트워크에 연결되어 있지 않습니다. 다시 시도하세요."
        onRetry={handleRetry}
      />
    );
  }

  if (loadState.kind === "error") {
    return (
      <Fallback
        title="페이지를 불러올 수 없습니다"
        description={loadState.description}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-1">
        <WebView
          key={reloadKey}
          ref={webViewRef}
          source={{ uri: WEB_URL }}
          onMessage={handleMessage}
          onLoadEnd={() => setLoadState({ kind: "ready" })}
          onError={(event) =>
            setLoadState({
              kind: "error",
              description: event.nativeEvent.description ?? "Unknown error",
            })
          }
          onHttpError={(event) =>
            setLoadState({
              kind: "error",
              description: `HTTP ${event.nativeEvent.statusCode}`,
            })
          }
          startInLoadingState
          renderLoading={() => <LoadingOverlay />}
        />

        <View className="border-t border-border bg-background p-3 gap-2">
          <Text className="text-xs text-muted-foreground">
            Bridge demo (DEV — remove in production)
          </Text>
          <View className="flex-row items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onPress={() =>
                sendToWeb(
                  buildNativeMessage("ping", {
                    sentAt: new Date().toISOString(),
                  }),
                )
              }
            >
              <Text>Ping web</Text>
            </Button>
            <Button variant="outline" size="sm" onPress={handleRetry}>
              <Text>Reload</Text>
            </Button>
          </View>
          {lastFromWeb ? (
            <Text className="text-xs text-foreground" numberOfLines={2}>
              ← {lastFromWeb}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

function LoadingOverlay() {
  return (
    <View className="absolute inset-0 items-center justify-center bg-background gap-3">
      <ActivityIndicator size="large" />
      <Text className="text-muted-foreground">Loading {WEB_URL}…</Text>
    </View>
  );
}

function Fallback({
  title,
  description,
  onRetry,
}: {
  title: string;
  description: string;
  onRetry: () => void;
}) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-6 gap-4">
        <Text className="text-xl font-semibold text-foreground">{title}</Text>
        <Text className="text-center text-muted-foreground">{description}</Text>
        <Button onPress={onRetry}>
          <Text className="text-primary-foreground">다시 시도</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
