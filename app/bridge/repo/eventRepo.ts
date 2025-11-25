import ApiManager from "@/app/bridge/api/ApiManager";
import {
  changeFavEvent,
  getFavouriteEvents,
  insertEvents,
} from "@/app/bridge/storage/eventDb";
import { Event, EventsData, EventsEntity } from "@/app/bridge/types/eventTypes";

export const eventRepo = {
  syncFromApi: async (page: number = 0, size:number=20, search?:string): Promise<Event[]> => {
    const response: EventsData = await ApiManager.getEvents({
      apikey: "<Api key>",
      classificationName: "music",
      dmaId: 324,
      page: page,
      size: size,
      keyword:search
    });

    const items: EventsEntity[] = response?._embedded?.events || [];

    const formattedEvents: Event[] = items.map((e) => {
      const venue = e?._embedded?.venues?.[0];
      const url = e?.images?.[0].url ?? "";

      return {
        id: e.id,
        title: e.name,
        date: e.dates?.start?.localDate || "",
        venue: venue?.name || "Unknown Venue",
        address: getAddress(venue),
        url: url,
        latitude: venue?.location?.latitude || "",
        longitude: venue?.location?.longitude || "",
        description: e?.info || "",
        image: e?.images?.[0]?.url || "",
      };
    });

    await insertEvents(formattedEvents);
    return formattedEvents;
  },

  getFavouriteEvents: async () => {
    return await getFavouriteEvents();
  },

  changeFavEventStatus: async (id: string, status: boolean) => {
    return await changeFavEvent(id, status);
  },
};

export const getAddress = (venue: any): string => {
  if (!venue) return "Unknown Address";

  const line1 = venue?.address?.line1 || "";
  const city = venue?.city?.name || "";
  const state = venue?.state?.stateCode || "";
  const postalCode = venue?.postalCode || "";
  const country = venue?.country?.countryCode || "";

  // Clean filter → remove empty values
  const parts = [line1, city, state, postalCode, country].filter(
    (item) => item && item.length > 0
  );

  return parts.join(", ");
};
