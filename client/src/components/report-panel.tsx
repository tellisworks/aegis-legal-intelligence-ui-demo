import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Archive, List, Eye, Folder } from "lucide-react";
import { motion } from "framer-motion";
import ExhibitViewer from "./exhibit-viewer";

export default function ReportPanel() {
  const currentDate = new Date().toLocaleDateString();

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
                            <li>• <strong>Contradictory Evidence:</strong> Email dated April 10, 2023, wherein Respondent Mae Igi affirmatively declined to attend (Exhibit A, Page 3, Line 12)</li>
                            <li>• <strong>AI Confidence:</strong> 94% certainty based on linguistic analysis</li>
                            <li>• <strong>Legal Impact:</strong> Material misrepresentation to the Court</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">II. COMMUNICATION INTERFERENCE PATTERNS</h3>
                      <div className="pl-4 space-y-3 text-gray-700">
                        <div>
                          <p><strong>Pattern Analysis:</strong> Systematic Communication Blockage</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li>• <strong>Allegation:</strong> "Tom never communicates with me"</li>
                            <li>• <strong>Counter Evidence:</strong> 47 documented unanswered communications from Petitioner (Exhibit B)</li>
                            <li>• <strong>Time Period:</strong> March 15 - April 1, 2023</li>
                            <li>• <strong>Legal Significance:</strong> Evidence of deliberate communication obstruction</li>
                          </ul>
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
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="court-heading text-lg font-bold text-gray-900 mb-3">CONCLUSION AND RECOMMENDATIONS</h3>
                      <p className="text-gray-700 leading-relaxed">The AI analysis reveals a pattern of material misrepresentations, communication obstruction, and systematic alienation behaviors. These findings, supported by documentary evidence and confidence metrics, warrant judicial consideration for appropriate remedial action.</p>
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
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Archive className="mr-2 h-4 w-4" />
                    Download Evidence ZIP
                  </Button>
                  <Button variant="outline" className="w-full">
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
      </Tabs>
    </motion.div>
  );
}