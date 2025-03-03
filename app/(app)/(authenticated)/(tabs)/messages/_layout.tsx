import { Stack } from "expo-router";
import { COLORS } from "@/utils/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Messages" }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default Layout;
