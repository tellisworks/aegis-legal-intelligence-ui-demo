import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock data endpoints for the demo
  app.get("/api/mock/contradictions", (req, res) => {
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

  app.get("/api/mock/misconduct", (req, res) => {
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

  app.get("/api/mock/alienation", (req, res) => {
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

  app.get("/api/mock/timeline", (req, res) => {
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
  app.get("/api/mock/report", (req, res) => {
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
