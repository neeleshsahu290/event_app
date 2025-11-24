import React from "react";
import { StyleSheet, Text } from "react-native";

const AuthTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default AuthTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111",
  },
});