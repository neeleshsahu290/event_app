import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    I18nManager,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  label?: string;
  value: string;
  placeholder?: string;
  secure?: boolean;
  keyboardType?: any;
  onChangeText: (t: string) => void;
  multiline?: boolean;
  editable?: boolean;
};

const PrimaryInputField = ({
  label,
  value,
  placeholder,
  secure,
  keyboardType = "default",
  onChangeText,
  multiline = false,
  editable = true,
}: Props) => {
  const [hide, setHide] = useState(secure);
  const isRTL = I18nManager.isRTL;

  return (
    <View style={[styles.group, isRTL && styles.groupRTL]}>
      {label ? (
        <Text style={[styles.label, isRTL && styles.textRTL]}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.inputWrapper,
          isRTL && styles.inputWrapperRTL,
          !editable && styles.disabledWrapper,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure ? hide : false}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          style={[
            styles.input,
            multiline && { height: 80, textAlignVertical: "top" },
            !editable && { color: "#999" },
            isRTL ? styles.inputRTL : styles.inputLTR,
          ]}
        />

        {secure && editable && (
          <TouchableOpacity
            style={[styles.eyeBtn, isRTL && styles.eyeBtnRTL]}
            onPress={() => setHide(!hide)}
          >
            <Ionicons
              name={hide ? "eye-off" : "eye"}
              size={20}
              color="#444"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PrimaryInputField;

const styles = StyleSheet.create({
  group: {
    marginBottom: 14,
  },
  groupRTL: {
    alignItems: "flex-end",
  },
  label: {
    marginBottom: 6,
    color: "#444",
    fontSize: 14,
  },
  textRTL: {
    textAlign: "right",
  },

  inputWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputWrapperRTL: {
    flexDirection: "row-reverse",
  },

  disabledWrapper: {
    backgroundColor: "#f0f0f0",
    opacity: 0.7,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
  },

  inputRTL: {
    textAlign: "right",
  },

  inputLTR: {
    textAlign: "left",
  },

  eyeBtn: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },

  eyeBtnRTL: {
    marginRight: 8,
  },
});