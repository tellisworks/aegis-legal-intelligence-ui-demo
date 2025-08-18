import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, BarChart3, Eye, Download, ExternalLink, X } from "lucide-react";

interface MockModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: string;
}

export function MockExhibitModal({ isOpen, onClose, title, type }: MockModalProps) {
  const getExhibitContent = () => {
    switch (type) {
      case "email":
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded border">
              <div className="text-sm text-gray-600 mb-3">
                <strong>From:</strong> respondent@email.com<br/>
                <strong>To:</strong> dr.smith@psycheval.com<br/>
                <strong>Date:</strong> April 10, 2023, 2:47 PM<br/>
                <strong>Subject:</strong> Re: Psychological Evaluation Appointment
              </div>
              <div className="text-gray-800">
                Dr. Smith,<br/><br/>
                After consideration, I have decided not to attend the psychological evaluation scheduled for April 15th. I don't feel it's necessary at this time and would prefer to focus on other aspects of the case.<br/><br/>
                Please cancel my appointment.<br/><br/>
                Thank you,<br/>
                Respondent
              </div>
            </div>
            <div className="text-xs text-gray-500">
              <strong>Document Properties:</strong> PDF, 1 page, 247KB • Metadata verified • Digital signature present
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded">
              <div className="text-sm font-medium text-blue-900">Message Thread Analysis</div>
              <div className="text-xs text-blue-700 mt-1">47 consecutive messages over 17 days</div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <div className="text-sm font-medium">Petitioner (3/{14+i}, {i+1}:00 PM)</div>
                <div className="text-sm text-gray-700 mt-1">Can we please discuss the custody schedule for next week?</div>
                <div className="text-xs text-gray-500 mt-1">Status: Delivered, Not Responded</div>
              </div>
            ))}
            <div className="text-center text-gray-500 py-2">... 42 additional messages ...</div>
          </div>
        );
      case "discovery":
        return (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded border">
              <div className="font-medium text-red-900 mb-2">Interrogatory Item #7</div>
              <div className="text-sm text-gray-700">
                <strong>Question:</strong> Did Petitioner inform you of the psychological evaluation appointment?<br/>
                <strong>Response:</strong> "No, Petitioner never informed me of the evaluation."<br/>
                <strong>Signed Under Oath:</strong> Yes, penalty of perjury
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded border">
              <div className="font-medium text-green-900 mb-2">Contradictory Evidence</div>
              <div className="text-sm text-gray-700">
                Text message from Petitioner (March 8, 2023): "You are invited to attend the psychological evaluation on April 15th at Dr. Smith's office."
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <div className="text-gray-600">Mock exhibit content would be displayed here</div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>{title}</span>
            <Badge className="bg-blue-100 text-blue-800">Evidence</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {getExhibitContent()}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button size="sm" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Full Document
              </Button>
            </div>
            <Button onClick={onClose} variant="outline">
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MockAnalysisModal({ isOpen, onClose, title, type }: MockModalProps) {
  const getAnalysisContent = () => {
    switch (type) {
      case "communication":
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Communication Pattern Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm font-medium text-blue-900">Messages Sent</div>
                  <div className="text-2xl font-bold text-blue-700">47</div>
                  <div className="text-xs text-blue-600">Over 17 days</div>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <div className="text-sm font-medium text-red-900">Responses</div>
                  <div className="text-2xl font-bold text-red-700">0</div>
                  <div className="text-xs text-red-600">Complete silence</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Pattern:</strong> Systematic communication blocking indicative of deliberate obstruction tactics.
              </div>
            </Card>
          </div>
        );
      case "timeline":
        return (
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-sm font-medium">Timeline Reconstruction</div>
              <div className="text-xs text-gray-600 mt-1">Events sorted chronologically with source verification</div>
            </div>
            {[
              { date: "March 8", event: "Evaluation invitation sent", source: "Text Message" },
              { date: "March 15", event: "Contempt filing submitted", source: "Court Records" },
              { date: "April 10", event: "Evaluation declined", source: "Email Evidence" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white border rounded">
                <div>
                  <div className="text-sm font-medium">{item.event}</div>
                  <div className="text-xs text-gray-500">{item.date}, 2023</div>
                </div>
                <Badge variant="outline" className="text-xs">{item.source}</Badge>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <div className="text-gray-600">Mock analysis results would be displayed here</div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>{title}</span>
            <Badge className="bg-purple-100 text-purple-800">Analysis</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {getAnalysisContent()}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Close Analysis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MockReportModal({ isOpen, onClose, title }: { isOpen: boolean; onClose: () => void; title: string }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-600" />
            <span>{title}</span>
            <Badge className="bg-green-100 text-green-800">Court Ready</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded border">
            <h3 className="font-bold text-gray-900 mb-3">COURT MEMORANDUM</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>TO:</strong> The Honorable Court</p>
              <p><strong>FROM:</strong> Petitioner's Counsel</p>
              <p><strong>RE:</strong> Motion for Contempt - Evidence of Material Misrepresentations</p>
              <p><strong>DATE:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 border rounded">
            <h4 className="font-medium mb-3">EXECUTIVE SUMMARY</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>This memorandum presents AI-analyzed evidence demonstrating material contradictions in Respondent Jane Smith's court filings, supported by exhibit-anchored validation ensuring zero hallucination risk.</p>
              <p><strong>Key Findings:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Contradiction #1: False claim of evaluation exclusion (94% AI confidence)</li>
                <li>Communication obstruction pattern over 17-day period</li>
                <li>Systematic alienation behaviors documented in audio evidence</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 border border-yellow-200 rounded">
            <h4 className="font-medium text-yellow-900 mb-2">⚖️ Court-Defensible AI Analysis</h4>
            <div className="text-sm text-yellow-800">
              All findings are anchored to specific exhibits and human-validated by licensed attorneys. No AI hallucination risk - every statement is traceable to source evidence.
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Motion
              </Button>
            </div>
            <Button onClick={onClose} variant="outline">
              Close Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}