 // src/features/profile/hooks/useProfile.ts
import { userRepo } from "@/app/bridge/repo/userRepo";
import { authStorage } from "@/app/bridge/storage/authStorage";
import { User } from "@/app/bridge/types/userTypes";
import { useState } from "react";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    console.log("done")
    setLoading(true);
    const id = await authStorage.getUserId();
        console.log("id"+id)

    if (!id) {
      setLoading(false);
      return;
    }

    const result = await userRepo. getUser(id);
        console.log("result")

    console.log(result)
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


  return {
    user,
    loading,
    refresh: loadProfile,
    updateProfile,
    logout,
    loadProfile
  };
};