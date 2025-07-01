
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { useTaskManagement } from '../hooks/useTaskManagement';
import AnimatedNumber from './AnimatedNumber';

interface TaskDetailModalProps {
  type: 'completed' | 'pending';
  onBack: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ type, onBack }) => {
  const { tasks } = useTaskManagement();
  
  const filteredTasks = tasks.filter(task => 
    type === 'completed' ? task.status === 'completed' : task.status === 'pending'
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部导航 */}
      <div className="flex items-center gap-3 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack}
          className="h-8 w-8 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-lg font-bold">
            {type === 'completed' ? '已完成任务' : '待完成任务'}
          </h1>
          <p className="text-sm text-gray-600">
            共 <AnimatedNumber value={filteredTasks.length} /> 个任务
          </p>
        </div>
      </div>

      {/* 统计卡片 */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                <AnimatedNumber value={filteredTasks.length} />
              </div>
              <div className="text-xs text-gray-600">总数量</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                <AnimatedNumber value={filteredTasks.filter(t => t.priority === 'high').length} />
              </div>
              <div className="text-xs text-gray-600">高优先级</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                <AnimatedNumber value={filteredTasks.filter(t => t.autoProcessable).length} />
              </div>
              <div className="text-xs text-gray-600">可自动化</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 任务列表 */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* 任务头部信息 */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(task.status)}
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                    {task.status === 'completed' ? '已完成' : 
                     task.status === 'in-progress' ? '进行中' : '待处理'}
                  </Badge>
                </div>

                {/* 进度条 */}
                {task.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">完成进度</span>
                      <span className="text-xs font-medium">
                        <AnimatedNumber value={task.progress} suffix="%" />
                      </span>
                    </div>
                    <Progress value={task.progress} className="h-1.5" />
                  </div>
                )}

                {/* 任务详情 */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <User className="h-3 w-3" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{task.deadline}</span>
                  </div>
                </div>

                {/* 自动化标识 */}
                {task.autoProcessable && (
                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                    支持AI自动化处理
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 空状态 */}
      {filteredTasks.length === 0 && (
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              暂无{type === 'completed' ? '已完成' : '待完成'}任务
            </h3>
            <p className="text-sm text-gray-500">
              {type === 'completed' ? 
                '还没有完成的任务，继续努力！' : 
                '太棒了！所有任务都已处理完成'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskDetailModal;
