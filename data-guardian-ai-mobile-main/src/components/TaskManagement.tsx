import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Bot, MessageSquare } from 'lucide-react';
import TaskDetail from './TaskDetail';
import AIProcessingDetail from './AIProcessingDetail';
import IntegratedTaskOverview from './IntegratedTaskOverview';
import TaskCategoryFilter from './TaskCategoryFilter';
import TaskCard from './TaskCard';
import TaskConfirmation from './TaskConfirmation';
import NewTaskForm from './NewTaskForm';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { Task } from '../types/Task';

interface TaskManagementProps {
  employeeTasks?: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
  onSwitchToAI?: () => void;
  initialSelectedTask?: Task | null;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ 
  employeeTasks, 
  onSwitchToAI,
  initialSelectedTask
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(initialSelectedTask || null);
  const [aiProcessingTask, setAiProcessingTask] = useState<Task | null>(null);
  const [confirmationTask, setConfirmationTask] = useState<{ task: Task; result: any } | null>(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  
  const {
    tasks,
    categories,
    overallProgress,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    taskStats,
    addTask,
    updateTask,
    handleAIReassignTasks
  } = useTaskManagement(employeeTasks);

  // 监听来自工作台的任务管理打开事件
  useEffect(() => {
    const handleOpenTaskManagement = (event: CustomEvent) => {
      const taskDetail = event.detail;
      if (taskDetail?.selectedTask) {
        setSelectedTask(taskDetail.selectedTask);
      }
    };

    window.addEventListener('openTaskManagement', handleOpenTaskManagement as EventListener);
    
    return () => {
      window.removeEventListener('openTaskManagement', handleOpenTaskManagement as EventListener);
    };
  }, []);

  // 处理初始选中任务
  useEffect(() => {
    if (initialSelectedTask) {
      setSelectedTask(initialSelectedTask);
    }
  }, [initialSelectedTask]);

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  // 获取可AI处理的任务数量
  const aiProcessableTasks = tasks.filter(task => task.autoProcessable && task.status === 'pending').length;

  const handleTaskConfirm = (taskId: number, result: any) => {
    updateTask(taskId, {
      status: result.status === 'resolved' ? 'completed' : 'pending',
      progress: result.status === 'resolved' ? 100 : 0,
      confirmationData: result
    });
    console.log('任务确认结果:', result);
  };

  const handleAIProcess = (task: Task) => {
    console.log('启动AI处理:', task);
    setAiProcessingTask(task);
  };

  const handleAIComplete = (result: any) => {
    console.log('AI处理完成，等待人工确认:', result);
    if (aiProcessingTask) {
      setConfirmationTask({ task: aiProcessingTask, result });
      setAiProcessingTask(null);
    }
  };

  const handleConfirmationComplete = (approved: boolean, comments?: string) => {
    if (!confirmationTask) return;

    console.log('人工确认结果:', { approved, comments });
    
    updateTask(confirmationTask.task.id, {
      status: approved ? 'completed' : 'pending',
      progress: approved ? 100 : 0,
      assignee: approved ? 'AI智能体' : confirmationTask.task.assignee,
      aiResult: approved ? confirmationTask.result : undefined,
      confirmationData: { approved, comments, timestamp: new Date().toISOString() }
    });
    
    setConfirmationTask(null);
  };

  const handleNewTaskSubmit = (newTask: Task) => {
    addTask(newTask);
  };

  // 快速处理任务 - 统一处理逻辑
  const handleQuickProcess = (task: Task) => {
    console.log('任务管理快速处理:', task.id);
    // 直接跳转到任务详情页面进行处理
    setSelectedTask(task);
  };

  // 智能助手入口
  const handleAIAssistantEntry = () => {
    if (onSwitchToAI) {
      onSwitchToAI();
    }
  };

  if (showNewTaskForm) {
    return (
      <NewTaskForm 
        onBack={() => setShowNewTaskForm(false)}
        onSubmit={handleNewTaskSubmit}
      />
    );
  }

  if (confirmationTask) {
    return (
      <TaskConfirmation
        task={confirmationTask.task}
        aiResult={confirmationTask.result}
        onConfirm={handleConfirmationComplete}
        onBack={() => setConfirmationTask(null)}
      />
    );
  }

  if (aiProcessingTask) {
    return (
      <AIProcessingDetail 
        taskId={aiProcessingTask.id}
        taskType={aiProcessingTask.category}
        onComplete={handleAIComplete}
        onCancel={() => setAiProcessingTask(null)}
      />
    );
  }

  if (selectedTask) {
    return (
      <TaskDetail 
        task={selectedTask}
        onBack={() => setSelectedTask(null)}
        onConfirm={handleTaskConfirm}
      />
    );
  }

  return (
    <div className="p-3 pb-20 bg-gray-50 min-h-screen">
      <IntegratedTaskOverview
        overallProgress={overallProgress}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        pendingTasks={pendingTasks}
        onReassignTasks={handleAIReassignTasks}
        taskStats={taskStats}
      />

      {/* AI助手联动卡片 */}
      {aiProcessableTasks > 0 && (
        <Card className="mb-3 border-0 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-l-purple-500">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm font-medium text-purple-700">AI智能处理</div>
                  <div className="text-xs text-purple-600">
                    {aiProcessableTasks}个任务可自动处理，节省80%时间
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleAIAssistantEntry}
                  className="h-7 px-3 text-xs bg-purple-500 hover:bg-purple-600"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  AI助手
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAIReassignTasks}
                  className="h-7 px-3 text-xs"
                >
                  <Bot className="h-3 w-3 mr-1" />
                  智能分配
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-3 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <span>任务管理</span>
            <Button 
              onClick={() => setShowNewTaskForm(true)}
              size="sm"
              className="h-7 px-2 text-xs bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-3 w-3 mr-1" />
              新建任务
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <TaskCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskSelect={setSelectedTask}
            onAIProcess={handleAIProcess}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
