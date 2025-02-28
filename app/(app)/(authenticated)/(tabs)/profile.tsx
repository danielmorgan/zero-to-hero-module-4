import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { onLogout } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={onLogout} title="Logout" />
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({});
