import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "@/utils/colors";

export const FAB = () => {
  return (
    <Link href="/new-message" asChild>
      <TouchableOpacity style={styles.fab}>
        <FontAwesome6 name="comment-medical" size={20} color="#fff" />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    elevation: 10,
  },
});
