import { Event } from "../types/eventTypes";
import { getDBConnection } from "./database";

export const insertEvents = async (events: Event[]) => {
  const db = await getDBConnection();

  await db.withTransactionAsync(async () => {
    for (const e of events) {
      await db.runAsync(
        `INSERT OR REPLACE INTO events 
          (id, title, description, date, venue, address, latitude, longitude, url, isFavourite)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          e.id,
          e.title,
          e.description,
          e.date,
          e.venue,
          e.address,
          e.latitude,
          e.longitude,
          e.url,
          e.isFavourite ? 1 : 0
        ]
      );
    }
  });

  return true;
};

// GET fav event
export const getFavouriteEvents = async (): Promise<Event[]> => {
  const db = await getDBConnection();

  return await db.getAllAsync<Event>(`
      SELECT * FROM events WHERE isFavourite = 1
  `);
};

// CHANGE fav event
export const changeFavEvent = async (id: string, current: boolean) => {
  const db = await getDBConnection();

  await db.runAsync(
    `UPDATE events SET isFavourite = ? WHERE id = ?`,
    [current ? 0 : 1, id]
  );

};



// ➤ Add event
export const addEvent = async (event: Omit<Event, "id">): Promise<number> => {
  const db = await getDBConnection();

  const result = await db.runAsync(
    `INSERT INTO events (title, description, date) VALUES (?, ?, ?)`,
    [event.title, event.description, event.date]
  );

  return result.lastInsertRowId;
};

// ➤ Get all events
export const getEvents = async (): Promise<Event[]> => {
  const db = await getDBConnection();
  return await db.getAllAsync<Event>(`SELECT * FROM events`);
};

// ➤ Delete event by id
export const deleteEvent = async (id: number) => {
  const db = await getDBConnection();

  await db.runAsync(
    `DELETE FROM events WHERE id = ?`,
    [id]
  );

  return true;
};

// ➤ Get single event
export const getEventById = async (id: number): Promise<Event | null> => {
  const db = await getDBConnection();
  return await db.getFirstAsync<Event>(`SELECT * FROM events WHERE id = ?`, [id]);
};
