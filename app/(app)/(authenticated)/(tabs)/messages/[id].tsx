import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { useAuth } from "@/context/AuthContext";
import { deleteMessage, fetchMessage, updateMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";

const IconButton = ({
  icon,
  onPress,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.iconButton}>
      <Ionicons
        name={icon}
        size={24}
        color={disabled ? "#999" : colorScheme === "dark" ? "#fff" : COLORS.primary}
      />
    </TouchableOpacity>
  );
};

const Message = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: message,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchMessage(Number(id)),
  });

  useEffect(() => {
    if (message?.data?.content) {
      setEditedText(message.data.content);
    }
  }, [message?.data?.content]);

  const updateMutation = useMutation({
    mutationFn: () => updateMessage(Number(id), { content: editedText }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
      setIsEditing(false);

      if (!data) {
        Burnt.alert({
          title: "Failed to update message",
          message: "Please try again.",
          duration: 3,
        });
        return;
      } else {
        Burnt.toast({
          title: "Message updated successfully",
          duration: 3,
        });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteMessage(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });

      Burnt.toast({
        title: "Message deleted successfully",
        duration: 3,
      });

      router.back();
    },
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} message="Failed to load message" />;
  if (!message) return <ErrorState onRetry={refetch} message="Message not found" />;

  const isOwner = message.data?.userId === userId;

  const handleUpdate = () => {
    if (editedText.trim() !== message.data?.content) {
      updateMutation.mutate();
    } else {
      setIsEditing(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: `Message #${id}` }} />

      <View style={styles.container}>
        {isOwner ? (
          <View style={[styles.ownMessageContainer]}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editedText}
                  onChangeText={setEditedText}
                  multiline
                />
                <View style={styles.controls}>
                  <IconButton icon="checkmark" onPress={handleUpdate} />
                  <IconButton icon="close" onPress={() => setIsEditing(false)} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.messageText}>{message.data?.content}</Text>
                <View style={styles.controls}>
                  <IconButton icon="pencil" onPress={() => setIsEditing(true)} />
                  <IconButton icon="trash" onPress={() => deleteMutation.mutate()} />
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={[styles.otherMessageContainer]}>
            <Text style={styles.messageText}>{message.data?.content}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ownMessageContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  otherMessageContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 8,
  },
  editControls: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
});
