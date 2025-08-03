export interface Contradiction {
  statement: string;
  contradicted_by: string;
  source: string;
  confidence: number;
  impact: string;
  citation_link: string;
}

export interface Misconduct {
  accusation: string;
  reciprocal_evidence: string;
  source: string;
  impact: string;
  message_trail_link: string;
}

export interface AlienationPattern {
  pattern: string;
  occurrences: number;
  example_quote: string;
  cycle: string[];
  view_timeline_link: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  type: 'legal' | 'contradiction' | 'alienation' | 'pattern';
  source: string;
}

export const mockContradictions: Contradiction[] = [
  {
    statement: "I was excluded from the evaluation.",
    contradicted_by: "Jane Smith declined to attend the psychological evaluation.",
    source: "Email, 4/10/2023, Page 3, Line 12",
    confidence: 94,
    impact: "High",
    citation_link: "exhibits/email_041023.pdf"
  },
  {
    statement: "Petitioner never informed me of the evaluation.",
    contradicted_by: "Text message from Petitioner: 'You are invited to attend.'",
    source: "Opposing Discovery / Text Messages / Exhibit 14",
    confidence: 91,
    impact: "High", 
    citation_link: "exhibits/opposing_interrogatory_item7.pdf"
  }
];

export const mockMisconduct: Misconduct[] = [
  {
    accusation: "Petitioner never communicates.",
    reciprocal_evidence: "47 unanswered messages from Petitioner",
    source: "Exhibit D, Lines 33–49",
    impact: "High",
    message_trail_link: "exhibits/exhibit_d.pdf"
  },
  {
    accusation: "Cherry-picked evidence submitted to court",
    reciprocal_evidence: "Opposing emails show selective excerpts contradicting full thread context",
    source: "Email String Opposing Counsel / Full Thread Analysis",
    impact: "High",
    message_trail_link: "exhibits/email_string_analysis.pdf"
  }
];

export const mockAlienation: AlienationPattern[] = [
  {
    pattern: "Pre-court Alienation Surge",
    occurrences: 4,
    example_quote: "You don't have to be afraid of your dad anymore.",
    cycle: ["Warm", "Accusation", "Victimhood", "Child Guilt"],
    view_timeline_link: "timeline/pattern_view.png"
  }
];

export const mockTimeline: TimelineEvent[] = [
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
];
