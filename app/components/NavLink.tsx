import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  question: string;
  linkText: string;
  onPress: () => void;
};

const NavLink = ({ question, linkText, onPress }: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{question}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavLink;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
  },
  text: {
    color: "#444",
  },
  link: {
    color: "#2b6ef6",
    fontWeight: "600",
    marginLeft: 5,
  },
});