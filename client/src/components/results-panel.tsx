import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Scale, HeartCrack, Clock, Link, Download, BarChart3, MessageSquare, TrendingUp, Shield, Anchor, Eye, User, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { mockContradictions, mockMisconduct, mockAlienation } from "@/lib/mock-data";
import TimelineView from "./timeline-view";
import ValidationInterface from "./validation-interface";
import ExhibitAnchoredValidation from "./exhibit-anchored-validation";
import { useMockInteractions } from "@/hooks/use-mock-interactions";
import { MockExhibitModal, MockAnalysisModal, MockReportModal } from "./mock-output-modals";

export default function ResultsPanel() {
  const {
    activeModal,
    modalProps,
    showExhibit,
    showMessageTrail,
    showCommunicationAnalysis,
    showTimelineView,
    showDiscoveryResponse,
    showEmailThread,
    downloadDocument,
    generateReport,
    closeModal
  } = useMockInteractions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Anti-Hallucination Banner */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Court-Defensible AI Analysis</h2>
            <Badge className="bg-green-100 text-green-800">Zero Hallucination Risk</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Anchor className="h-4 w-4 text-blue-600" />
              <span><strong>Exhibit Anchored:</strong> Every finding tied to specific evidence</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-purple-600" />
              <span><strong>Human Validated:</strong> Attorney approval required before court use</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-orange-600" />
              <span><strong>Traceable:</strong> Full audit trail for court defensibility</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Results</h2>
        <p className="text-gray-600">AI has identified contradictions, misconduct patterns, and key evidence. Each finding requires attorney validation and is anchored to specific exhibits.</p>
      </div>

      <Card className="bg-white shadow-sm border border-gray-200">
        <Tabs defaultValue="contradictions" className="w-full">
          <div className="border-b border-gray-200">
            <TabsList className="h-auto p-0 bg-transparent">
              <div className="flex space-x-8 px-6">
                <TabsTrigger 
                  value="contradictions" 
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Contradictions
                </TabsTrigger>
                <TabsTrigger 
                  value="misconduct"
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <Scale className="mr-2 h-4 w-4" />
                  Reciprocal Misconduct
                </TabsTrigger>
                <TabsTrigger 
                  value="alienation"
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <HeartCrack className="mr-2 h-4 w-4" />
                  Alienation Patterns
                </TabsTrigger>
                <TabsTrigger 
                  value="timeline"
                  className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Timeline View
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          <TabsContent value="contradictions" className="p-6">
            <div className="space-y-6">
              {mockContradictions.map((contradiction, index) => (
                <motion.div
                  key={index}
                  className="bg-red-50 border border-red-200 rounded-lg p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-900 mb-2">Statement Contradiction Found</h3>
                      <blockquote className="text-red-800 italic text-lg mb-3">
                        "{contradiction.statement}"
                      </blockquote>
                    </div>
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      {contradiction.confidence}% Confidence
                    </Badge>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <p className="text-gray-700 mb-2"><strong>Contradicted by:</strong></p>
                    <p className="text-gray-600 mb-3">"{contradiction.contradicted_by}" – {contradiction.source}</p>
                    <div className="flex space-x-3">
                      <Button 
                        size="sm" 
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={() => showExhibit("Email - Jane Smith Declining Evaluation", "email")}
                      >
                        <Link className="mr-2 h-4 w-4" />
                        View Citation
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadDocument("Exhibit A - Email Evidence.pdf")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Evidence
                      </Button>
                    </div>
                  </div>
                  {index === 0 && (
                    <ExhibitAnchoredValidation 
                      finding={{
                        id: "contradiction-1",
                        type: "contradiction",
                        title: "Exclusion from Psychological Evaluation",
                        description: "Respondent claimed exclusion but evidence shows voluntary declination",
                        aiConfidence: 94,
                        supportingExhibits: [
                          {
                            exhibit: "Exhibit A",
                            title: "Email - Jane Smith Declining Psychological Evaluation", 
                            relevantQuote: "I have decided not to attend the psychological evaluation scheduled for April 15th",
                            pageReference: "Page 3, Line 12"
                          },
                          {
                            exhibit: "Exhibit D",
                            title: "Court Filing - Original Rule for Contempt",
                            relevantQuote: "I was excluded from the evaluation process",
                            pageReference: "Page 2, Para 4"
                          }
                        ],
                        requiresValidation: true,
                        humanStatus: "pending"
                      }}
                      onValidate={(id, validation) => console.log('Validated:', id, validation)}
                    />
                  )}
                  {index !== 0 && (
                    <ValidationInterface findingId={`contradiction_${index}`} findingType="contradiction" />
                  )}
                </motion.div>
              ))}
              
              {/* NEW: Opposing Party Discovery Contradictions */}
              <motion.div
                className="bg-red-50 border border-red-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Discovery Response Contradiction
                    </h3>
                    <blockquote className="text-red-800 italic text-lg mb-3">
                      "Petitioner never informed me of the evaluation" (Interrogatory Item 7)
                    </blockquote>
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    High Impact
                  </Badge>
                </div>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <p className="text-gray-700 mb-2"><strong>Contradictory Evidence:</strong></p>
                  <p className="text-gray-600 mb-3">Text message from Petitioner: "You are invited to attend" – Exhibit H / Message Thread</p>
                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                      <FileText className="mr-2 h-4 w-4" />
                      View Discovery Response
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Text Message Evidence
                    </Button>
                  </div>
                </div>
                <ExhibitAnchoredValidation 
                  finding={{
                    id: "contradiction-2",
                    type: "contradiction",
                    title: "False Discovery Response",
                    description: "Opposing party falsely claimed non-notification in sworn discovery response",
                    aiConfidence: 91,
                    supportingExhibits: [
                      {
                        exhibit: "Exhibit G",
                        title: "Opposing Interrogatory Responses",
                        relevantQuote: "Petitioner never informed me of the evaluation",
                        pageReference: "Item 7, Page 4"
                      },
                      {
                        exhibit: "Exhibit H",
                        title: "Text Message Evidence",
                        relevantQuote: "You are invited to attend the psychological evaluation",
                        pageReference: "Message Thread, March 8"
                      }
                    ],
                    requiresValidation: true,
                    humanStatus: "pending"
                  }}
                  onValidate={(id, validation) => console.log('Validated:', id, validation)}
                />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="misconduct" className="p-6">
            <div className="space-y-6">
              {mockMisconduct.map((misconduct, index) => (
                <motion.div
                  key={index}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-orange-900 mb-2">Communication Misconduct</h3>
                      <blockquote className="text-orange-800 italic text-lg mb-3">
                        "{misconduct.accusation}"
                      </blockquote>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      {misconduct.impact} Impact
                    </Badge>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <p className="text-gray-700 mb-2"><strong>Counter Evidence:</strong></p>
                    <p className="text-gray-600 mb-3">{misconduct.reciprocal_evidence} – {misconduct.source}</p>
                    <div className="flex space-x-3">
                      <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Show Message Trail
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Communication Analysis
                      </Button>
                    </div>
                  </div>
                  {index === 0 && (
                    <ExhibitAnchoredValidation 
                      finding={{
                        id: "misconduct-1",
                        type: "misconduct",
                        title: "Communication Interference Pattern",
                        description: "Systematic blocking of communication attempts over 17-day period",
                        aiConfidence: 91,
                        supportingExhibits: [
                          {
                            exhibit: "Exhibit B",
                            title: "Text Message Thread - Unanswered Communications",
                            relevantQuote: "47 consecutive messages with zero responses from Jane Smith",
                            pageReference: "Lines 33-49"
                          },
                          {
                            exhibit: "Exhibit F",
                            title: "School Communication Records",
                            relevantQuote: "Please do not include Petitioner in any school communications",
                            pageReference: "Email dated March 5, 2023"
                          }
                        ],
                        requiresValidation: true,
                        humanStatus: "pending"
                      }}
                      onValidate={(id, validation) => console.log('Validated:', id, validation)}
                    />
                  )}
                  {index !== 0 && (
                    <ValidationInterface findingId={`misconduct_${index}`} findingType="misconduct" />
                  )}
                </motion.div>
              ))}

              {/* NEW: Cherry-picked Evidence Pattern */}
              <motion.div
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2 flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Cherry-picked Evidence Misconduct
                    </h3>
                    <blockquote className="text-yellow-800 italic text-lg mb-3">
                      "Selective evidence presentation contradicting full context"
                    </blockquote>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    High Impact
                  </Badge>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <p className="text-gray-700 mb-2"><strong>Pattern Detected:</strong></p>
                  <p className="text-gray-600 mb-3">Opposing emails show selective excerpts contradicting full thread context – Email String Analysis</p>
                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                      <FileText className="mr-2 h-4 w-4" />
                      Full Email Thread
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Compare Excerpts
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="alienation" className="p-6">
            <div className="space-y-6">
              {mockAlienation.map((pattern, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-50 border border-purple-200 rounded-lg p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-purple-900 mb-2">{pattern.pattern}</h3>
                      <div className="text-purple-800 mb-3">
                        <span className="text-sm">Pattern Occurrences:</span>
                        <span className="text-2xl font-bold ml-2">{pattern.occurrences}</span>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      Pattern Detected
                    </Badge>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
                    <p className="text-gray-700 mb-2"><strong>Example Quote:</strong></p>
                    <blockquote className="text-purple-800 italic text-lg mb-3">
                      "{pattern.example_quote}"
                    </blockquote>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-gray-700 mb-3"><strong>Pattern Cycle:</strong></p>
                    <div className="flex items-center space-x-3 flex-wrap">
                      {pattern.cycle.map((stage, stageIndex) => (
                        <div key={stageIndex} className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={`${
                              stageIndex === 0 ? 'bg-green-100 text-green-800' :
                              stageIndex === 1 ? 'bg-red-100 text-red-800' :
                              stageIndex === 2 ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {stage}
                          </Badge>
                          {stageIndex < pattern.cycle.length - 1 && (
                            <span className="mx-2 text-gray-400">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      className="mt-4 bg-primary text-white hover:bg-primary/90"
                      onClick={showTimelineView}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Pattern Timeline
                    </Button>
                  </div>
                  {index === 0 && (
                    <ExhibitAnchoredValidation 
                      finding={{
                        id: "alienation-1",
                        type: "alienation",
                        title: "Pre-Court Alienation Campaign",
                        description: "Systematic attempt to undermine child's relationship with father before court proceedings",
                        aiConfidence: 89,
                        supportingExhibits: [
                          {
                            exhibit: "Exhibit C",
                            title: "Audio Recording - Alienation Statement",
                            relevantQuote: "You don't have to be afraid of your dad anymore. Mommy is going to make sure the court knows the truth about him.",
                            pageReference: "Timestamp 02:34-02:47"
                          },
                          {
                            exhibit: "Exhibit E",
                            title: "Counselor Session Notes",
                            relevantQuote: "Child expressed confusion about being told to fear father",
                            pageReference: "Session 3, Page 2"
                          }
                        ],
                        requiresValidation: true,
                        humanStatus: "pending"
                      }}
                      onValidate={(id, validation) => console.log('Validated:', id, validation)}
                    />
                  )}
                  {index !== 0 && (
                    <ValidationInterface findingId={`alienation_${index}`} findingType="alienation" />
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="p-6">
            <TimelineView />
          </TabsContent>
        </Tabs>
      </Card>

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
