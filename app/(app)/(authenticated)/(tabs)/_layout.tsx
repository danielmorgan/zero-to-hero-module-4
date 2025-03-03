import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "@/utils/colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#666",
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTitleStyle: {
          fontFamily: "LuckiestGuy_400Regular",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="message" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => <FontAwesome6 name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
