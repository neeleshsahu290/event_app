import { eventRepo } from "@/app/bridge/repo/eventRepo";
import { Event } from "@/app/bridge/types/eventTypes";
import { create } from "zustand";

const PAGE_SIZE = 20;

type EventStore = {
  events: Event[];
  favEvents: Event[];
  searchEvents: Event[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  isSearch: boolean;
  searchText: string;

  init: () => Promise<void>;
  getEvents: () => Promise<void>;
  loadMore: () => Promise<void>;
  getFavouriteEvents: () => Promise<void>;
  handleFavourite: (event: Event) => Promise<void>;
  searchTextChange: (text: string) => void;
  onSearchClick:()=> void;
  clearSearch: () => void;

};

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  favEvents: [],
  searchEvents: [],
  loading: false,
  page: 0,
  hasMore: true,
  isSearch: false,
  searchText: "",
  searchTextChange: (text: string) => {
    set({ searchText: text,  });
  
  },
  onSearchClick:()=>{
     set({  isSearch: true, loading:true });
    get().getEvents();
  },
  clearSearch: () => {
    set({ searchEvents: [], searchText: "", isSearch: false });
  },

  init: async () => {
    set({ loading: true });

    await Promise.all([get().getEvents(), get().getFavouriteEvents()]);

    set({ loading: false });
  },

  getEvents: async () => {
    set({ loading: true, page: 0, hasMore: true });

    const data = await eventRepo.syncFromApi(0, PAGE_SIZE,get().searchText);
    const favMap = Object.fromEntries(get().favEvents.map((e) => [e.id, true]));

    // merge favourite flags
    const merged = data.map((e) => ({
      ...e,
      isFavourite: !!favMap[e.id],
    }));
    if (get().isSearch === true) {
      set({ searchEvents: merged, loading: false });
    } else {
      set({ events: merged, loading: false });
    }
  },

  //  Load more events 
  loadMore: async () => {
    const { page, hasMore, loading } = get();
    if (!hasMore || loading) return;

    set({ loading: true });

    const nextPage = page + 1;
    const data = await eventRepo.syncFromApi(nextPage, PAGE_SIZE,get().searchText);

    if (data.length < PAGE_SIZE) set({ hasMore: false });

    const favMap = Object.fromEntries(get().favEvents.map((e) => [e.id, true]));

    const merged = data.map((e) => ({
      ...e,
      isFavourite: !!favMap[e.id],
    }));

    if (get().isSearch === true) {
      set({
        searchEvents: [...get().searchEvents, ...merged],
        page: nextPage,
        loading: false,
      });
    } else {
      set({
        events: [...get().events, ...merged],
        page: nextPage,
        loading: false,
      });
    }
  },

  // get Favourites
  getFavouriteEvents: async () => {
    const favData = await eventRepo.getFavouriteEvents();
    set({ favEvents: favData });
  },

  //  Toggle favourite 
  handleFavourite: async (event: Event) => {
    const newStatus = !event.isFavourite;

    await eventRepo.changeFavEventStatus(event.id, newStatus);

    // Update main events
    set({
      events: get().events.map((e) =>
        e.id === event.id ? { ...e, isFavourite: newStatus } : e
      ),
    });

    // Update favourite list
    if (newStatus) {
      set({ favEvents: [...get().favEvents, { ...event, isFavourite: true }] });
    } else {
      set({
        favEvents: get().favEvents.filter((e) => e.id !== event.id),
      });
    }
  },
}));
