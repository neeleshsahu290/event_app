import { APP_KEYS } from "@/app/core/constants/appkeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authStorage = {
  // Save login status
  setLoggedIn: async (value: boolean) => {
    await AsyncStorage.setItem(APP_KEYS.IS_LOGGED_IN, value ? "1" : "0");
  },

  
  // Save logged-in user id
  setUserId: async (id: number) => {
    await AsyncStorage.setItem(APP_KEYS.USER_ID, String(id));
    await AsyncStorage.setItem(APP_KEYS.IS_LOGGED_IN, "1");
  },

  // Get login status
  isLoggedIn: async (): Promise<boolean> => {
    const val = await AsyncStorage.getItem(APP_KEYS.IS_LOGGED_IN);
    return val === "1";
  },

  // Get saved user id
  getUserId: async (): Promise<number | null> => {
    const id = await AsyncStorage.getItem(APP_KEYS.USER_ID);

    if (!id) return null;

    const num = Number(id);

    return isNaN(num) ? null : num;
  },

  // Logout → clear everything
  logout: async () => {
    await AsyncStorage.multiRemove([APP_KEYS.IS_LOGGED_IN, APP_KEYS.USER_ID]);
  },
};
