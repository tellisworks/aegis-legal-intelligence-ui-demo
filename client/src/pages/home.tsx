import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Cog, Search, FileText, CheckCircle, UserPlus } from "lucide-react";
import UploadPanel from "@/components/upload-panel";
import AnalysisPhase from "@/components/analysis-phase";
import ResultsPanel from "@/components/results-panel";
import ReportPanel from "@/components/report-panel";
import ProfessionalHeader from "@/components/professional-header";
import { RealtimeStats, TutorialOverlay } from "@/components/realistic-demo-enhancements";
import AdminInterface from "@/components/admin-interface";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");
  const [showTutorial, setShowTutorial] = useState(false);
  const [analysisStats, setAnalysisStats] = useState({
    documentsProcessed: 6,
    contradictionsFound: 1,
    confidenceScore: 94,
    timeElapsed: "2.4s"
  });

  const handleStartAnalysis = () => {
    setActiveTab("analyze");
  };

  const handleAnalysisComplete = () => {
    setActiveTab("results");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <ProfessionalHeader />

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-time Stats */}
        {activeTab !== "upload" && (
          <RealtimeStats
            documentsProcessed={analysisStats.documentsProcessed}
            contradictionsFound={analysisStats.contradictionsFound}
            confidenceScore={analysisStats.confidenceScore}
            timeElapsed={analysisStats.timeElapsed}
          />
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation */}
          <div className="bg-white border-b border-gray-200 mb-8 rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <TabsList className="h-auto p-0 bg-transparent">
                <div className="flex space-x-8">
                  <TabsTrigger 
                    value="upload" 
                    className="py-2 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analyze"
                    className="py-2 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                  >
                    <Cog className="mr-2 h-4 w-4" />
                    Analyze
                  </TabsTrigger>
                  <TabsTrigger 
                    value="results"
                    className="py-2 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Review Results
                  </TabsTrigger>
                  <TabsTrigger 
                    value="report"
                    className="py-2 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Report
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className="py-2 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Users
                  </TabsTrigger>
                </div>
              </TabsList>
              
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Demo Mode
                </Badge>
                <button
                  onClick={() => setShowTutorial(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Tutorial
                </button>
              </div>
            </div>
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

          <TabsContent value="admin" className="mt-0">
            <AdminInterface />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}