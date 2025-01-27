import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Database, Activity, Trash } from "lucide-react";

const Settings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [messageRetention, setMessageRetention] = useState("30");
  const [rateLimit, setRateLimit] = useState("100");
  const [logRetention, setLogRetention] = useState("7");

  const handleClearLogs = () => {
    // API call to clear system logs
  };

  const handleUpdateSettings = () => {
    // API call to update admin settings
  };

  return (
    <div className="container mx-auto p-6 space-y-6 h-screen overflow-auto scrollbar-hide">
      <h2 className="text-2xl font-bold mb-6">System Settings</h2>

      <div className="grid gap-6">
        {/* System Controls */}
        <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-yellow-500" />
            System Controls
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable user access
                </p>
              </div>
              <Switch 
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
              />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Data Management
          </h3>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label>Message Retention (days)</Label>
                <Input 
                  type="number"
                  value={messageRetention}
                  onChange={(e) => setMessageRetention(e.target.value)}
                  min="1"
                  max="365"
                />
              </div>
              <div>
                <Label>API Rate Limit (requests/minute)</Label>
                <Input 
                  type="number"
                  value={rateLimit}
                  onChange={(e) => setRateLimit(e.target.value)}
                  min="10"
                  max="1000"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* System Logs */}
        <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            System Logs
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Log Retention (days)</Label>
              <Input 
                type="number"
                value={logRetention}
                onChange={(e) => setLogRetention(e.target.value)}
                min="1"
                max="30"
              />
            </div>
            <Button 
              variant="destructive"
              size="sm"
              onClick={handleClearLogs}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              Clear System Logs
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleUpdateSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;