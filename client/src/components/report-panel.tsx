import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Archive, List, Eye, Folder, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useMockInteractions } from "@/hooks/use-mock-interactions";
import { MockExhibitModal, MockAnalysisModal, MockReportModal } from "./mock-output-modals";
import ExhibitViewer from "./exhibit-viewer";
import DocumentIndex from "./document-index";

export default function ReportPanel() {
  const currentDate = new Date().toLocaleDateString();
  const {
    activeModal,
    modalProps,
    showExhibit,
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal Report</h2>
        <p className="text-gray-600">Generate court-ready documentation with comprehensive analysis and citations.</p>
      </div>

      <Tabs defaultValue="report" className="w-full">
        <div className="border-b border-gray-200 mb-6">
          <TabsList className="h-auto p-0 bg-transparent">
            <div className="flex space-x-8">
              <TabsTrigger 
                value="report" 
                className="py-3 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
              >
                <FileText className="mr-2 h-4 w-4" />
                Court Report
              </TabsTrigger>
              <TabsTrigger 
                value="exhibits"
                className="py-3 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
              >
                <Folder className="mr-2 h-4 w-4" />
                Evidence Exhibits
              </TabsTrigger>
              <TabsTrigger 
                value="index"
                className="py-3 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-gray-500 font-medium text-sm whitespace-nowrap bg-transparent"
              >
                <Database className="mr-2 h-4 w-4" />
                Document Index
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="report" className="mt-0">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Report Preview */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FileText className="text-red-600 mr-2 h-5 w-5" />
                    Court-Ready Legal Memorandum
                  </h3>
                </div>
                <div className="p-8 bg-white court-document">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">AEGIS LEGAL INTELLIGENCE</h1>
                    <h2 className="text-xl font-semibold text-gray-700">AI-Assisted Case Analysis Report</h2>
                    <div className="text-sm text-gray-500 mt-2">Generated on: {currentDate}</div>
                    <div className="text-sm text-gray-500">Case: Family Court Matter - Document Analysis</div>
                  </div>
                  
                  <div className="space-y-6">
                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">EXECUTIVE SUMMARY</h3>
                      <p className="text-gray-700 leading-relaxed">This AI-assisted analysis identifies material contradictions, communication misconduct patterns, and systematic alienation behaviors with full citation support. The analysis provides court-ready evidence with confidence metrics and supporting documentation for judicial review.</p>
                    </section>

                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">I. MATERIAL CONTRADICTIONS</h3>
                      <div className="pl-4 space-y-3 text-gray-700">
                        <div>
                          <p><strong>Contradiction #1:</strong> Exclusion from Psychological Evaluation</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li>• <strong>Claimed Statement:</strong> "I was excluded from the evaluation"</li>
                            <li>• <strong>Contradictory Evidence:</strong> Email dated April 10, 2023, wherein Respondent affirmatively declined to attend (Exhibit A, Page 3, Line 12)</li>
                            <li>• <strong>AI Confidence:</strong> 94% certainty based on linguistic analysis</li>
                            <li>• <strong>Legal Impact:</strong> Material misrepresentation to the Court</li>
                          </ul>
                          
                          {/* Embedded Exhibit A Preview */}
                          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                              📧 EXHIBIT A - Email Evidence
                            </h4>
                            <div className="bg-white border rounded p-3 font-mono text-sm">
                              <div className="border-b pb-2 mb-2 text-gray-600">
                                <div><strong>From:</strong> respondent@email.com</div>
                                <div><strong>To:</strong> dr.smith@psycheval.com</div>
                                <div><strong>Date:</strong> April 10, 2023, 2:47 PM</div>
                                <div><strong>Subject:</strong> Re: Psychological Evaluation Appointment</div>
                              </div>
                              <div className="text-gray-800">
                                Dr. Smith,<br/><br/>
                                After consideration, <mark className="bg-yellow-200">I have decided not to attend the psychological evaluation scheduled for April 15th</mark>. I don't feel it's necessary at this time and would prefer to focus on other aspects of the case.<br/><br/>
                                Please cancel my appointment.<br/><br/>
                                Thank you,<br/>
                                Respondent
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-blue-600">
                              <strong>Citation:</strong> Page 3, Line 12 - Direct contradiction to court filing claim
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">II. COMMUNICATION INTERFERENCE PATTERNS</h3>
                      <div className="pl-4 space-y-3 text-gray-700">
                        <div>
                          <p><strong>Pattern Analysis:</strong> Systematic Communication Blockage</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li>• <strong>Allegation:</strong> "Petitioner never communicates with me"</li>
                            <li>• <strong>Counter Evidence:</strong> 47 documented unanswered communications from Petitioner (Exhibit B)</li>
                            <li>• <strong>Time Period:</strong> March 15 - April 1, 2023</li>
                            <li>• <strong>Legal Significance:</strong> Evidence of deliberate communication obstruction</li>
                          </ul>

                          {/* Embedded Exhibit B Preview */}
                          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                              💬 EXHIBIT B - Text Message Records
                            </h4>
                            <div className="bg-white border rounded p-3 text-sm">
                              <div className="border-b pb-2 mb-2 text-gray-600">
                                <div><strong>Source:</strong> Verizon Wireless Records</div>
                                <div><strong>Period:</strong> March 15 - April 1, 2023 (17 days)</div>
                                <div><strong>Total Messages:</strong> 47 from Petitioner, 0 responses from Jane Smith</div>
                              </div>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                <div className="text-blue-600"><strong>Petitioner (3/15, 2:14 PM):</strong> Can we discuss the schedule for next week?</div>
                                <div className="text-blue-600"><strong>Petitioner (3/15, 4:22 PM):</strong> Please let me know about pickup times.</div>
                                <div className="text-blue-600"><strong>Petitioner (3/16, 8:30 AM):</strong> I need to confirm the school event.</div>
                                <div className="text-gray-400 text-center py-2">... 44 additional unanswered messages ...</div>
                                <div className="text-blue-600"><strong>Petitioner (4/1, 7:15 PM):</strong> This is urgent regarding our child's welfare.</div>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-green-600">
                              <strong>Citation:</strong> Lines 33-49 - Pattern of communication avoidance contradicts claims
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">III. PARENTAL ALIENATION INDICATORS</h3>
                      <div className="pl-4 space-y-3 text-gray-700">
                        <div>
                          <p><strong>Identified Pattern:</strong> Pre-Court Alienation Campaign</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li>• <strong>Pattern Type:</strong> Emotional manipulation preceding court proceedings</li>
                            <li>• <strong>Frequency:</strong> 4 documented instances within 2-week period</li>
                            <li>• <strong>Example Statement:</strong> "You don't have to be afraid of your dad anymore" (Exhibit C)</li>
                            <li>• <strong>Psychological Cycle:</strong> Warm Approach → False Accusation → Victimhood Narrative → Child Guilt Induction</li>
                          </ul>

                          {/* Embedded Exhibit C Preview */}
                          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                              🎵 EXHIBIT C - Audio Recording
                            </h4>
                            <div className="bg-white border rounded p-3 text-sm">
                              <div className="border-b pb-2 mb-2 text-gray-600">
                                <div><strong>Source:</strong> Client Recording Device (iPhone 12)</div>
                                <div><strong>Date:</strong> March 28, 2023, 6:45 PM</div>
                                <div><strong>Duration:</strong> 3 minutes 42 seconds</div>
                                <div><strong>Location:</strong> Jane Smith's residence during child exchange</div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="text-gray-600 text-xs mb-2">TRANSCRIPT (Timestamp 02:34-02:47):</div>
                                <div className="italic">
                                  <strong>Jane Smith:</strong> "Sweetie, come here for a minute."<br/>
                                  <strong>Child:</strong> "What mom?"<br/>
                                  <strong>Jane Smith:</strong> <mark className="bg-yellow-200">"You don't have to be afraid of your dad anymore. Mommy is going to make sure the court knows the truth about him."</mark><br/>
                                  <strong>Child:</strong> "But I'm not afraid of daddy..."<br/>
                                  <strong>Jane Smith:</strong> "You will understand when you're older."
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-orange-600">
                              <strong>Citation:</strong> Timestamp 02:34 - Clear alienation statement prior to court proceedings
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">CONCLUSION AND RECOMMENDATIONS</h3>
                      <p className="text-gray-700 leading-relaxed">The AI analysis reveals a pattern of material misrepresentations, communication obstruction, and systematic alienation behaviors. These findings, supported by documentary evidence and confidence metrics, warrant judicial consideration for appropriate remedial action.</p>
                    </section>

                    <section className="border-t border-gray-300 pt-6 mt-8">
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">EXHIBIT INDEX</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span><strong>Exhibit A:</strong> Email - Jane Smith Declining Psychological Evaluation</span>
                            <span className="text-gray-600">April 10, 2023 | 1 page</span>
                          </div>
                          <div className="flex justify-between">
                            <span><strong>Exhibit B:</strong> Text Message Thread - Unanswered Communications</span>
                            <span className="text-gray-600">March 15-April 1, 2023 | 12 pages</span>
                          </div>
                          <div className="flex justify-between">
                            <span><strong>Exhibit C:</strong> Audio Recording - Alienation Statement</span>
                            <span className="text-gray-600">March 28, 2023 | Audio transcript</span>
                          </div>
                          <div className="flex justify-between">
                            <span><strong>Exhibit D:</strong> Court Filing - Original Rule for Contempt</span>
                            <span className="text-gray-600">March 15, 2023 | 8 pages</span>
                          </div>
                          <div className="flex justify-between">
                            <span><strong>Exhibit E:</strong> Counselor Session Notes</span>
                            <span className="text-gray-600">March 28, 2023 | 3 pages</span>
                          </div>
                          <div className="flex justify-between">
                            <span><strong>Exhibit F:</strong> School Communication Records</span>
                            <span className="text-gray-600">February 20-March 10, 2023 | 6 pages</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-2 border-t border-gray-300 text-xs text-gray-600">
                          <strong>Total Evidence:</strong> 6 exhibits comprising 31 pages of documentation and 1 audio recording
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </Card>
            </div>

            {/* Export Options */}
            <div className="space-y-6">
              <Card className="bg-white shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Download className="text-primary mr-2 h-5 w-5" />
                  Export Options
                </h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                    onClick={() => generateReport("Court PDF Report")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => downloadDocument("Evidence_Package.zip")}
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Download Evidence ZIP
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => showExhibit("Evidence Log", "document")}
                  >
                    <List className="mr-2 h-4 w-4" />
                    View Evidence Log
                  </Button>
                </div>
              </Card>

              {/* Summary Stats */}
              <Card className="bg-white shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contradictions Found</span>
                    <span className="font-bold text-red-600">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Misconduct Patterns</span>
                    <span className="font-bold text-orange-600">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Alienation Events</span>
                    <span className="font-bold text-purple-600">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Timeline Events</span>
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-medium">Confidence Score</span>
                      <span className="font-bold text-green-600 text-lg">94%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="exhibits" className="mt-0">
          <ExhibitViewer />
        </TabsContent>

        <TabsContent value="index" className="mt-0">
          <DocumentIndex />
        </TabsContent>
      </Tabs>

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