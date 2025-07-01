
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  PlayCircle, 
  Zap,
  Calendar
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  assignee: string;
  deadline: string;
  autoProcessable: boolean;
}

interface TaskListProps {
  tasks: Task[];
  status: 'pending' | 'in-progress' | 'completed';
  onTaskClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, status, onTaskClick }) => {
  const getStatusIcon = (taskStatus: string) => {
    switch (taskStatus) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return null;
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

  const filteredTasks = tasks.filter(t => t.status === status);
  const aiProcessableTasks = tasks.filter(t => t.autoProcessable && t.status === 'pending');

  if (status === 'pending') {
    return (
      <div className="space-y-3">
        {/* AI助手提醒 */}
        {aiProcessableTasks.length > 0 && (
          <div className="p-3 rounded-lg border-l-4 border-l-purple-500 bg-purple-50 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-700 text-sm">
                    AI智能助手 ({aiProcessableTasks.length}个可处理)
                  </div>
                  <div className="text-xs text-purple-600">
                    预计节省80%处理时间
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-xs"
              >
                <Zap className="h-3 w-3 mr-1" />
                启动AI
              </Button>
            </div>
          </div>
        )}
        
        {filteredTasks.length > 0 ? (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div 
                key={task.id}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <span className="font-medium text-sm">{task.title}</span>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">紧急</Badge>
                    )}
                    {task.autoProcessable && (
                      <Badge className="bg-purple-100 text-purple-600 text-xs">AI可处理</Badge>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-3">{task.description}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    <span>负责人: {task.assignee}</span>
                    <span className="ml-3">截止: {task.deadline}</span>
                  </div>
                  <Button
                    size="sm"
                    className="text-xs h-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task);
                    }}
                  >
                    <PlayCircle className="h-3 w-3 mr-1" />
                    处理
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500" />
            <div className="text-sm">太棒了！暂无待办任务</div>
          </div>
        )}
      </div>
    );
  }

  if (status === 'in-progress') {
    return (
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div 
                key={task.id}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <span className="font-medium text-sm">{task.title}</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-600 text-xs">进行中</Badge>
                </div>
                <div className="text-xs text-gray-600 mb-2">{task.description}</div>
                <div className="space-y-2">
                  <Progress value={task.progress} className="h-1" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>进度: {task.progress}%</span>
                    <span>负责人: {task.assignee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Clock className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <div className="text-sm">暂无进行中的任务</div>
          </div>
        )}
      </div>
    );
  }

  // Completed tasks
  return (
    <div className="space-y-3">
      {filteredTasks.length > 0 ? (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 bg-green-50 rounded-lg border"
            >
              <div className="flex-1">
                <div className="font-medium text-sm text-green-700">{task.title}</div>
                <div className="text-xs text-green-600">{task.description}</div>
                <div className="text-xs text-green-500 mt-1">完成时间: {task.deadline}</div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          <div className="text-sm">暂无完成任务</div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
