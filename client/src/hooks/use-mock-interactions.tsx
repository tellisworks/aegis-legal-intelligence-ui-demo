import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useMockInteractions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>({});
  const { toast } = useToast();

  const showExhibit = (title: string, type: string = "document") => {
    setModalProps({ title, type });
    setActiveModal("exhibit");
    toast({
      title: "Exhibit Opened",
      description: `Displaying ${title}`,
      variant: "default"
    });
  };

  const showAnalysis = (title: string, type: string = "general") => {
    setModalProps({ title, type });
    setActiveModal("analysis");
    toast({
      title: "Analysis Generated", 
      description: `Running ${title} analysis`,
      variant: "default"
    });
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
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
      variant: "default"
    });
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${docName} saved to Downloads folder`,
        variant: "default"
      });
    }, 2000);
  };

  const generateReport = (reportType: string) => {
    toast({
      title: "Generating Report",
      description: `Creating ${reportType}...`,
      variant: "default"
    });
    // Simulate generation delay
    setTimeout(() => {
      showReport(`${reportType} Report`);
    }, 3000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps({});
  };

  return {
    activeModal,
    modalProps,
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