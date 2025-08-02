import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle, X, Edit, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ValidationInterfaceProps {
  findingId: string;
  findingType: 'contradiction' | 'misconduct' | 'alienation';
}

export default function ValidationInterface({ findingId, findingType }: ValidationInterfaceProps) {
  const [agreement, setAgreement] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [courtActionable, setCourtActionable] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!agreement) {
      toast({
        title: "Please select an option",
        description: "Choose whether you agree with this finding.",
        variant: "destructive"
      });
      return;
    }

    // Simulate feedback submission
    setIsSubmitted(true);
    toast({
      title: "Feedback saved for learning",
      description: "Your validation has been recorded and will improve future AI analysis.",
      variant: "default"
    });

    // Reset form after 3 seconds for demo purposes
    setTimeout(() => {
      setIsSubmitted(false);
      setAgreement("");
      setNotes("");
      setCourtActionable("");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Feedback saved for learning</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Your validation helps improve AI accuracy and court defensibility.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <Card className="bg-blue-50 border border-blue-200">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2 text-blue-900">
            <Brain className="h-5 w-5" />
            <h4 className="font-semibold">Do you agree with this finding?</h4>
          </div>

          {/* Agreement Options */}
          <RadioGroup value={agreement} onValueChange={setAgreement}>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="correct" id="correct" />
                <Label htmlFor="correct" className="flex items-center space-x-1 cursor-pointer">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Correct</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="incorrect" id="incorrect" />
                <Label htmlFor="incorrect" className="flex items-center space-x-1 cursor-pointer">
                  <X className="h-4 w-4 text-red-600" />
                  <span>Incorrect</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="needs-info" id="needs-info" />
                <Label htmlFor="needs-info" className="flex items-center space-x-1 cursor-pointer">
                  <Edit className="h-4 w-4 text-orange-600" />
                  <span>Needs More Info / Edit</span>
                </Label>
              </div>
            </div>
          </RadioGroup>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Optional Notes or Corrections:</span>
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any corrections, context, or additional information..."
              className="bg-white"
              rows={2}
            />
          </div>

          {/* Court Actionable */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-1">
              <span>⚖️ Is this court-actionable?</span>
            </Label>
            <RadioGroup value={courtActionable} onValueChange={setCourtActionable}>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="actionable-yes" />
                  <Label htmlFor="actionable-yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="actionable-no" />
                  <Label htmlFor="actionable-no" className="cursor-pointer">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="actionable-unsure" />
                  <Label htmlFor="actionable-unsure" className="cursor-pointer">Not Sure</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-white"
              size="sm"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}