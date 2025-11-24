import { userRepo } from "@/app/bridge/repo/userRepo";
import { authStorage } from "@/app/bridge/storage/authStorage";
import { User } from "@/app/bridge/types/userTypes";
import { useState } from "react";
import { Alert, I18nManager } from "react-native";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
   
    setLoading(true);
    const id = await authStorage.getUserId();

    if (!id) {
      setLoading(false);
      return;
    }

    const result = await userRepo. getUser(id);

    setUser(result);
    setLoading(false);
  };

  const updateProfile = async (name: string, address: string) => {
    if (!user) return false;

    const success = await  userRepo. updateUser(user.id, name, address);
    if (success) {
      await loadProfile();
    }
    return success;
  };

  const logout = async () => {
    await authStorage.logout();
  };

  const toggleRTL = async () => {
    Alert.alert(
      "Restart Required",
      "Changing text direction requires restarting the app.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Restart",
          style: "destructive",
          onPress: async () => {
            const isRTL = !I18nManager.isRTL;
  
  
            I18nManager.forceRTL(isRTL);
            I18nManager.allowRTL(isRTL);
  
          
          },
        },
      ]
    );
  };
  

  return {
    user,
    loading,
    updateProfile,
    logout,
    loadProfile,
    toggleRTL
  };
};