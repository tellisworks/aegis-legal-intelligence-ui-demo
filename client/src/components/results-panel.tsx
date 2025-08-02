import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Scale, HeartCrack, Clock, Link, Download, BarChart3, MessageSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { mockContradictions, mockMisconduct, mockAlienation } from "@/lib/mock-data";
import TimelineView from "./timeline-view";

export default function ResultsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Results</h2>
        <p className="text-gray-600">AI has identified contradictions, misconduct patterns, and key evidence.</p>
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
                      <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                        <Link className="mr-2 h-4 w-4" />
                        View Citation
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Evidence
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                </motion.div>
              ))}
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
                    <Button size="sm" className="mt-4 bg-primary text-white hover:bg-primary/90">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Pattern Timeline
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="p-6">
            <TimelineView />
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}
