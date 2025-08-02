import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Archive, List } from "lucide-react";
import { motion } from "framer-motion";

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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Report Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="text-red-600 mr-2 h-5 w-5" />
                Report Preview
              </h3>
            </div>
            <div className="p-8 bg-white" style={{ fontFamily: 'Times New Roman, serif' }}>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">AEGIS LEGAL INTELLIGENCE</h1>
                <h2 className="text-xl font-semibold text-gray-700">Case Analysis Report</h2>
                <div className="text-sm text-gray-500 mt-2">Generated on: {currentDate}</div>
              </div>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">EXECUTIVE SUMMARY</h3>
                  <p className="text-gray-700 leading-relaxed">This report identifies contradictions, misconduct, and manipulation patterns with full citations. The AI analysis has uncovered significant discrepancies in the opposing party's statements and evidence of systematic communication interference.</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">CONTRADICTIONS IDENTIFIED</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Statement:</strong> "I was excluded from the evaluation"</li>
                    <li className="ml-4 text-gray-600">→ <em>Contradicted by:</em> Email 4/10/2023 where Mae declined to attend (Page 3, Line 12)</li>
                    <li className="ml-4 text-gray-600">→ <em>Confidence Level:</em> 94%</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">RECIPROCAL MISCONDUCT</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Accusation:</strong> "Tom never communicates"</li>
                    <li className="ml-4 text-gray-600">→ <em>Counter Evidence:</em> 47 unanswered messages from Tom documented in Exhibit D, Lines 33–49</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">PARENTAL ALIENATION PATTERNS</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Pattern Type:</strong> Pre-court Alienation Surge</li>
                    <li>• <strong>Occurrences:</strong> 4 documented instances</li>
                    <li>• <strong>Example:</strong> "You don't have to be afraid of your dad anymore."</li>
                    <li>• <strong>Cycle:</strong> Warm → Accusation → Victimhood → Child Guilt</li>
                  </ul>
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
    </motion.div>
  );
}
