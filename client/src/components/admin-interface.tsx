import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, UserPlus, Mail, ExternalLink, Check, RefreshCw, Activity, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

interface InviteResult {
  id: string;
  email: string;
  name: string;
  inviteCode: string;
  inviteUrl: string;
}

interface ActivityData {
  totalInvited: number;
  totalAccessed: number;
  users: {
    name: string;
    email: string;
    invitedAt: string;
    lastAccessed: string | null;
    hasLoggedIn: boolean;
  }[];
  recentActivity: any[];
}

export default function AdminInterface() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteResult, setInviteResult] = useState<InviteResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const { toast } = useToast();

  // Fetch activity data
  const { data: activityData, isLoading: activityLoading, refetch: refetchActivity } = useQuery<ActivityData>({
    queryKey: ["/api/admin/activity"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Force component to use fresh data
  useEffect(() => {
    setLastRefreshed(new Date());
  }, []);

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
      // Add cache-busting timestamp to ensure fresh request
      const response = await fetch(`/api/admin/invite?t=${Date.now()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
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
      // Create a temporary textarea to preserve formatting
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      setCopiedField(fieldName);
      toast({
        title: "Copied!",
        description: `${fieldName} copied to clipboard with formatting preserved`,
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Tabs defaultValue="invite" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invite" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Create Invitations
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Login Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invite" className="space-y-6">
          {/* Create Invitation */}
          <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Create Invitation</span>
              </CardTitle>
              <CardDescription>
                Generate secure invite codes for non-Replit users
              </CardDescription>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              <span>Updated: {lastRefreshed.toLocaleTimeString()}</span>
            </div>
          </div>
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
                <p className="text-xs text-muted-foreground mb-2">
                  Tip: If formatting is lost when pasting, try Ctrl+Shift+V (Windows) or Cmd+Shift+V (Mac) for "Paste as Plain Text"
                </p>
                <Textarea
                  value={`Subject: Invitation to the Aegis Legal Intelligence Demo

Hi ${inviteResult.name},

Imagine instantly organizing, indexing, and analyzing over 1,000 documents from a family law case with the push of a button. That's the power of the Aegis Legal Intelligence platform.

Our AI-powered system helps family law attorneys quickly uncover key contradictions and misconduct patterns buried in case documents, giving you a crucial advantage.

🔗 CLICK HERE TO ACCESS THE DEMO:
${inviteResult.inviteUrl}

Or visit the demo and enter this invite code: ${inviteResult.inviteCode}

This interactive demo will show you how our system anchors all AI outputs to specific exhibits and requires attorney validation, eliminating hallucination risks and making it fully court-defensible.

If you have any questions or would like to discuss how Aegis can help your practice, please feel free to contact us.

Best regards,
The Aegis Team
Aegis Legal Intelligence`}
                  readOnly
                  className="text-sm resize-none"
                  rows={14}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`Subject: Invitation to the Aegis Legal Intelligence Demo

Hi ${inviteResult.name},

Imagine instantly organizing, indexing, and analyzing over 1,000 documents from a family law case with the push of a button. That's the power of the Aegis Legal Intelligence platform.

Our AI-powered system helps family law attorneys quickly uncover key contradictions and misconduct patterns buried in case documents, giving you a crucial advantage.

🔗 CLICK HERE TO ACCESS THE DEMO:
${inviteResult.inviteUrl}

Or visit the demo and enter this invite code: ${inviteResult.inviteCode}

This interactive demo will show you how our system anchors all AI outputs to specific exhibits and requires attorney validation, eliminating hallucination risks and making it fully court-defensible.

If you have any questions or would like to discuss how Aegis can help your practice, please feel free to contact us.

Best regards,
The Aegis Team
Aegis Legal Intelligence`, "Email Template")}
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
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Activity Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Login Activity Dashboard</span>
              </CardTitle>
              <CardDescription>
                Track who has logged into your Aegis Legal Intelligence demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : activityData ? (
                <div className="space-y-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-2xl font-bold text-blue-900">{activityData.totalInvited}</div>
                            <div className="text-sm text-blue-600">Total Invited</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Check className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-2xl font-bold text-green-900">{activityData.totalAccessed}</div>
                            <div className="text-sm text-green-600">Have Logged In</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-orange-600" />
                          <div>
                            <div className="text-2xl font-bold text-orange-900">
                              {Math.round((activityData.totalAccessed / activityData.totalInvited) * 100) || 0}%
                            </div>
                            <div className="text-sm text-orange-600">Login Rate</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* User List */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">User Activity</h3>
                    <div className="space-y-3">
                      {activityData.users.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${user.hasLoggedIn ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">
                              {user.hasLoggedIn ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  ✓ Logged In
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                  Invited Only
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {user.hasLoggedIn 
                                ? `Last access: ${new Date(user.lastAccessed!).toLocaleString()}`
                                : `Invited: ${new Date(user.invitedAt).toLocaleString()}`
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Refresh Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => refetchActivity()}
                      className="flex items-center space-x-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Refresh Activity</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Failed to load activity data
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}