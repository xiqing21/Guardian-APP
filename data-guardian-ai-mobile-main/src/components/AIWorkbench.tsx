
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  MapPin,
  Bot
} from 'lucide-react';
import { Role, RoleContent } from '../types/Role';

interface AIWorkbenchProps {
  currentRole: Role;
  roleContent: RoleContent;
  roleTasks: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
  integratedAIStatus: {
    activeAgents: number;
    processingTasks: number;
    completionRate: number;
    pendingAutoTasks: number;
    aiProcessingTasks: number;
  };
  onTabChange: (tab: string) => void;
}

const AIWorkbench: React.FC<AIWorkbenchProps> = ({
  currentRole,
  roleContent,
  roleTasks,
  integratedAIStatus,
  onTabChange
}) => {
  // 只有省市县级别显示独立的AI助手入口
  const isManagementLevel = currentRole.level === 'province' || currentRole.level === 'city' || currentRole.level === 'county';
  
  // 供电所和网格员级别的AI工作台已整合到LevelHomepage中，这里不再显示
  if (!isManagementLevel) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
      <CardContent className="p-4 relative z-10">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI助手入口</h3>
              <div className="flex items-center gap-2 text-indigo-100 text-sm">
                <MapPin className="h-3 w-3" />
                <span>{currentRole.name}</span>
                <Badge className="bg-white/20 text-xs px-2 py-0">管理助手</Badge>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => onTabChange('ai-assistant')}
            className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-sm backdrop-blur-sm"
          >
            <Bot className="h-4 w-4 mr-1" />
            AI助手
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkbench;
