import { StyleSheet, Text, View } from "react-native";
import FAB from "@/components/fab/fab";

const Messages = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
      <FAB />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
