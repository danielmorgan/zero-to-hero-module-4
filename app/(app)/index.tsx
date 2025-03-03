import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "test@example.com",
      password: "secret",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const result = await onLogin!(data.email, data.password);
    if (result && result.error) {
      Alert.alert("Error", result.msg);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={{ uri: "https://app.rulemoney.co.uk/images/squirrel/pose_arms_out.png" }}
          style={styles.image}
        />
        <Text style={styles.header}>Auth App</Text>
        <Text style={styles.subheader}>Hello world!</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={COLORS.placeholder}
                style={styles.inputField}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={COLORS.placeholder}
                style={styles.inputField}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[styles.button, !errors.email && !errors.password ? {} : styles.buttonDisabled]}
          disabled={!!errors.email || !!errors.password}
        >
          <Text
            style={[
              styles.buttonText,
              !errors.email && !errors.password ? {} : styles.buttonTextDisabled,
            ]}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        <Link href={"/register"} asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>

      <Link href={"/privacy"} asChild>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text style={{ color: COLORS.placeholder }}>Privacy Policy</Text>
        </TouchableOpacity>
      </Link>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
    fontFamily: "LuckiestGuy_400Regular",
  },
  subheader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#fff",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    padding: 10,
    color: "#fff",
    backgroundColor: COLORS.input,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 4,
  },
  outlineButton: {
    marginVertical: 8,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inputContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
    justifyContent: "center",
  },
});
