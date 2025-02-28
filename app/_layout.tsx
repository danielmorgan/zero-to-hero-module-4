import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Create Account",
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{
            presentation: "modal",
            title: "Privacy Policy",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
