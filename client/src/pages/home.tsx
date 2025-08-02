import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Upload, Cog, Search, FileText, CheckCircle } from "lucide-react";
import UploadPanel from "@/components/upload-panel";
import AnalysisPhase from "@/components/analysis-phase";
import ResultsPanel from "@/components/results-panel";
import ReportPanel from "@/components/report-panel";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");

  const handleStartAnalysis = () => {
    setActiveTab("analyze");
  };

  const handleAnalysisComplete = () => {
    setActiveTab("results");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Aegis Legal Intelligence</h1>
                <p className="text-xs text-gray-500">AI-Powered Legal Analysis System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                Demo Mode
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Main Navigation Tabs */}
          <div className="bg-white border-b border-gray-200 mb-8 rounded-lg shadow-sm">
            <TabsList className="h-auto p-0 bg-transparent w-full">
              <div className="flex space-x-8 px-6 w-full">
                <TabsTrigger 
                  value="upload" 
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </TabsTrigger>
                <TabsTrigger 
                  value="analyze"
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <Cog className="mr-2 h-4 w-4" />
                  Analyze
                </TabsTrigger>
                <TabsTrigger 
                  value="results"
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Review Results
                </TabsTrigger>
                <TabsTrigger 
                  value="report"
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Report
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="upload" className="mt-0">
            <UploadPanel onStartAnalysis={handleStartAnalysis} />
          </TabsContent>

          <TabsContent value="analyze" className="mt-0">
            <AnalysisPhase onComplete={handleAnalysisComplete} />
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            <ResultsPanel />
          </TabsContent>

          <TabsContent value="report" className="mt-0">
            <ReportPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
