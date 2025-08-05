import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for authentication
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => invitedUsers.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Invited users table - controls who can access the demo
export const invitedUsers = pgTable("invited_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  inviteCode: text("invite_code").notNull().unique(),
  isActive: boolean("is_active").default(true),
  accessedAt: timestamp("accessed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // Optional expiration
});

// Access logs to track who accessed the demo when
export const accessLogs = pgTable("access_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => invitedUsers.id),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  accessedAt: timestamp("accessed_at").defaultNow(),
});

export const insertInvitedUserSchema = createInsertSchema(invitedUsers).pick({
  email: true,
  name: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  userId: true,
  token: true,
  expiresAt: true,
});

export type InsertInvitedUser = z.infer<typeof insertInvitedUserSchema>;
export type InvitedUser = typeof invitedUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type AccessLog = typeof accessLogs.$inferSelect;
