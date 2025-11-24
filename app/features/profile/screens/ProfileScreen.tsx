// src/features/profile/screens/ProfileScreen.tsx
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInputField from "@/app/components/PrimaryTextFeild";
import { useRTL } from "@/app/core/localization/RTLState";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, I18nManager, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useProfile } from "../hooks/useProfile";

const ProfileScreen = ({ navigation }: any) => {

 

// const toggleRTL1 = async () => {
//   Alert.alert(
//     "Restart Required",
//     "Changing text direction requires restarting the app.",
//     [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Restart",
//         style: "destructive",
//         onPress: async () => {
//           const isRTL = !I18nManager.isRTL;


//           I18nManager.forceRTL(isRTL);
//           I18nManager.allowRTL(isRTL);

        
//         },
//       },
//     ]
//   );
// };

  const { user, loading, updateProfile, logout, refresh } = useProfile();
    const {isRTL,toggleRTL} = useRTL();
  

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const load = async () => {
      await refresh();
    };
    load();
    
  }, []);

  useEffect(() => {
    setName(user?.name ?? "");
    setAddress(user?.address ?? "");
  }, [user]);

  if (loading || !user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setSaving(true);
    await updateProfile(name, address);
    setSaving(false);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace("LoginScreen");
  };

  return (


    <View style={styles.container}>
          <View style={styles.feildCOntainer}>

      <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />

      <Text style={styles.email}>{user.email}</Text>

  
      <PrimaryInputField
        label="Full Name"
        value={name}
        onChangeText={setName}
        editable={isEditing}
      />

      <PrimaryInputField
        label="Address"
        value={address}
        onChangeText={setAddress}
        multiline
        editable={isEditing}
      />
      {/* RTL Toggle */}
<View style={styles.toggleRow}>
  <Text style={styles.toggleLabel}>Switch RTL</Text>
  <Switch
    value={isRTL}
    onValueChange={toggleRTL}
  />


  
</View>
  <TouchableOpacity  style={styles.rtlButton}>
  <Text style={styles.rtlText}>
    Switch to {I18nManager.isRTL ? "LTR" : "RTL"}
  </Text>
</TouchableOpacity>
    </View>
      <PrimaryButton
        title={isEditing ? "Save Changes" : "Edit Profile"}
        loading={saving}
        onPress={handleSave}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flex: 1,
  },
feildCOntainer:{
  flex:1
},
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  avatar: {
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 60,
    marginBottom: 20,
  },

  email: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },

  logoutBtn: {
    marginTop: 30,
    alignSelf: "center",
  },

  logoutText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: 12,
  paddingVertical: 10,
  paddingHorizontal: 5,
},

toggleLabel: {
  fontSize: 16,
  color: "#444",
},
rtlButton: {
  marginTop: 15,
  alignSelf: "center",
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: "#E0E0E0",
  borderRadius: 8,
},
rtlText: {
  color: "#333",
  fontSize: 16,
  fontWeight: "600",
},
});


