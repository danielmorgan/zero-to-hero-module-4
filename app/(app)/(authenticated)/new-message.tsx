import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { createMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: () => {
      return createMessage({ content: message });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });

      if (!data) {
        Burnt.alert({
          title: "Failed to send message",
          message: "Please try again.",
          duration: 3,
        });
        return;
      } else {
        Burnt.toast({
          title: "Message sent successfully",
          duration: 3,
        });
        router.back();
      }
    },
    onError: (error) => {
      console.error(error);
      Burnt.alert({
        title: "Failed to send message",
        message: error.message,
        duration: 3,
      });
    },
  });

  const handleSend = () => {
    if (message.trim().length === 0 || isPending) return;
    console.log("send message");
    sendMessage();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          // autoFocus
          maxLength={300}
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim() || isPending}
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default NewMessage;
const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    padding: 16,
    gap: 10,
    borderTopColor: "#eee",
  },
  input: {
    padding: 12,
    // minHeight: 100,h t894qa ht89ah
    textAlignVertical: "top",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a9a9a9",
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
