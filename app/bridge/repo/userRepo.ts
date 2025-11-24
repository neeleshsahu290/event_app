// src/database/userRepo.ts
import { Alert } from "react-native";
import { authStorage } from "../storage/authStorage";
import {
    addUser,
    deleteUser,
    getUserById,
    loginUser,
    updateUser,
} from "../storage/userDb";

export const userRepo = {
  createUser: async (
    name: string,
    address: string,
    email: string,
    password: string
  ) => {
    const id = await addUser(name, address, email, password);
    if (id != null) {
      await authStorage.setUserId(id);
    }
    return false;
  },

  login: async (email: string, password: string) => {
    const user = await loginUser(email, password);

    if (user) {
      await authStorage.setUserId(user.id);

      return true;
    } else {
      Alert.alert("Login Error", "Invalid credentials");
      return false;
    }
  },

  getUser: async (id: number) => {
    return await getUserById(id);
  },

  updateUser: async (id: number, name: string, address: string) => {
    return await updateUser(id, name, address);
  },

  deleteUser: async (id: number) => {
    return await deleteUser(id);
  },
};
