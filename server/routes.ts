import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAuth, type AuthenticatedRequest } from "./auth-middleware";
import { insertInvitedUserSchema } from "../shared/schema";
import cookieParser from 'cookie-parser';

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cookie parser middleware
  app.use(cookieParser());

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { inviteCode } = req.body;
      
      if (!inviteCode) {
        return res.status(400).json({ error: "Invite code required" });
      }

      const user = await storage.getInvitedUserByInviteCode(inviteCode);
      if (!user || !user.isActive) {
        return res.status(401).json({ error: "Invalid or expired invite code" });
      }

      // Update accessed_at timestamp on login
      await storage.updateUserAccess(user.id);

      const session = await storage.createSession(user.id);
      
      // Log the access for admin tracking
      await storage.logAccess(user.id, req.ip, req.get('User-Agent'));
      
      // Set secure cookie
      res.cookie('authToken', session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req: AuthenticatedRequest, res) => {
    res.json({ user: req.user });
  });

  // Admin route to create invitations - TESTING MODE: Always creates new invite
  app.post("/api/admin/invite", async (req, res) => {
    try {
      const validatedData = insertInvitedUserSchema.parse(req.body);
      
      // For testing: Add timestamp to email to ensure uniqueness
      const testEmail = `${validatedData.email.split('@')[0]}+${Date.now()}@${validatedData.email.split('@')[1]}`;
      const modifiedData = { ...validatedData, email: testEmail };

      const user = await storage.createInvitedUser(modifiedData);
      
      res.json({
        success: true,
        user: {
          id: user.id,
          email: validatedData.email, // Show original email to user
          name: user.name,
          inviteCode: user.inviteCode,
          inviteUrl: `${req.protocol}://${req.get('host')}/login?code=${user.inviteCode}`,
        },
      });
    } catch (error) {
      console.error('Invite creation error:', error);
      res.status(500).json({ error: "Failed to create invitation" });
    }
  });

  // Admin route to view login activity
  app.get("/api/admin/activity", async (req, res) => {
    try {
      const users = await storage.getAllInvitedUsers();
      const accessLogs = await storage.getRecentAccessLogs();
      
      res.json({
        totalInvited: users.length,
        totalAccessed: users.filter(u => u.accessedAt).length,
        users: users.map(u => ({
          name: u.name,
          email: u.email,
          invitedAt: u.createdAt,
          lastAccessed: u.accessedAt,
          hasLoggedIn: !!u.accessedAt
        })).sort((a, b) => {
          if (a.lastAccessed && b.lastAccessed) {
            return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
          }
          if (a.lastAccessed && !b.lastAccessed) return -1;
          if (!a.lastAccessed && b.lastAccessed) return 1;
          return new Date(b.invitedAt).getTime() - new Date(a.invitedAt).getTime();
        }),
        recentActivity: accessLogs
      });
    } catch (error) {
      console.error('Activity fetch error:', error);
      res.status(500).json({ error: "Failed to fetch activity" });
    }
  });

  // Protected mock data endpoints for the demo
  app.get("/api/mock/contradictions", requireAuth, (req: AuthenticatedRequest, res) => {
    res.json([
      {
        statement: "I was excluded from the evaluation.",
        contradicted_by: "Mae Igi declined to attend the psychological evaluation.",
        source: "Email, 4/10/2023, Page 3, Line 12",
        confidence: 94,
        impact: "High",
        citation_link: "exhibits/email_041023.pdf"
      }
    ]);
  });

  app.get("/api/mock/misconduct", requireAuth, (req: AuthenticatedRequest, res) => {
    res.json([
      {
        accusation: "Tom never communicates.",
        reciprocal_evidence: "47 unanswered messages from Tom",
        source: "Exhibit D, Lines 33–49",
        impact: "High",
        message_trail_link: "exhibits/exhibit_d.pdf"
      }
    ]);
  });

  app.get("/api/mock/alienation", requireAuth, (req: AuthenticatedRequest, res) => {
    res.json([
      {
        pattern: "Pre-court Alienation Surge",
        occurrences: 4,
        example_quote: "You don't have to be afraid of your dad anymore.",
        cycle: ["Warm", "Accusation", "Victimhood", "Child Guilt"],
        view_timeline_link: "timeline/pattern_view.png"
      }
    ]);
  });

  app.get("/api/mock/timeline", requireAuth, (req: AuthenticatedRequest, res) => {
    res.json([
      {
        date: "2023-03-15",
        event: "Rule for Contempt Filed",
        type: "legal",
        source: "Court Docket"
      },
      {
        date: "2023-03-20",
        event: "Contradictory Statement Found",
        type: "contradiction",
        source: "Email, Page 3"
      },
      {
        date: "2023-03-25",
        event: "Emotional Pressure Message from Mae",
        type: "alienation",
        source: "Text Message Log"
      },
      {
        date: "2023-03-28",
        event: "Child Reports 'I'm afraid of Dad'",
        type: "pattern",
        source: "Counselor Notes"
      }
    ]);
  });

  // Report generation endpoint
  app.get("/api/mock/report", requireAuth, (req: AuthenticatedRequest, res) => {
    const reportHtml = `
      <h1>Aegis Legal Intelligence - Case Report</h1>
      <h2>Executive Summary</h2>
      <p>This report identifies contradictions, misconduct, and manipulation patterns with full citations.</p>
      <h2>Contradictions</h2>
      <ul><li>"I was excluded from the evaluation" vs. Email 4/10/2023 where Mae declined to attend.</li></ul>
      <h2>Reciprocal Misconduct</h2>
      <ul><li>Mae claimed Tom never communicates, but left 47 of his texts unanswered (Exhibit D).</li></ul>
      <h2>Parental Alienation</h2>
      <ul><li>Repeated pre-court statements such as "You don't have to be afraid of your dad anymore."</li></ul>
      <h2>Timeline Snapshot</h2>
      <ul>
      <li>Mar 15 – Rule for Contempt Filed</li>
      <li>Mar 20 – Contradiction Found</li>
      <li>Mar 25 – Emotional Pressure Message</li>
      <li>Mar 28 – Child Reports Fear</li>
      </ul>
    `;
    res.json({ html: reportHtml });
  });

  const httpServer = createServer(app);
  return httpServer;
}
