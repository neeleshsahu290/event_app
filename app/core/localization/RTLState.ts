import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const RTL_KEY = "APP_RTL_MODE";

type RTLStore = {
  isRTL: boolean;
  loading: boolean;
  loadRTL: () => Promise<void>;
  toggleRTL: () => Promise<void>;
};

export const useRTL = create<RTLStore>((set, get) => ({
  isRTL: false,
  loading: true,

  // Load saved RTL value
  loadRTL: async () => {
    const saved = await AsyncStorage.getItem(RTL_KEY);
    const rtl = saved === "1";

    set({ isRTL: rtl, loading: false });
  },

  // Toggle and save
  toggleRTL: async () => {
    const current = get().isRTL;
    const updated = !current;

    await AsyncStorage.setItem(RTL_KEY, updated ? "1" : "0");
    set({ isRTL: updated });
  },
}));