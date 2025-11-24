import NavLink from "@/app/components/NavLink";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInputField from "@/app/components/PrimaryTextFeild";
import AuthTitle from "@/app/components/Title";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from "react-native";
import { useSignup } from "../hooks/useSignUp";

const SignupScreen = ({ navigation }: any) => {
  const {
    name,
    address,
    email,
    password,
    rePassword,
    loading,

    setName,
    setAddress,
    setEmail,
    setPassword,
    setRePassword,

    handleSignup,
  } = useSignup();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <AuthTitle title="Create an account" />

        <PrimaryInputField
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />

        <PrimaryInputField
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Address (optional)"
          multiline
          
        />

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
          placeholder="Password"
          secure
        />

        <PrimaryInputField
          label="Re-enter password"
          value={rePassword}
          onChangeText={setRePassword}
          placeholder="Repeat password"
          secure
        />

        <PrimaryButton
          title="Sign Up"
          loading={loading}
          onPress={async () => {const isDone= await handleSignup()
            if(isDone){
              navigation.replace("Main"); }
          }}
        />


        <NavLink
          question="Already have an account?"
          linkText="Login"
          onPress={() => navigation.navigate("LoginScreen")}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
 
});
