import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Calendar, Bot, Zap, Shield, FileText, Activity, AlertTriangle, Settings, Search, BookOpen, UserPlus, Phone } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  progress: number;
  assignee: string;
  deadline: string;
  autoProcessable: boolean;
  aiResult?: any;
  confirmationData?: any;
}

interface TaskCardProps {
  task: Task;
  onTaskSelect: (task: Task) => void;
  onAIProcess: (task: Task) => void;
  showQuickProcess?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onTaskSelect, 
  onAIProcess,
  showQuickProcess = true
}) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: '待处理', className: 'bg-orange-100 text-orange-700 border-orange-200' },
      'in-progress': { label: '进行中', className: 'bg-blue-100 text-blue-700 border-blue-200' },
      'completed': { label: '已完成', className: 'bg-green-100 text-green-700 border-green-200' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      'high': { label: '高', className: 'bg-red-100 text-red-700' },
      'medium': { label: '中', className: 'bg-yellow-100 text-yellow-700' },
      'low': { label: '低', className: 'bg-gray-100 text-gray-700' }
    };
    return priorityMap[priority] || priorityMap.medium;
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      'phone': <Phone className="h-3 w-3" />,
      'address': <Search className="h-3 w-3" />,
      'contract': <FileText className="h-3 w-3" />,
      'certificate': <Shield className="h-3 w-3" />,
      'call': <Phone className="h-3 w-3" />,
      'archive': <FileText className="h-3 w-3" />,
      'meter': <Zap className="h-3 w-3" />,
      'safety': <Shield className="h-3 w-3" />,
      'payment': <Activity className="h-3 w-3" />,
      'equipment': <Settings className="h-3 w-3" />,
      'inspection': <Search className="h-3 w-3" />,
      'repair': <AlertTriangle className="h-3 w-3" />,
      'education': <BookOpen className="h-3 w-3" />,
      'violation': <AlertTriangle className="h-3 w-3" />,
      'newservice': <UserPlus className="h-3 w-3" />
    };
    return iconMap[category] || <FileText className="h-3 w-3" />;
  };

  const statusBadge = getStatusBadge(task.status);
  const priorityBadge = getPriorityBadge(task.priority);

  const handleTaskProcess = () => {
    console.log('任务卡片处理:', task.id, task.title);
    onTaskSelect(task);
  };

  const handleAIProcessClick = () => {
    console.log('任务卡片AI处理:', task.id);
    onAIProcess(task);
  };

  return (
    <Card className="hover:shadow-md transition-shadow border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {getCategoryIcon(task.category)}
                <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
              </div>
              {task.autoProcessable && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                  <Bot className="h-3 w-3 mr-1" />
                  AI可处理
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">{task.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={statusBadge.className} variant="outline">
              {statusBadge.label}
            </Badge>
            <Badge className={priorityBadge.className} variant="outline">
              {priorityBadge.label}
            </Badge>
          </div>
        </div>

        {/* 进度条 - 简化设计 */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">进度</span>
            <span className="text-xs font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-1" />
        </div>

        {/* AI处理结果预览 - 简化显示 */}
        {task.aiResult && (
          <div className="mb-3 p-2 bg-purple-50 rounded border-l-2 border-purple-400">
            <div className="flex items-center gap-1 mb-1">
              <Bot className="h-3 w-3 text-purple-600" />
              <span className="text-xs font-medium text-purple-700">AI已处理</span>
            </div>
            <div className="text-xs text-purple-600">
              {task.confirmationData?.approved ? '✓ 已确认通过' : '⏳ 等待确认'}
            </div>
          </div>
        )}

        {/* 任务详情和操作 - 统一操作逻辑 */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{task.assignee}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{task.deadline}</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            {task.status !== 'completed' && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={handleTaskProcess}
                >
                  {showQuickProcess ? '快速处理' : '处理'}
                </Button>
                {task.autoProcessable && !task.aiResult && (
                  <Button 
                    size="sm" 
                    className="h-7 px-2 text-xs bg-purple-500 hover:bg-purple-600 border-0"
                    onClick={handleAIProcessClick}
                  >
                    AI处理
                  </Button>
                )}
              </>
            )}
            {task.status === 'completed' && (
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={handleTaskProcess}
              >
                查看
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
