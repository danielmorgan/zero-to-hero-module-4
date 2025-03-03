import * as ImagePicker from "expo-image-picker";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo, uploadImage } from "@/utils/api";
import { COLORS } from "@/utils/colors";

const Profile = () => {
  const { onLogout, token } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      console.log("Image uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      uploadImageMutation.mutate({
        uri: result.assets[0].uri,
        token: token || "",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleSelectImage}>
          {user?.data?.avatar ? (
            <Image
              source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${user?.data?.avatar}` }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>
                {user?.data?.name?.[0]?.toUpperCase() || "?"}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user?.data?.name || "No name"}</Text>
          <Text style={styles.email}>{user?.data?.email || "No email"}</Text>
        </View>
      </View>

      <Button onPress={onLogout} title="Logout" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    fontSize: 50,
    color: "#fff",
  },
  changePhotoText: {
    marginTop: 10,
    color: COLORS.primary,
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },
  email: {
    fontSize: 18,
    color: "#666",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
