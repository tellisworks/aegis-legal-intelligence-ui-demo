import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, UserPlus, Mail, ExternalLink, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface InviteResult {
  id: string;
  email: string;
  name: string;
  inviteCode: string;
  inviteUrl: string;
}

export default function AdminInterface() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteResult, setInviteResult] = useState<InviteResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setInviteResult(data.user);
        toast({
          title: "Invitation Created",
          description: `Invite created for ${name}`,
          variant: "default",
        });
        setEmail("");
        setName("");
      } else {
        toast({
          title: "Failed to Create Invite",
          description: data.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast({
        title: "Copied!",
        description: `${fieldName} copied to clipboard`,
        variant: "default",
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Create Invitation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Create Invitation</span>
          </CardTitle>
          <CardDescription>
            Generate secure invite codes for non-Replit users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email" 
                  placeholder="john@lawfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Invitation"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Invitation Result */}
      {inviteResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Invitation Created Successfully!</CardTitle>
              <CardDescription className="text-green-600">
                Share these details with {inviteResult.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Invite URL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Invitation URL (Recommended)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={inviteResult.inviteUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(inviteResult.inviteUrl, "Invitation URL")}
                  >
                    {copiedField === "Invitation URL" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Invite Code */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Invite Code (Alternative)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={inviteResult.inviteCode}
                    readOnly
                    className="font-mono text-sm tracking-wider"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(inviteResult.inviteCode, "Invite Code")}
                  >
                    {copiedField === "Invite Code" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Email Template */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Template</Label>
                <Textarea
                  value={`Hi ${inviteResult.name},

You've been invited to view the Aegis Legal Intelligence demo - imagine taking 500 documents from your client and opposing counsel and having them organized, indexed and analyzed with the push of a button! 

Our AI-powered legal analysis platform helps attorneys identify contradictions, misconduct patterns, and parental alienation behaviors in family law cases.

🔗 CLICK HERE TO ACCESS THE DEMO:
${inviteResult.inviteUrl}

Or visit the demo and enter this invite code: ${inviteResult.inviteCode}

This interactive demo showcases how our system anchors all AI outputs to specific exhibits and requires attorney validation to eliminate hallucination risks - making it court-defensible.

If you have any questions or suggestions, please feel free to email me at ellistw@hotmail.com

Best regards,
Tom Ellis
Founder`}
                  readOnly
                  className="text-sm resize-none"
                  rows={14}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`Hi ${inviteResult.name},

You've been invited to view the Aegis Legal Intelligence demo - imagine taking 500 documents from your client and opposing counsel and having them organized, indexed and analyzed with the push of a button! 

Our AI-powered legal analysis platform helps attorneys identify contradictions, misconduct patterns, and parental alienation behaviors in family law cases.

🔗 CLICK HERE TO ACCESS THE DEMO:
${inviteResult.inviteUrl}

Or visit the demo and enter this invite code: ${inviteResult.inviteCode}

This interactive demo showcases how our system anchors all AI outputs to specific exhibits and requires attorney validation to eliminate hallucination risks - making it court-defensible.

If you have any questions or suggestions, please feel free to email me at ellistw@hotmail.com

Best regards,
Tom Ellis
Founder`, "Email Template")}
                >
                  {copiedField === "Email Template" ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Email
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <Badge variant="outline" className="mt-1">1</Badge>
            <div>
              <p className="font-medium">Create Invitation</p>
              <p className="text-sm text-gray-600">Enter the recipient's name and email</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Badge variant="outline" className="mt-1">2</Badge>
            <div>
              <p className="font-medium">Share Access</p>
              <p className="text-sm text-gray-600">Send them the invitation URL or invite code</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Badge variant="outline" className="mt-1">3</Badge>
            <div>
              <p className="font-medium">Secure Access</p>
              <p className="text-sm text-gray-600">They'll have 24-hour sessions with full demo access</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}