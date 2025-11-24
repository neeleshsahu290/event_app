// src/database/database.ts
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

// ---------------------------------------------------------
// Open Database
// ---------------------------------------------------------
export const getDBConnection = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("app.db");
  }
  return db;
};

// ---------------------------------------------------------
// Initialize All Tables (Events + Users)
// ---------------------------------------------------------
export const initDatabase = async () => {
  const database = await getDBConnection();

  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    -- EVENTS TABLE
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      venue TEXT,
      address TEXT,
      latitude TEXT,
      longitude TEXT,
      url TEXT,
      isFavourite INTEGER DEFAULT 0
    );

    -- USERS TABLE
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
};