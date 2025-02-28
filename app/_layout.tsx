import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { AuthProvider } from "@/context/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
