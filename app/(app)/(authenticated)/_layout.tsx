import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS } from "@/utils/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: COLORS.backgroundDark,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-message"
        options={{
          title: "New Message",
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          // sheetGrabberVisible: true,
          // sheetExpandsWhenScrolledToEdge: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
