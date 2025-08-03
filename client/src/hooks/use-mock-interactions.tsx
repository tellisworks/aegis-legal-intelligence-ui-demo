import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useMockInteractions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const { toast } = useToast();

  const showExhibit = (title: string, type: string = "document") => {
    setIsProcessing(true);
    setCurrentTask(`Loading ${title}`);
    
    // Simulate realistic loading time
    setTimeout(() => {
      setIsProcessing(false);
      setModalProps({ title, type });
      setActiveModal("exhibit");
      toast({
        title: "Document Loaded",
        description: `${title} ready for review`,
        variant: "default"
      });
    }, 1500);
  };

  const showAnalysis = (title: string, type: string = "general") => {
    setIsProcessing(true);
    setCurrentTask(title);
    
    // Realistic AI processing simulation
    setTimeout(() => {
      setIsProcessing(false);
      setModalProps({ title, type });
      setActiveModal("analysis");
      toast({
        title: "Analysis Complete", 
        description: `${title} completed with 94% confidence`,
        variant: "default"
      });
    }, 3500);
  };

  const showReport = (title: string) => {
    setModalProps({ title });
    setActiveModal("report");
    toast({
      title: "Report Generated",
      description: `Court-ready ${title} created`,
      variant: "default"
    });
  };

  const showMessageTrail = () => {
    showExhibit("Text Message Thread Analysis", "messages");
  };

  const showCommunicationAnalysis = () => {
    showAnalysis("Communication Pattern Analysis", "communication");
  };

  const showTimelineView = () => {
    showAnalysis("Timeline Reconstruction", "timeline");
  };

  const showDiscoveryResponse = () => {
    showExhibit("Opposing Interrogatory Responses", "discovery");
  };

  const showEmailThread = () => {
    showExhibit("Full Email Thread Analysis", "email");
  };

  const downloadDocument = (docName: string) => {
    setIsProcessing(true);
    setCurrentTask(`Preparing ${docName}`);
    
    toast({
      title: "Preparing Download",
      description: `Generating ${docName} with digital signatures...`,
      variant: "default"
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Download Ready",
        description: `${docName} is ready. Click to save to your device.`,
        variant: "default"
      });
      
      // Simulate actual file download
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,Mock Legal Document: ${docName}\n\nThis is a simulated download from Aegis Legal Intelligence.\nGenerated on: ${new Date().toLocaleString()}\n\nDocument would contain:\n- Court-ready formatting\n- Digital signatures\n- Exhibit references\n- Legal citations`;
      link.download = docName;
      link.click();
    }, 2500);
  };

  const generateReport = (reportType: string) => {
    setIsProcessing(true);
    setCurrentTask(`Generating ${reportType}`);
    
    toast({
      title: "AI Report Generation Started",
      description: `Processing ${reportType} with citation validation...`,
      variant: "default"
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      showReport(`${reportType}`);
      toast({
        title: "Report Generated Successfully",
        description: `${reportType} is ready for review and download`,
        variant: "default"
      });
    }, 4500);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps({});
  };

  return {
    activeModal,
    modalProps,
    isProcessing,
    currentTask,
    showExhibit,
    showAnalysis,
    showReport,
    showMessageTrail,
    showCommunicationAnalysis,
    showTimelineView,
    showDiscoveryResponse,
    showEmailThread,
    downloadDocument,
    generateReport,
    closeModal
  };
}