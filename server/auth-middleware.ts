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

    // Get user by userId, not by invite code
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

    // Log the access
    const clientIp = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] as string;
    const userAgent = req.headers['user-agent'];
    await storage.logAccess(user.id, clientIp, userAgent);

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}