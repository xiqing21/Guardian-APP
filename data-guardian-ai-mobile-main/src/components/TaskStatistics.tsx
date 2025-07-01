
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedNumber from './AnimatedNumber';

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

interface TaskStatisticsProps {
  tasks: Task[];
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks }) => {
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');

  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-2">
          <div className="text-lg font-bold text-blue-600">
            <AnimatedNumber value={tasks.length} />
          </div>
          <div className="text-xs text-gray-600">总任务</div>
        </CardContent>
      </Card>
      <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100">
        <CardContent className="p-2">
          <div className="text-lg font-bold text-orange-600">
            <AnimatedNumber value={pendingTasks.length} />
          </div>
          <div className="text-xs text-gray-600">待处理</div>
        </CardContent>
      </Card>
      <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="p-2">
          <div className="text-lg font-bold text-green-600">
            <AnimatedNumber value={completedTasks.length} />
          </div>
          <div className="text-xs text-gray-600">已完成</div>
        </CardContent>
      </Card>
      <Card className="text-center bg-gradient-to-br from-red-50 to-red-100">
        <CardContent className="p-2">
          <div className="text-lg font-bold text-red-600">
            <AnimatedNumber value={urgentTasks.length} />
          </div>
          <div className="text-xs text-gray-600">紧急</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStatistics;
