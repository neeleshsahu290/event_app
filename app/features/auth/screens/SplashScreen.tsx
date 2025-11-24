// SplashScreen.tsx
import { authStorage } from "@/app/bridge/storage/authStorage";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const t = setTimeout(async () => {
      const status = await authStorage.isLoggedIn();
      navigation.replace(status ? "Main" : "LoginScreen");
    }, 900);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.mainComponent}>
      <Image
        source={{ uri: "https://play-lh.googleusercontent.com/IOtDEuYmg528aIvxJq2B_way7oI_WSkD9XxZaVul6ykEIFCTQnMGcdWZ_4_pWBu4GVHf=w240-h480-rw" }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Event App</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
  },
});