import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Gavel, CheckCircle, Play, Scale, Users, User, Upload, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMockInteractions } from "@/hooks/use-mock-interactions";
import { MockExhibitModal, MockAnalysisModal, MockReportModal } from "./mock-output-modals";
import { RealisticLoadingSequence } from "./realistic-demo-enhancements";

interface UploadPanelProps {
  onStartAnalysis: () => void;
}

export default function UploadPanel({ onStartAnalysis }: UploadPanelProps) {
  const [clientFiles, setClientFiles] = useState([
    { name: "Rule_for_Contempt.pdf", size: "2.3 MB", type: "PDF Document", uploaded: true },
    { name: "Exhibit_Packet_A-F.pdf", size: "4.7 MB", type: "PDF Document", uploaded: true },
    { name: "Timeline_Statement.docx", size: "1.2 MB", type: "Word Document", uploaded: true },
    { name: "Text_Messages_Archive.pdf", size: "12.4 MB", type: "PDF Document", uploaded: true },
    { name: "Email_Communications_2023.pdf", size: "8.9 MB", type: "PDF Document", uploaded: true },
    { name: "School_Records_Bundle.pdf", size: "6.2 MB", type: "PDF Document", uploaded: true },
    { name: "Medical_Records_Complete.pdf", size: "15.1 MB", type: "PDF Document", uploaded: true },
    { name: "Financial_Documents_Pack.pdf", size: "9.3 MB", type: "PDF Document", uploaded: true },
    { name: "Therapy_Session_Notes.pdf", size: "4.8 MB", type: "PDF Document", uploaded: true },
    { name: "Calendar_Screenshots.pdf", size: "3.5 MB", type: "PDF Document", uploaded: true }
  ]);

  const [opposingFiles, setOpposingFiles] = useState([
    { name: "Opposing_Interrogatory_Responses.pdf", size: "3.1 MB", type: "PDF Document", uploaded: true },
    { name: "Subpoena_Exhibit_Pack.pdf", size: "5.8 MB", type: "PDF Document", uploaded: true },
    { name: "Email_String_Opposing_Counsel.pdf", size: "892 KB", type: "PDF Document", uploaded: true },
    { name: "Discovery_Production_Set_1-3.pdf", size: "18.7 MB", type: "PDF Document", uploaded: true },
    { name: "Deposition_Transcripts_Bundle.pdf", size: "22.1 MB", type: "PDF Document", uploaded: true },
    { name: "Banking_Records_Response.pdf", size: "11.4 MB", type: "PDF Document", uploaded: true },
    { name: "Phone_Records_Complete.pdf", size: "7.8 MB", type: "PDF Document", uploaded: true },
    { name: "Social_Media_Evidence.pdf", size: "9.2 MB", type: "PDF Document", uploaded: true },
    { name: "Witness_Statements_Collected.pdf", size: "6.5 MB", type: "PDF Document", uploaded: true },
    { name: "Property_Valuation_Reports.pdf", size: "4.9 MB", type: "PDF Document", uploaded: true }
  ]);

  const {
    activeModal,
    modalProps,
    isProcessing,
    currentTask,
    showExhibit,
    showAnalysis,
    downloadDocument,
    closeModal
  } = useMockInteractions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📤 Upload Documents for Analysis (347+ Pages)</h2>
        <p className="text-gray-600">Upload both your client's materials and opposing party's discovery for comprehensive adversarial analysis.</p>
      </div>

      {/* Document Upload Sections */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        
        {/* Your Client's Documents */}
        <Card className="bg-blue-50 border-2 border-blue-200">
          <div className="p-6 border-b border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 flex items-center">
              <User className="text-blue-600 mr-2 h-5 w-5" />
              Your Client's Documents
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              PDFs, Word docs, Images, Emails • e.g., declarations, texts, therapist letters, exhibits
            </p>
          </div>
          <div className="p-6 space-y-4">
            {clientFiles.map((file, index) => (
              <motion.div 
                key={index}
                className="bg-white border border-blue-200 rounded-lg p-4 hover:shadow-md transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-blue-600 h-6 w-6" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      <div className="text-xs text-gray-500">{file.size} • {file.type}</div>
                    </div>
                  </div>
                  {file.uploaded && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Uploaded
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
              onClick={() => showExhibit("Client File Upload", "document")}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Upload Client Files
            </Button>
          </div>
        </Card>

        {/* Opposing Party's Discovery & Filings */}
        <Card className="bg-red-50 border-2 border-red-200">
          <div className="p-6 border-b border-red-200">
            <h3 className="text-lg font-semibold text-red-900 flex items-center">
              <Users className="text-red-600 mr-2 h-5 w-5" />
              Opposing Party's Discovery & Filings
            </h3>
            <p className="text-sm text-red-700 mt-1">
              e.g., interrogatories, exhibits, court motions, emails • opposing memo, text screenshots, subpoenas
            </p>
          </div>
          <div className="p-6 space-y-4">
            {opposingFiles.map((file, index) => (
              <motion.div 
                key={index}
                className="bg-white border border-red-200 rounded-lg p-4 hover:shadow-md transition-all"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-red-600 h-6 w-6" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      <div className="text-xs text-gray-500">{file.size} • {file.type}</div>
                    </div>
                  </div>
                  {file.uploaded && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Uploaded
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => showExhibit("Opposing Party File Upload", "discovery")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Opposing Party Files
            </Button>
          </div>
        </Card>
      </div>

      {/* Analysis Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Scale className="text-purple-600 mr-2 h-5 w-5" />
                Adversarial Analysis Ready
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {clientFiles.length + opposingFiles.length} documents uploaded • 347 pages processed • Ready for AI analysis
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Files</div>
              <div className="text-2xl font-bold text-purple-600">{clientFiles.length + opposingFiles.length}</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded">
              <div className="text-sm font-medium text-blue-900">Client Documents</div>
              <div className="text-lg font-bold text-blue-700">{clientFiles.length} files</div>
              <div className="text-xs text-blue-600">Ready for analysis</div>
            </div>
            <div className="bg-red-100 p-3 rounded">
              <div className="text-sm font-medium text-red-900">Opposing Discovery</div>
              <div className="text-lg font-bold text-red-700">{opposingFiles.length} files</div>
              <div className="text-xs text-red-600">Ready for comparison</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Analysis Will Detect:</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• Statement contradictions between parties</div>
              <div>• Cherry-picked evidence patterns</div>
              <div>• Timeline conflicts and discrepancies</div>
              <div>• Communication misconduct evidence</div>
              <div>• Parental alienation indicators</div>
              <div>• Discovery response inconsistencies</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Analyze Everything Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          onClick={() => {
            showAnalysis("AI Legal Analysis Starting", "general");
            setTimeout(() => onStartAnalysis(), 2000);
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
          size="lg"
        >
          <Scale className="mr-2 h-5 w-5" />
          ⚖️ Analyze Everything
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Start comprehensive adversarial document analysis
        </p>
      </motion.div>

      {/* Loading States */}
      <RealisticLoadingSequence
        isVisible={isProcessing}
        onComplete={() => {}}
        taskName={currentTask}
      />

      {/* Modal Components */}
      <MockExhibitModal 
        isOpen={activeModal === "exhibit"} 
        onClose={closeModal} 
        title={modalProps.title || ""} 
        type={modalProps.type || ""} 
      />
      <MockAnalysisModal 
        isOpen={activeModal === "analysis"} 
        onClose={closeModal} 
        title={modalProps.title || ""} 
        type={modalProps.type || ""} 
      />
      <MockReportModal 
        isOpen={activeModal === "report"} 
        onClose={closeModal} 
        title={modalProps.title || ""} 
      />
    </motion.div>
  );
}