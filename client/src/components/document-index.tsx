import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DocumentItem {
  id: string;
  exhibit: string;
  title: string;
  description: string;
  source: string;
  date: string;
  pages: number;
  type: 'email' | 'text' | 'document' | 'photo' | 'audio' | 'filing';
  status: 'available' | 'processing' | 'cited';
  relevantFindings: string[];
  pageReferences?: string;
}

const documentDatabase: DocumentItem[] = [
  {
    id: "DOC-001",
    exhibit: "Exhibit A",
    title: "Email - Respondent Declining Psychological Evaluation",
    description: "Email from Jane Smith stating she will not attend the psychological evaluation appointment",
    source: "respondent@email.com",
    date: "2023-04-10",
    pages: 1,
    type: "email",
    status: "cited",
    relevantFindings: ["Contradiction #1"],
    pageReferences: "Page 3, Line 12"
  },
  {
    id: "DOC-002",
    exhibit: "Exhibit B", 
    title: "Text Message Thread - Unanswered Communications",
    description: "47 consecutive text messages from Petitioner to Jane Smith with no responses over 17-day period",
    source: "Phone Records - Verizon",
    date: "2023-03-15 to 2023-04-01",
    pages: 12,
    type: "text",
    status: "cited",
    relevantFindings: ["Misconduct #1"],
    pageReferences: "Lines 33-49"
  },
  {
    id: "DOC-003",
    exhibit: "Exhibit C",
    title: "Audio Recording - Alienation Statement",
    description: "Recording of Jane Smith telling child 'You don't have to be afraid of your dad anymore'",
    source: "Client Recording Device - iPhone 12",
    date: "2023-03-28",
    pages: 1,
    type: "audio",
    status: "cited",
    relevantFindings: ["Alienation Pattern #1"],
    pageReferences: "Timestamp 02:34"
  },
  {
    id: "DOC-004",
    exhibit: "Exhibit D",
    title: "Court Filing - Original Rule for Contempt",
    description: "Jane Smith's original contempt filing containing claims of exclusion from evaluation",
    source: "Clark County Family Court",
    date: "2023-03-15",
    pages: 8,
    type: "filing",
    status: "cited",
    relevantFindings: ["Contradiction #1"],
    pageReferences: "Page 2, Para 4"
  },
  {
    id: "DOC-005",
    exhibit: "Exhibit E",
    title: "Counselor Session Notes",
    description: "Child therapy session notes documenting statements about father",
    source: "Dr. Johnson, LMFT",
    date: "2023-03-28",
    pages: 3,
    type: "document",
    status: "available",
    relevantFindings: ["Alienation Pattern #1"]
  },
  {
    id: "DOC-006",
    exhibit: "Exhibit F",
    title: "School Communication Records",
    description: "Email exchanges between Jane Smith and school blocking father's access to information",
    source: "Elementary School",
    date: "2023-02-20 to 2023-03-10",
    pages: 6,
    type: "email",
    status: "available",
    relevantFindings: ["Misconduct #1"]
  },
  {
    id: "DOC-007",
    exhibit: "Exhibit G",
    title: "Opposing Interrogatory Responses",
    description: "Discovery responses from opposing party containing contradictory statements",
    source: "Opposing Counsel Filing",
    date: "2023-03-20",
    pages: 15,
    type: "filing",
    status: "cited",
    relevantFindings: ["Contradiction #2"],
    pageReferences: "Item 7, Page 4"
  },
  {
    id: "DOC-008",
    exhibit: "Exhibit H",
    title: "Subpoena Exhibit Pack",
    description: "Documents produced by opposing party under subpoena showing timeline conflicts",
    source: "Subpoena Response",
    date: "2023-03-25",
    pages: 22,
    type: "document",
    status: "cited",
    relevantFindings: ["Timeline Conflict"],
    pageReferences: "Pages 8-12"
  },
  {
    id: "DOC-009",
    exhibit: "Exhibit I",
    title: "Email String - Opposing Counsel",
    description: "Cherry-picked email excerpts contradicted by full thread context",
    source: "Discovery Production",
    date: "2023-02-15 to 2023-03-30",
    pages: 8,
    type: "email",
    status: "cited",
    relevantFindings: ["Cherry-picked Evidence"],
    pageReferences: "Full thread analysis"
  }
];

export default function DocumentIndex() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = documentDatabase.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.exhibit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'email': return '📧';
      case 'text': return '💬'; 
      case 'document': return '📄';
      case 'photo': return '📷';
      case 'audio': return '🎵';
      case 'filing': return '⚖️';
      default: return '📎';
    }
  };

  const getStatusColor = (status: DocumentItem['status']) => {
    switch (status) {
      case 'cited': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: DocumentItem['type']) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'text': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-gray-100 text-gray-800';
      case 'photo': return 'bg-purple-100 text-purple-800';
      case 'audio': return 'bg-orange-100 text-orange-800';
      case 'filing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Index & Evidence Library</h3>
        <p className="text-gray-600">Comprehensive index of all case documents with exhibit references and citations.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search documents by title, exhibit, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{documentDatabase.filter(d => d.status === 'cited').length}</div>
          <div className="text-sm text-gray-600">Cited in Memo</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{documentDatabase.filter(d => d.status === 'available').length}</div>
          <div className="text-sm text-gray-600">Available</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{documentDatabase.length}</div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{documentDatabase.reduce((sum, doc) => sum + doc.pages, 0)}</div>
          <div className="text-sm text-gray-600">Total Pages</div>
        </Card>
      </div>

      {/* Document List */}
      <div className="grid gap-4">
        {filteredDocs.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-2xl">{getTypeIcon(doc.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                      <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status === 'cited' ? 'CITED' : doc.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {doc.date}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {doc.source}
                      </span>
                      <span>{doc.pages} page{doc.pages > 1 ? 's' : ''}</span>
                      {doc.pageReferences && (
                        <span className="text-blue-600 font-medium">
                          {doc.pageReferences}
                        </span>
                      )}
                    </div>
                    
                    {doc.relevantFindings.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Supports Findings:</p>
                        <div className="flex flex-wrap gap-1">
                          {doc.relevantFindings.map((finding, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {finding}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={`text-xs ${getTypeColor(doc.type)}`}>
                    {doc.exhibit}
                  </Badge>
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
                  Citation
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No documents found matching your search criteria.
        </div>
      )}
    </div>
  );
}