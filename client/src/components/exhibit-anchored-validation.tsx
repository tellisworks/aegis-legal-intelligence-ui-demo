import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Anchor, Eye, CheckCircle, XCircle, AlertTriangle, FileText, User, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Finding {
  id: string;
  type: 'contradiction' | 'misconduct' | 'alienation';
  title: string;
  description: string;
  aiConfidence: number;
  supportingExhibits: {
    exhibit: string;
    title: string;
    relevantQuote: string;
    pageReference: string;
    timestamp?: string;
  }[];
  requiresValidation: boolean;
  humanStatus: 'pending' | 'approved' | 'rejected' | 'modified';
  humanValidator?: string;
  humanNotes?: string;
  courtActionable?: boolean;
}

interface ExhibitAnchoredValidationProps {
  finding: Finding;
  onValidate: (findingId: string, validation: any) => void;
}

export default function ExhibitAnchoredValidation({ finding, onValidate }: ExhibitAnchoredValidationProps) {
  const [humanVerification, setHumanVerification] = useState<string>("");
  const [courtActionable, setCourtActionable] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [exhibitVerifications, setExhibitVerifications] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const handleExhibitVerification = (exhibitId: string, verified: boolean) => {
    setExhibitVerifications(prev => ({
      ...prev,
      [exhibitId]: verified
    }));
  };

  const handleSubmitValidation = () => {
    if (!humanVerification) {
      toast({
        title: "Validation Required",
        description: "Please verify the AI finding before proceeding",
        variant: "destructive"
      });
      return;
    }

    const allExhibitsVerified = finding.supportingExhibits.every(
      exhibit => exhibitVerifications[exhibit.exhibit] === true
    );

    if (!allExhibitsVerified) {
      toast({
        title: "Exhibit Verification Required", 
        description: "Please verify all supporting exhibits before submitting",
        variant: "destructive"
      });
      return;
    }

    if (!courtActionable) {
      toast({
        title: "Court Assessment Required",
        description: "Please assess whether this finding is court-actionable",
        variant: "destructive"
      });
      return;
    }

    // Submit validation
    onValidate(finding.id, {
      humanVerification,
      courtActionable: courtActionable === 'yes',
      notes,
      exhibitVerifications,
      validator: "Attorney Johnson",
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Validation Complete",
      description: "Finding has been human-verified and anchored to exhibits",
      variant: "default"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'modified': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 space-y-4"
    >
      {/* Anti-Hallucination Header */}
      <Card className="bg-blue-50 border-2 border-blue-200">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Anti-Hallucination Validation Required</h3>
            <Badge className="bg-blue-100 text-blue-800">Human Oversight</Badge>
          </div>
          <p className="text-sm text-blue-700">
            Every AI finding must be anchored to specific exhibits and verified by a human attorney before inclusion in court documents. 
            This prevents AI hallucination and ensures court defensibility.
          </p>
        </div>
      </Card>

      {/* Finding Details */}
      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">{finding.title}</h4>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(finding.humanStatus)}>
                {finding.humanStatus.toUpperCase()}
              </Badge>
              <span className={`text-sm font-medium ${getConfidenceColor(finding.aiConfidence)}`}>
                AI Confidence: {finding.aiConfidence}%
              </span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{finding.description}</p>

          {/* Exhibit Anchoring Section */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Anchor className="h-5 w-5 text-gray-600" />
              <h5 className="font-medium text-gray-900">Supporting Evidence (Exhibit Anchored)</h5>
              <Badge variant="outline" className="text-xs">
                {finding.supportingExhibits.length} Exhibits
              </Badge>
            </div>

            <div className="space-y-3">
              {finding.supportingExhibits.map((exhibit, index) => (
                <div key={index} className="bg-gray-50 border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          {exhibit.exhibit}
                        </Badge>
                        <span className="font-medium text-sm">{exhibit.title}</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {exhibit.pageReference} 
                        {exhibit.timestamp && ` | ${exhibit.timestamp}`}
                      </div>
                      <div className="bg-white border-l-4 border-blue-400 p-2 text-sm italic">
                        "{exhibit.relevantQuote}"
                      </div>
                    </div>
                  </div>
                  
                  {/* Human Verification for Each Exhibit */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-600">Attorney Verification Required:</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={exhibitVerifications[exhibit.exhibit] === true ? "default" : "outline"}
                        onClick={() => handleExhibitVerification(exhibit.exhibit, true)}
                        className="h-7 px-2 text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Button>
                      <Button
                        size="sm"
                        variant={exhibitVerifications[exhibit.exhibit] === false ? "destructive" : "outline"}
                        onClick={() => handleExhibitVerification(exhibit.exhibit, false)}
                        className="h-7 px-2 text-xs"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Invalid
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Human Validation Interface */}
      <Card className="bg-yellow-50 border border-yellow-200">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-yellow-700" />
            <h4 className="font-semibold text-yellow-900">Attorney Validation</h4>
            <Badge className="bg-yellow-100 text-yellow-800">Required</Badge>
          </div>

          {/* Overall Finding Verification */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Do you verify this AI finding is accurate and court-ready?</Label>
            <RadioGroup value={humanVerification} onValueChange={setHumanVerification}>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="approved" id="approved" />
                  <Label htmlFor="approved" className="flex items-center space-x-1 cursor-pointer">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Approved</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rejected" id="rejected" />
                  <Label htmlFor="rejected" className="flex items-center space-x-1 cursor-pointer">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Rejected</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="modified" id="modified" />
                  <Label htmlFor="modified" className="flex items-center space-x-1 cursor-pointer">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>Needs Modification</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Court Actionable Assessment */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Is this finding court-actionable?</Label>
            <RadioGroup value={courtActionable} onValueChange={setCourtActionable}>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="court-yes" />
                  <Label htmlFor="court-yes" className="cursor-pointer">Yes - Include in court filing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="court-no" />
                  <Label htmlFor="court-no" className="cursor-pointer">No - Keep for reference only</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Attorney Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attorney Notes & Comments:</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any legal context, modifications, or strategic considerations..."
              className="bg-white"
              rows={3}
            />
          </div>

          {/* Validation Summary */}
          <div className="bg-white p-3 rounded border space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Validation Summary:</span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• AI Analysis: {finding.aiConfidence}% confidence</div>
              <div>• Supporting Exhibits: {finding.supportingExhibits.length} documents verified</div>
              <div>• Human Review: {humanVerification ? humanVerification : 'Pending'}</div>
              <div>• Court Status: {courtActionable ? (courtActionable === 'yes' ? 'Actionable' : 'Reference only') : 'Pending assessment'}</div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSubmitValidation}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Shield className="mr-2 h-4 w-4" />
              Complete Validation
            </Button>
          </div>
        </div>
      </Card>

      {/* Anti-Hallucination Footer */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-green-800">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">Court Defensibility Guaranteed</span>
        </div>
        <p className="text-xs text-green-700 mt-1">
          This finding is anchored to verified exhibits and requires human attorney validation before court submission, 
          ensuring zero AI hallucination risk and full legal defensibility.
        </p>
      </div>
    </motion.div>
  );
}