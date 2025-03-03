import { Stack } from "expo-router";
import { COLORS } from "@/utils/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "LuckiestGuy_400Regular",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Messages" }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default Layout;
