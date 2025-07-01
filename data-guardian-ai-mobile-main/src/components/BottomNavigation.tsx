
import React from 'react';
import { Button } from '@/components/ui/button';
import { Database, ChartBar, Check, MessageSquare } from 'lucide-react';
import { RoleContent } from '../types/Role';

interface BottomNavigationProps {
  activeTab: string;
  roleContent: RoleContent;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  roleContent,
  onTabChange
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="flex items-center justify-around py-2">
        <Button
          variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
          onClick={() => onTabChange('dashboard')}
        >
          <Database className="h-4 w-4" />
          <span>智能工作台</span>
        </Button>
        {roleContent.showAnalytics && (
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => onTabChange('analytics')}
          >
            <ChartBar className="h-4 w-4" />
            <span>分析报告</span>
          </Button>
        )}
        {roleContent.showTasks && (
          <Button
            variant={activeTab === 'tasks' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => onTabChange('tasks')}
          >
            <Check className="h-4 w-4" />
            <span>任务处理</span>
          </Button>
        )}
        <Button
          variant={activeTab === 'ai-assistant' ? 'default' : 'ghost'}
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
          onClick={() => onTabChange('ai-assistant')}
        >
          <MessageSquare className="h-4 w-4" />
          <span>AI助手</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
