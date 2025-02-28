import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/utils/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/register" asChild>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  outlineButton: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
