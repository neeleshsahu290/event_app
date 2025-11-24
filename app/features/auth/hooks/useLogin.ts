import { userRepo } from "@/app/bridge/repo/userRepo";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation", "Please enter email & password");
      return false;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isLogin = await userRepo.login(email, password);

      if (isLogin) {
        return true;
      }
    } catch (error: any) {
      Alert.alert("Login failed", error.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,

    setEmail,
    setPassword,

    login,
  };
};
