
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'; 
import { Moon, Sun, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AppearanceSettings: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [density, setDensity] = useState<"default" | "comfortable" | "compact">("default");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <ToggleGroup 
              type="single" 
              variant="outline"
              value={theme}
              onValueChange={(value) => {
                if (value) setTheme(value as "light" | "dark" | "system");
              }}
              className="flex flex-wrap gap-2 justify-start"
            >
              <ToggleGroupItem value="light" aria-label="Light mode">
                <Sun className="h-4 w-4 mr-2" />
                Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Dark mode">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </ToggleGroupItem>
              <ToggleGroupItem value="system" aria-label="System preference">
                <Monitor className="h-4 w-4 mr-2" />
                System
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Density</Label>
            <ToggleGroup 
              type="single" 
              variant="outline"
              value={density}
              onValueChange={(value) => {
                if (value) setDensity(value as "default" | "comfortable" | "compact");
              }}
              className="flex flex-wrap gap-2 justify-start"
            >
              <ToggleGroupItem value="default" aria-label="Default density">
                Default
              </ToggleGroupItem>
              <ToggleGroupItem value="comfortable" aria-label="Comfortable density">
                Comfortable
              </ToggleGroupItem>
              <ToggleGroupItem value="compact" aria-label="Compact density">
                Compact
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline">Reset to defaults</Button>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
