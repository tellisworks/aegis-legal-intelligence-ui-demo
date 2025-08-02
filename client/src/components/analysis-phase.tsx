import { Progress } from "@/components/ui/progress";
import { Brain, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnalysisPhaseProps {
  onComplete: () => void;
}

export default function AnalysisPhase({ onComplete }: AnalysisPhaseProps) {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    "Document parsing and OCR",
    "Extracting key claims and statements", 
    "Cross-referencing contradictions",
    "Identifying manipulation patterns"
  ];

  useEffect(() => {
    // Animate progress bar
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Animate steps completion
    steps.forEach((_, index) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, index]);
      }, (index + 1) * 800);
    });

    // Auto-navigate to results after analysis
    const completionTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="mb-8">
        <motion.div 
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="text-white h-12 w-12" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyzing Documents</h2>
        <p className="text-lg text-gray-600 mb-8">AI is processing your legal documents and cross-referencing claims...</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-3" />
      </div>

      {/* Analysis Steps */}
      <div className="space-y-4 text-left max-w-md mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-3 ${
              completedSteps.includes(index) ? 'text-green-600' : 'text-gray-400'
            }`}
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: completedSteps.includes(index) ? 1 : 0.5,
              scale: completedSteps.includes(index) ? [1, 1.05, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              completedSteps.includes(index) 
                ? 'border-green-600 bg-green-600' 
                : 'border-gray-300'
            }`}>
              {completedSteps.includes(index) && (
                <Check className="text-white h-3 w-3" />
              )}
            </div>
            <span>{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
