import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

type Props = {
  title: string;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

const PrimaryButton = ({ title, loading, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.btn, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#2b6ef6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 18,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});