import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ExhibitItem {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  pages: number;
  type: 'email' | 'text' | 'document' | 'photo' | 'audio';
  relevantTo: string[];
}

const mockExhibits: ExhibitItem[] = [
  {
    id: "EX-001",
    title: "Email - Mae Declining Evaluation",
    description: "Email from Mae Igi stating she will not attend the psychological evaluation",
    source: "mae.igi@email.com",
    date: "2023-04-10",
    pages: 1,
    type: "email",
    relevantTo: ["Contradiction #1"]
  },
  {
    id: "EX-002", 
    title: "Text Message Thread - Unanswered Communications",
    description: "47 consecutive text messages from Tom to Mae with no responses",
    source: "Phone Records",
    date: "2023-03-15 to 2023-04-01",
    pages: 12,
    type: "text",
    relevantTo: ["Misconduct #1"]
  },
  {
    id: "EX-003",
    title: "Audio Recording - 'Don't be afraid of dad'",
    description: "Recording of Mae telling child 'You don't have to be afraid of your dad anymore'",
    source: "Client Recording Device",
    date: "2023-03-28",
    pages: 1,
    type: "audio",
    relevantTo: ["Alienation Pattern #1"]
  },
  {
    id: "EX-004",
    title: "Court Filing - Rule for Contempt",
    description: "Original contempt filing with Mae's claims of exclusion",
    source: "Court Records",
    date: "2023-03-15",
    pages: 8,
    type: "document",
    relevantTo: ["Contradiction #1"]
  }
];

export default function ExhibitViewer() {
  const getTypeIcon = (type: ExhibitItem['type']) => {
    switch (type) {
      case 'email': return '📧';
      case 'text': return '💬'; 
      case 'document': return '📄';
      case 'photo': return '📷';
      case 'audio': return '🎵';
      default: return '📎';
    }
  };

  const getTypeColor = (type: ExhibitItem['type']) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'text': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-gray-100 text-gray-800';
      case 'photo': return 'bg-purple-100 text-purple-800';
      case 'audio': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence Exhibits</h3>
        <p className="text-gray-600">Court-ready exhibits supporting AI findings with full chain of custody.</p>
      </div>

      <div className="grid gap-4">
        {mockExhibits.map((exhibit, index) => (
          <motion.div
            key={exhibit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTypeIcon(exhibit.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{exhibit.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{exhibit.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {exhibit.date}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {exhibit.source}
                      </span>
                      <span>{exhibit.pages} page{exhibit.pages > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={`text-xs ${getTypeColor(exhibit.type)}`}>
                    {exhibit.id}
                  </Badge>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Supports:</p>
                <div className="flex flex-wrap gap-1">
                  {exhibit.relevantTo.map((relevance, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {relevance}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="mr-1 h-3 w-3" />
                  Cite
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}