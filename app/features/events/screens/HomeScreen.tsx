import EventCard from "@/app/components/EventCard";
import SearchBar from "@/app/components/SearchBar";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
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
  clearSearch
} = useEventStore();



  useEffect(() => {
    init();
  }, []);
const dataToShow = isSearch ? searchEvents : events;
  if (loading && dataToShow.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading Events...</Text>
      </View>
    );
  }

  return (

      <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
       
        <FlatList
          contentContainerStyle={{ paddingTop: 90 }}   

       
          data={ dataToShow}
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
            hasMore ? (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <Text style={{ textAlign: "center", padding: 20, color: "#888" }}>
                No more events
              </Text>
            )
          }

        />
         <SearchBar textChange={search} submit={onSearchClick} searchText={searchText} onClearClick={clearSearch} isSearch={isSearch}  />
      </View>
  
  );
}
