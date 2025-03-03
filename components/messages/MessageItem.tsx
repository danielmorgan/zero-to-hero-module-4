import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Message } from "@/utils/api";

type Props = {
  message: Message;
};

export const MessageItem = ({ message }: Props) => {
  return (
    <Link href={`/messages/${message.id}`} style={[styles.container]} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.content}>
          <Text style={styles.text} numberOfLines={3}>
            {message.content}
          </Text>
          <Text style={styles.date}>
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
  },
  date: {
    flexShrink: 0,
    fontSize: 12,
  },
});
