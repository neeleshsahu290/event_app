import EventCard from "@/app/components/EventCard";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEventStore } from "../hooks/useEventsList";

const FavouritesScreen = ({ navigation }: any) => {
  const { handleFavourite,favEvents } = useEventStore();
  

  if (favEvents.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No favourite events yet ❤️</Text>
        <Text style={styles.emptySub}>Tap the heart on any event to save it.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            item={item}
            navigation={navigation}
            onFavouritePress={() => handleFavourite(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  emptySub: {
    marginTop: 6,
    fontSize: 15,
    color: "#777",
  },
});
