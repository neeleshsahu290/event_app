

import { Event } from "@/app/bridge/types/eventTypes";
import { wp } from "@/app/core/constants/dimensions";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Event;
  onFavouritePress?: (event: Event) => void;
   navigation :any
};

const EventCard = ({ item, onFavouritePress ,navigation}: Props) => {

  const imageUrl =
    item.url ||
    "https://via.placeholder.com/500x300.png?text=No+Image";

  const isFav = item.isFavourite === true;

  return (
    <TouchableOpacity
      style={styles.touchableBox}
      onPress={() => navigation.navigate("EventDetails", { event: item })}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* TITLE + VENUE + FAV */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.venue} numberOfLines={1}>
            📍 {item.venue || "Unknown Venue"}
          </Text>
        </View>

        {/* ❤️ Favourite Button */}
        <TouchableOpacity
          onPress={() => onFavouritePress?.(item)}
          style={styles.favButton}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={26}
            color={isFav ? "red" : "#666"}
          />
        </TouchableOpacity>
      </View>

      {/* DATE */}
      <View style={styles.dateRow}>
        <Ionicons name="calendar" size={20} color="#6c63ff" />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
};



export default EventCard;

const styles = StyleSheet.create({
  touchableBox: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 10,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },
  favButton: {
    padding: 5,
  },
  image: {
    height: wp(45),
    borderRadius: 20,
    width: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#121212",
  },
  venue: {
    marginTop: 4,
    color: "#555",
    fontSize: 14,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    marginTop: 4,
  },
  dateText: {
    marginLeft: 6,
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },
});
