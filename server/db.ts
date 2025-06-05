import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

console.log("Connecting to PostgreSQL database...");

// Create postgres client
export const client = postgres(process.env.DATABASE_URL, {
  max: 10, // Connection pool size
  idle_timeout: 20, // How long a connection can stay unused before being closed
  connect_timeout: 10 // Connection timeout in seconds
});

// Test the connection
client`SELECT 1`
  .then(() => console.log("Successfully connected to PostgreSQL"))
  .catch(err => console.error("Database connection error:", err));

export const db = drizzle(client, { schema });
