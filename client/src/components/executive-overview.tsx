import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  BarChart3,
  Users,
  Calendar
} from "lucide-react";

interface ExecutiveOverviewProps {
  onProceedToValidation: () => void;
}

export default function ExecutiveOverview({ onProceedToValidation }: ExecutiveOverviewProps) {
  const overviewData = {
    caseTitle: "Smith v. Smith - Family Law Matter",
    analysisDate: new Date().toLocaleDateString(),
    documentsAnalyzed: 347,
    totalPages: 1247,
    timeElapsed: "14.2 seconds",
    
    keyFindings: {
      contradictions: 23,
      criticalContradictions: 7,
      behaviorPatterns: 5,
      financialDiscrepancies: 4
    },
    
    majorThemes: [
      {
        title: "Custody & Parenting Time Inconsistencies",
        severity: "high",
        instances: 12,
        description: "Multiple contradictory statements regarding availability and involvement in children's activities"
      },
      {
        title: "Financial Disclosure Gaps",
        severity: "medium",
        instances: 8,
        description: "Discrepancies between stated income and lifestyle indicators in social media exhibits"
      },
      {
        title: "Communication Pattern Analysis",
        severity: "high",
        instances: 15,
        description: "Evidence of alienating behaviors in email and text message exchanges"
      }
    ],
    
    criticalContradictions: [
      {
        statement: "Claims of primary caregiver status",
        contradiction: "School records show other party as emergency contact and attendance at 89% of events",
        confidence: 94
      },
      {
        statement: "Reported annual income of $65,000",
        contradiction: "Social media posts indicate luxury purchases totaling estimated $45,000+ in past year",
        confidence: 87
      }
    ],
    
    recommendedActions: [
      "Review all financial disclosures with forensic accountant",
      "Examine parenting time logs against school/medical records",
      "Analyze communication patterns for alienation indicators",
      "Cross-reference testimony with documentary evidence"
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800 font-medium">
          PRELIMINARY AI ANALYSIS - Attorney validation required before use in legal proceedings
        </AlertDescription>
      </Alert>

      {/* Executive Summary Header */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Executive Overview Summary
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {overviewData.caseTitle} • Analysis completed on {overviewData.analysisDate}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              <BarChart3 className="h-3 w-3 mr-1" />
              AI Confidence: 96%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{overviewData.documentsAnalyzed}</div>
              <div className="text-sm text-gray-600">Documents Analyzed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{overviewData.totalPages.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Pages</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{overviewData.keyFindings.contradictions}</div>
              <div className="text-sm text-gray-600">Contradictions Found</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{overviewData.timeElapsed}</div>
              <div className="text-sm text-gray-600">Analysis Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Key Findings Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">{overviewData.keyFindings.criticalContradictions}</div>
                <div className="text-sm text-gray-600">Critical Issues</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">{overviewData.keyFindings.behaviorPatterns}</div>
                <div className="text-sm text-gray-600">Behavior Patterns</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Scale className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">{overviewData.keyFindings.financialDiscrepancies}</div>
                <div className="text-sm text-gray-600">Financial Gaps</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">15</div>
                <div className="text-sm text-gray-600">Timeline Issues</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Major Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Major Themes & Patterns Detected
          </CardTitle>
          <CardDescription>
            AI-identified patterns requiring attorney review and validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overviewData.majorThemes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{theme.title}</h4>
                  <div className="flex gap-2">
                    <Badge 
                      variant={theme.severity === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {theme.severity.toUpperCase()} PRIORITY
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {theme.instances} instances
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{theme.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Contradictions Preview */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Critical Contradictions Requiring Immediate Review
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {overviewData.criticalContradictions.map((item, index) => (
              <div key={index} className="border-l-4 border-red-400 pl-4 py-2">
                <div className="font-medium text-gray-900 mb-1">Claim: "{item.statement}"</div>
                <div className="text-sm text-red-700">Contradicted by: {item.contradiction}</div>
                <div className="text-xs text-gray-500 mt-1">AI Confidence: {item.confidence}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Recommended Attorney Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {overviewData.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{action}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Proceed to Validation */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Ready to Validate Findings?</h3>
              <p className="text-sm text-gray-600">
                Review each finding in detail and confirm accuracy before generating final reports
              </p>
            </div>
            <Button 
              onClick={onProceedToValidation}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Validation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}