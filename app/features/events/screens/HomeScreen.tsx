import EventCard from "@/app/components/EventCard";
import SearchBar from "@/app/components/SearchBar";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEventStore } from "../hooks/useEventsList";

export default function HomeScreen({ navigation }: any) {
  const {
    events,
    loading,
    hasMore,
    loadMore,
    getEvents: refreshEvents,
    handleFavourite,
    init,
    searchTextChange: search,
    isSearch,
    searchEvents,
    onSearchClick,
    searchText,
    clearSearch,
  } = useEventStore();

  useEffect(() => {
    init();
  }, []);

  const dataToShow = isSearch ? searchEvents : events;
  const showLoader = loading && dataToShow.length === 0;

  return (
    <View style={styles.screen}>
      <SearchBar
        textChange={search}
        submit={onSearchClick}
        searchText={searchText}
        onClearClick={clearSearch}
        isSearch={isSearch}
      />

      {showLoader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loaderText}>Loading Events...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={dataToShow}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <EventCard
              item={item}
              navigation={navigation}
              onFavouritePress={(event) => handleFavourite(event)}
            />
          )}
          ListFooterComponent={
            isSearch ? (
              <View style={styles.spacer} />
            ) : hasMore ? (
              <View style={styles.footerLoaderContainer}>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <Text style={styles.footerText}>No more events</Text>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 90, 
  },
  loaderText: {
    marginTop: 8,
    color: "#333",
  },
  listContent: {
    paddingTop: 8, 
    paddingBottom: 24,
  },
  spacer: {
    height: 20,
  },
  footerLoaderContainer: {
    paddingVertical: 20,
  },
  footerText: {
    textAlign: "center",
    padding: 20,
    color: "#888",
  },
});