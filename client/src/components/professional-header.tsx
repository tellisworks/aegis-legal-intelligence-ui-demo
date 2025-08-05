import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, HelpCircle, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ProfessionalHeader() {
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-300" />
            <div>
              <h1 className="text-2xl font-bold">Aegis Legal Intelligence</h1>
              <p className="text-blue-200 text-sm">AI-Powered Document Analysis Platform</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live System
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Real-time status indicators */}
          <div className="text-right">
            <div className="text-xs text-blue-200">System Status</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-300 border-green-300">
                <Zap className="w-3 h-3 mr-1" />
                AI Online
              </Badge>
              <Badge variant="outline" className="text-blue-300 border-blue-300">
                <Users className="w-3 h-3 mr-1" />
                47 Active Users
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Info */}
            {user && (
              <div className="text-right text-sm">
                <div className="text-blue-100">{user.name}</div>
                <div className="text-xs text-blue-200">{user.email}</div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional features bar */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-300" />
            <span className="text-blue-100">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-300" />
            <span className="text-blue-100">Bank-Grade Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-blue-100">Real-time Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-300" />
            <span className="text-blue-100">Multi-firm Deployment</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}