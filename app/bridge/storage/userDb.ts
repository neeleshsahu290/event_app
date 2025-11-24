import { User } from "../types/userTypes";
import { getDBConnection } from "./database";

// ---------------------------------------------------------
// Add a new user (Signup)
// ---------------------------------------------------------
export const addUser = async (
  name: string,
  address: string,
  email: string,
  password: string
): Promise<number|null> => {
  const db = await getDBConnection();

  try {
    await db.runAsync(
      `INSERT INTO users (name, address, email, password) VALUES (?, ?, ?, ?)`,
      [name, address, email.toLowerCase(), password]
    );
    
    const user = await db.getFirstAsync<{ id: number }>(
      `SELECT last_insert_rowid() as id;`
    );

    if (!user?.id) return null;

    
    return user?.id


  } catch (e: any) {
    console.log("User Signup Error:", e.message);
    return null;
  }
};

// ---------------------------------------------------------
// Validate Login (email + password)
// ---------------------------------------------------------
export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const db = await getDBConnection();

  const result = await db.getFirstAsync<User>(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email.toLowerCase(), password]
  );

  return result ?? null;
};

// ---------------------------------------------------------
// Get user by ID (strict User type)
// ---------------------------------------------------------
export const getUserById = async (id: number): Promise<User | null> => {
  const db = await getDBConnection();

  const result = await db.getFirstAsync<User>(
    `SELECT * FROM users WHERE id = ?`,
    [id]
  );

  return result ?? null;
};

// ---------------------------------------------------------
// Update user profile
// ---------------------------------------------------------
export const updateUser = async (
  id: number,
  name: string,
  address: string
): Promise<boolean> => {
  const db = await getDBConnection();

  await db.runAsync(
    `UPDATE users SET name = ?, address = ? WHERE id = ?`,
    [name, address, id]
  );
  return true;
};

// ---------------------------------------------------------
// Delete user
// ---------------------------------------------------------
export const deleteUser = async (id: number): Promise<boolean> => {
  const db = await getDBConnection();

  await db.runAsync(`DELETE FROM users WHERE id = ?`, [id]);

  return true;
};