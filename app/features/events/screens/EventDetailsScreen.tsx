import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Event } from "@/app/bridge/types/eventTypes";
import { useEventStore } from "../hooks/useEventsList";

type RouteParams = {
  EventDetails: {
    event: Event;
  };
};

export default function EventDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, "EventDetails">>();
  const { event } = route.params;

  const { handleFavourite } = useEventStore();
  const [isFav ,setIsFav] =useState(false)
  
  useEffect(()=>{

  const status = event.isFavourite ? true : false;
    setIsFav(status);
  },[])





  const openMap = () => {
    if (!event.latitude || !event.longitude) return;
    const url = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <Image source={{ uri: event.url }} style={styles.image} />

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* FAVOURITE BUTTON */}
      <TouchableOpacity
        style={styles.favBtn}
        onPress={() =>{ 
          setIsFav(!isFav)
          
          handleFavourite(event)}}
      >
        <Ionicons
          name={isFav ? "heart" : "heart-outline"}
          size={30}
          color="red"
        />
      </TouchableOpacity>

      <View style={styles.contentBox}>
        {/* Title + Venue */}
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.venue}>📍 {event.venue}</Text>
        <Text style={styles.address}>{event.address}</Text>

        {/* Date */}
        <Text style={styles.date}>📅 {event.date}</Text>

        {/* Description */}
        <Text style={styles.description}>
          {event.description || "No description available."}
        </Text>

    
        {event.latitude && event.longitude ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: Number(event.latitude),
                longitude: Number(event.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={openMap}
            >
              <Marker
                coordinate={{
                  latitude: Number(event.latitude),
                  longitude: Number(event.longitude),
                }}
                title={event.venue}
                description={event.address}
              />
            </MapView>

            <TouchableOpacity style={styles.mapBtn} onPress={openMap}>
              <Ionicons name="map" size={24} color="#fff" />
              <Text style={styles.mapBtnText}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 250 },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  favBtn: {
     position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 8,
    borderRadius: 50,
  },
  contentBox: { padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 5 },
  venue: { fontSize: 16, fontWeight: "600", color: "#555" },
  address: { fontSize: 14, color: "#777", marginTop: 4 },
  date: { fontSize: 16, marginTop: 10, fontWeight: "500" },
  description: {
    fontSize: 14,
    marginTop: 14,
    color: "#444",
    lineHeight: 20,
  },
  mapContainer: {
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  map: { height: 250, width: "100%" },
  mapBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6c63ff",
    padding: 12,
    justifyContent: "center",
  },
  mapBtnText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});
