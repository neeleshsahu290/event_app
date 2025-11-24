import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  textChange?: (text: string) => void;
  submit?: () => void;
  searchText: string;
  onClearClick: () => void;
  isSearch: boolean;
};
const SearchBar = ({
  textChange,
  submit,
  searchText,
  onClearClick,
  isSearch,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={25} />
        <TextInput
          placeholder="Search"
          onChangeText={textChange}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={submit}
        />
       {/* {isSearch && ( <Ionicons name="close" size={30} color={"red"} onPress={onClearClick}/>)} */}
      </View>
      {isSearch && (
        <View style={styles.bottomRow}>
          <Text style={styles.searchText}>{searchText}</Text>

          <TouchableOpacity onPress={onClearClick}>
            <Text style={styles.clearBtn}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
        {!isSearch && (<View style={{height:15}}/>)}

    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    elevation: 1,
  },

  searchContainer: {
    marginTop: 20,
    
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4E4B66",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 2,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    color: "grey",
  },
  bottomRow: {
    marginTop: 8,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:10
  },

  searchText: {
    fontSize: 14,
    color: "#555",
  },

  clearBtn: {
    fontSize: 14,
    color: "#E63946", // red clear button
    fontWeight: "600",
  },
});
