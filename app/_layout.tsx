import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

const RootLayout = () => {
  const colorScheme = useColorScheme();
  console.log({ colorScheme });

  let [fontsLoaded] = useFonts({
    LuckiestGuy_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <>
      <StatusBar backgroundColor={COLORS.background} barStyle={"light-content"} />
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
