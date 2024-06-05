import { useEffect } from "react";
import { StatusBar } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { ThemeProvider } from "styled-components/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import styledTheme from "@/src/constants/styledTheme";
import { RepositoriesProvider } from "@/src/contexts/repositories/RepositoriesContext";
import { Header } from "@/src/components/";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={styledTheme}>
      <ToastProvider placement="top" offsetTop={50}>
        <RepositoriesProvider>
          <StatusBar backgroundColor="black" translucent />
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ animation: "slide_from_right" }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="details"
                options={{
                  header: (props) => (
                    <Header
                      goBack
                      bg="#000"
                      color="#FFF"
                      title="Detalhes"
                      {...props}
                    />
                  ),
                }}
              />
            </Stack>
          </SafeAreaView>
        </RepositoriesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
