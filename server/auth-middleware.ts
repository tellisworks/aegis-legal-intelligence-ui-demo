import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required', redirect: '/login' });
    }

    const session = await storage.getSessionByToken(token);
    if (!session) {
      res.clearCookie('authToken');
      return res.status(401).json({ error: 'Invalid or expired session', redirect: '/login' });
    }

    // Handle admin user specially
    if (session.userId === "admin") {
      req.user = {
        id: "admin",
        email: "admin@aegislegal.com",
        name: "Admin User",
      };
    } else {
      // Get regular user by userId
      const users = await storage.getAllInvitedUsers();
      const user = users.find(u => u.id === session.userId);
      if (!user || !user.isActive) {
        await storage.deleteSession(token);
        res.clearCookie('authToken');
        return res.status(401).json({ error: 'Access revoked', redirect: '/login' });
      }

      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }

    // Log the access (skip for admin)
    if (req.user.id !== "admin") {
      const clientIp = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] as string;
      const userAgent = req.headers['user-agent'];
      await storage.logAccess(req.user.id, clientIp, userAgent);
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}