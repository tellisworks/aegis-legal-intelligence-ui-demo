import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Shield, Zap, CheckCircle, AlertTriangle, Eye, FileText, Download, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RealisticLoadingProps {
  isVisible: boolean;
  onComplete: () => void;
  taskName: string;
}

export function RealisticLoadingSequence({ isVisible, onComplete, taskName }: RealisticLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const steps = [
    { name: "Initializing AI models", duration: 2000, icon: Brain },
    { name: "Processing documents", duration: 3000, icon: FileText },
    { name: "Cross-referencing evidence", duration: 2500, icon: BarChart3 },
    { name: "Validating citations", duration: 2000, icon: Shield },
    { name: "Generating insights", duration: 1500, icon: Zap },
    { name: "Finalizing analysis", duration: 1000, icon: CheckCircle }
  ];

  useEffect(() => {
    if (!isVisible) return;

    let progressInterval: NodeJS.Timeout;
    let stepTimeout: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        onComplete();
        return;
      }

      setCurrentStep(stepIndex);
      const step = steps[stepIndex];
      const startProgress = (stepIndex / steps.length) * 100;
      const endProgress = ((stepIndex + 1) / steps.length) * 100;
      
      toast({
        title: step.name,
        description: `Processing ${taskName}...`,
        variant: "default"
      });

      let currentProgress = startProgress;
      progressInterval = setInterval(() => {
        currentProgress += (endProgress - startProgress) / (step.duration / 50);
        if (currentProgress >= endProgress) {
          currentProgress = endProgress;
          clearInterval(progressInterval);
        }
        setProgress(currentProgress);
      }, 50);

      stepTimeout = setTimeout(() => {
        runStep(stepIndex + 1);
      }, step.duration);
    };

    runStep(0);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [isVisible, taskName, onComplete, toast]);

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <Card className="p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <CurrentIcon className="h-12 w-12 text-primary mx-auto" />
          </motion.div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {steps[currentStep]?.name || "Processing..."}
            </h3>
            <p className="text-sm text-gray-600">
              {taskName} • Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="text-xs text-gray-500">
              {Math.round(progress)}% complete
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-2 rounded text-xs text-center ${
                  index < currentStep
                    ? 'bg-green-100 text-green-800'
                    : index === currentStep
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index < currentStep && <CheckCircle className="h-3 w-3 mx-auto mb-1" />}
                {index === currentStep && <Loader2 className="h-3 w-3 mx-auto mb-1 animate-spin" />}
                {step.name.split(' ')[0]}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface ProfessionalNotificationProps {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'error';
  actions?: Array<{ label: string; onClick: () => void; variant?: 'default' | 'outline' }>;
}

export function ProfessionalNotification({ title, description, type, actions }: ProfessionalNotificationProps) {
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Eye,
    error: AlertTriangle
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`p-4 rounded-lg border ${colors[type]} mb-4`}
    >
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm mt-1 opacity-90">{description}</p>
          {actions && (
            <div className="flex space-x-2 mt-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.variant || 'default'}
                  onClick={action.onClick}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface RealtimeStatsProps {
  documentsProcessed: number;
  contradictionsFound: number;
  confidenceScore: number;
  timeElapsed: string;
}

export function RealtimeStats({ documentsProcessed, contradictionsFound, confidenceScore, timeElapsed }: RealtimeStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{documentsProcessed.toLocaleString()}</div>
        <div className="text-xs text-gray-600">Documents Processed</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-red-600">{contradictionsFound}</div>
        <div className="text-xs text-gray-600">Contradictions Found</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{confidenceScore}%</div>
        <div className="text-xs text-gray-600">AI Confidence</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-purple-600">{timeElapsed}</div>
        <div className="text-xs text-gray-600">Processing Time</div>
      </Card>
    </motion.div>
  );
}

export function TutorialOverlay({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Aegis Legal Intelligence",
      description: "This AI-powered platform analyzes legal documents to find contradictions and generate court-ready reports.",
      highlight: ".upload-section"
    },
    {
      title: "Upload Documents",
      description: "Upload both your client's documents and opposing party's discovery for comprehensive analysis.",
      highlight: ".upload-buttons"
    },
    {
      title: "AI Analysis",
      description: "Our AI will cross-reference all documents to identify contradictions, patterns, and key evidence.",
      highlight: ".analysis-button"
    },
    {
      title: "Review Results",
      description: "All findings are anchored to specific exhibits and require human validation to prevent hallucinations.",
      highlight: ".results-section"
    },
    {
      title: "Generate Reports",
      description: "Create court-ready memorandums with proper citations and exhibit references.",
      highlight: ".report-section"
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <Card className="p-6 max-w-lg mx-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Skip Tutorial
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  onClose();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}