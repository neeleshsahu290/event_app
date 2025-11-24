// screens/LoginScreen.tsx
import NavLink from "@/app/components/NavLink";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInputField from "@/app/components/PrimaryTextFeild";
import AuthTitle from "@/app/components/Title";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useLogin } from "../hooks/useLogin";

const LoginScreen = ({ navigation }: any) => {

  const {
    email,
    password,
   
    loading,
    setEmail,
    setPassword,
  
    login,
  } = useLogin();

  const handleLogin = async () => {
    const success = await login();
    if (success) {
      navigation.replace("Main"); // move to home
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <AuthTitle title="Login" />

        <PrimaryInputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
        />

        <PrimaryInputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secure
          placeholder="Password"
        />

        <PrimaryButton title="Login" loading={loading} onPress={handleLogin} />
        <NavLink
          question="Don't have an account?"
          linkText="Sign up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

});
