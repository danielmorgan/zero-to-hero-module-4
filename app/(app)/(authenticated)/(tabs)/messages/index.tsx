import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { FAB } from "@/components/fab/fab";
import { MessageItem } from "@/components/messages/MessageItem";
import { fetchMessages } from "@/utils/api";

const Messages = () => {
  const {
    data: messages,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(),
  });

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} message="Failed to fetch messages" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageItem message={item} />}
        ListEmptyComponent={<EmptyState message="Your messages will appear here" />}
        refreshControl={<RefreshControl refreshing={isPending} onRefresh={refetch} />}
        contentContainerStyle={styles.list}
      />
      <FAB />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
});
