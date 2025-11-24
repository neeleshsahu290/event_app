import { userRepo } from "@/app/bridge/repo/userRepo";
import { useState } from "react";
import { Alert } from "react-native";

export function useSignup() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Validation", "Please fill all required fields");
      return false;
    }

    if (password !== rePassword) {
      Alert.alert("Validation", "Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    setLoading(true);
    try {

        
                  await new Promise((resolve) => setTimeout(resolve, 1000));

      await userRepo.createUser(name, address, email, password);
      return true;

    } catch (err: any) {
      Alert.alert("Signup failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    name,
    address,
    email,
    password,
    rePassword,
    loading,

    // setters
    setName,
    setAddress,
    setEmail,
    setPassword,
    setRePassword,

    // action
    handleSignup,
  };
}
