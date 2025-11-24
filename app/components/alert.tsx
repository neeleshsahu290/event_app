import { Alert } from "react-native";

type AlertProps = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
};

export const AppAlert = ({
  title,
  message,
  cancelText = "Cancel",
  confirmText = "OK",
  onConfirm,
}: AlertProps) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        style: "cancel",
      },
      {
        text: confirmText,
        style: "destructive",
        onPress: () => {
          if (onConfirm) onConfirm();
        },
      },
    ]
  );
};