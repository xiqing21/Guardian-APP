
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { useAIMessages } from '../hooks/useAIMessages';
import { Role } from '../types/Role';
import MessageList from './ai-assistant/MessageList';
import QuickActions from './ai-assistant/QuickActions';
import MessageInput from './ai-assistant/MessageInput';

interface AIAssistantWithPropsProps {
  employeeTasks?: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
  currentRole?: Role;
}

const AIAssistantWithProps: React.FC<AIAssistantWithPropsProps> = ({ 
  employeeTasks, 
  currentRole 
}) => {
  const { messages, isTyping, sendMessage } = useAIMessages(employeeTasks, currentRole);

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  const getRoleTypeText = () => {
    if (!currentRole) return '数据治理';
    
    switch (currentRole.level) {
      case 'province': return '省级管理';
      case 'city': return '市级管理'; 
      case 'county': return '县级管理';
      case 'substation': return '供电所';
      case 'grid': return '网格作业';
      default: return '数据治理';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">AI数智助手</h2>
            <p className="text-sm text-gray-500">
              {currentRole ? `${currentRole.name} - ${getRoleTypeText()}智能体` : '专业数据治理智能体'}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700">在线</Badge>
            {currentRole && (
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                {getRoleTypeText()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 消息区域 */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* 底部操作区域 */}
      <div className="p-4 bg-white border-t">
        <QuickActions onActionClick={handleQuickAction} currentRole={currentRole} />
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default AIAssistantWithProps;
