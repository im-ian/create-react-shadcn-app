import { useState } from "react";
import { Platform, Text, View } from "react-native";
import { atom, useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";

const counterAtom = atom(0);

type RandomFact = { text: string };

async function fetchFact(): Promise<RandomFact> {
  return { text: `Built ${Constants.expoConfig?.name ?? "app"} on ${Platform.OS}` };
}

export default function HomeScreen() {
  const [count, setCount] = useAtom(counterAtom);
  const [showFact, setShowFact] = useState(false);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["fact"],
    queryFn: fetchFact,
    enabled: showFact,
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <View className="flex-1 p-6 gap-8">
        <View className="gap-1">
          <Text className="text-3xl font-semibold text-foreground">
            Expo + React Native
          </Text>
          <Text className="text-muted-foreground">
            NativeWind + Jotai + TanStack Query
          </Text>
        </View>

        <View className="gap-3">
          <Text className="text-xl font-medium text-foreground">
            Jotai counter
          </Text>
          <View className="flex-row items-center gap-3">
            <Button variant="outline" onPress={() => setCount((c) => c - 1)}>
              <Text>-</Text>
            </Button>
            <Text className="text-lg font-mono w-12 text-center text-foreground">
              {count}
            </Text>
            <Button onPress={() => setCount((c) => c + 1)}>
              <Text className="text-primary-foreground">+</Text>
            </Button>
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-xl font-medium text-foreground">
            TanStack Query demo
          </Text>
          <View className="flex-row items-center gap-3">
            <Button
              variant="secondary"
              onPress={() => {
                setShowFact(true);
                refetch();
              }}
            >
              <Text>{isFetching ? "Loading…" : "Fetch fact"}</Text>
            </Button>
          </View>
          {showFact && data ? (
            <Text className="text-foreground">{data.text}</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
