import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Gavel, CheckCircle, Play } from "lucide-react";
import { motion } from "framer-motion";

interface UploadPanelProps {
  onStartAnalysis: () => void;
}

export default function UploadPanel({ onStartAnalysis }: UploadPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
        <p className="text-gray-600">Upload legal documents for AI-powered analysis and contradiction detection.</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Opposing Party's Filings */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Gavel className="text-red-600 mr-2 h-5 w-5" />
              Opposing Party's Filings
            </h3>
            <p className="text-sm text-gray-500 mt-1">Upload documents from the opposing party</p>
          </div>
          <div className="p-6 space-y-4">
            <motion.div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
              whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <FileText className="text-red-600 mx-auto mb-3 h-8 w-8" />
              <div className="text-sm font-medium text-gray-900 mb-1">Rule_for_Contempt.pdf</div>
              <div className="text-xs text-gray-500">2.3 MB • PDF Document</div>
              <div className="mt-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs inline-flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                Uploaded
              </div>
            </motion.div>
            <motion.div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
              whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <FileText className="text-red-600 mx-auto mb-3 h-8 w-8" />
              <div className="text-sm font-medium text-gray-900 mb-1">Exhibits_1-12.pdf</div>
              <div className="text-xs text-gray-500">4.7 MB • PDF Document</div>
              <div className="mt-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs inline-flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                Uploaded
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Client's Evidence */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="text-blue-600 mr-2 h-5 w-5" />
              Your Client's Evidence
            </h3>
            <p className="text-sm text-gray-500 mt-1">Upload your client's supporting documents</p>
          </div>
          <div className="p-6 space-y-4">
            <motion.div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
              whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <FileText className="text-blue-600 mx-auto mb-3 h-8 w-8" />
              <div className="text-sm font-medium text-gray-900 mb-1">Testimony_Affidavit.pdf</div>
              <div className="text-xs text-gray-500">1.8 MB • PDF Document</div>
              <div className="mt-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs inline-flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                Uploaded
              </div>
            </motion.div>
            <motion.div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
              whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <FileText className="text-blue-600 mx-auto mb-3 h-8 w-8" />
              <div className="text-sm font-medium text-gray-900 mb-1">Client_Exhibits_13-22.pdf</div>
              <div className="text-xs text-gray-500">3.2 MB • PDF Document</div>
              <div className="mt-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs inline-flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                Uploaded
              </div>
            </motion.div>
          </div>
        </Card>
      </div>

      {/* Begin Analysis Button */}
      <div className="text-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onStartAnalysis}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 shadow-lg hover:shadow-xl"
          >
            <Play className="mr-3 h-5 w-5" />
            Begin Analysis
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
