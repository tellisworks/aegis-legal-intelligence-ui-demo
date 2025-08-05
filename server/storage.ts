import { invitedUsers, sessions, accessLogs, type InsertInvitedUser, type InvitedUser, type Session, type AccessLog } from "../shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

// Interface for storage operations
export interface IStorage {
  // Invitation operations
  createInvitedUser(insertUser: InsertInvitedUser): Promise<InvitedUser>;
  getInvitedUserByEmail(email: string): Promise<InvitedUser | undefined>;
  getInvitedUserByInviteCode(inviteCode: string): Promise<InvitedUser | undefined>;
  getAllInvitedUsers(): Promise<InvitedUser[]>;
  deactivateUser(userId: string): Promise<void>;
  
  // Session operations
  createSession(userId: string): Promise<Session>;
  getSessionByToken(token: string): Promise<Session | undefined>;
  deleteSession(token: string): Promise<void>;
  
  // Access logging
  logAccess(userId: string, ipAddress?: string, userAgent?: string): Promise<AccessLog>;
  updateUserAccess(userId: string): Promise<void>;
  getRecentAccessLogs(): Promise<AccessLog[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async createInvitedUser(insertUser: InsertInvitedUser): Promise<InvitedUser> {
    const inviteCode = crypto.randomBytes(16).toString('hex');
    const [user] = await db
      .insert(invitedUsers)
      .values({
        ...insertUser,
        inviteCode,
      })
      .returning();
    return user;
  }

  async getInvitedUserByEmail(email: string): Promise<InvitedUser | undefined> {
    const [user] = await db.select().from(invitedUsers).where(eq(invitedUsers.email, email));
    return user;
  }

  async getInvitedUserByInviteCode(inviteCode: string): Promise<InvitedUser | undefined> {
    const [user] = await db.select().from(invitedUsers).where(
      and(
        eq(invitedUsers.inviteCode, inviteCode),
        eq(invitedUsers.isActive, true)
      )
    );
    return user;
  }

  async getAllInvitedUsers(): Promise<InvitedUser[]> {
    return await db.select().from(invitedUsers);
  }

  async deactivateUser(userId: string): Promise<void> {
    await db.update(invitedUsers)
      .set({ isActive: false })
      .where(eq(invitedUsers.id, userId));
  }

  async createSession(userId: string): Promise<Session> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const [session] = await db
      .insert(sessions)
      .values({
        userId,
        token,
        expiresAt,
      })
      .returning();
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      // Clean up expired session
      await this.deleteSession(token);
    }
    return undefined;
  }

  async deleteSession(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  async logAccess(userId: string, ipAddress?: string, userAgent?: string): Promise<AccessLog> {
    const [log] = await db
      .insert(accessLogs)
      .values({
        userId,
        ipAddress,
        userAgent,
      })
      .returning();
    return log;
  }

  async updateUserAccess(userId: string): Promise<void> {
    await db.update(invitedUsers)
      .set({ accessedAt: new Date() })
      .where(eq(invitedUsers.id, userId));
  }

  async getRecentAccessLogs(): Promise<AccessLog[]> {
    return await db.select().from(accessLogs).limit(50);
  }
}

export const storage = new DatabaseStorage();