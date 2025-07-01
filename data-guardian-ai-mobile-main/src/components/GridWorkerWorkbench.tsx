
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Bot, 
  User,
  Target,
  ArrowRight,
  Bell,
  BellDot,
  Zap,
  TrendingUp,
  CheckCircle2,
  Play,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Task } from '../types/Task';
import AnimatedNumber from './AnimatedNumber';

interface GridWorkerWorkbenchProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAIAssistClick: () => void;
  onViewAllTasks: () => void;
  onQuickProcess?: (task: Task) => void;
  employeeTasks?: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
}

const GridWorkerWorkbench: React.FC<GridWorkerWorkbenchProps> = ({
  tasks,
  onTaskClick,
  onAIAssistClick,
  onViewAllTasks,
  onQuickProcess,
  employeeTasks
}) => {
  const [activeTab, setActiveTab] = useState('workbench');

  // 任务统计
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');
  const aiProcessableTasks = tasks.filter(t => t.autoProcessable && t.status === 'pending');

  // 今日完成率
  const todayCompletionRate = employeeTasks ? 
    Math.round((employeeTasks.completedToday / employeeTasks.totalToday) * 100) : 
    Math.round((completedTasks.length / tasks.length) * 100);

  // 处理任务点击 - 统一跳转逻辑
  const handleTaskProcess = (task: Task) => {
    console.log('工作台任务处理跳转:', task.id, task.title);
    onTaskClick(task);
  };

  // 快速处理任务 - 与任务管理模块保持一致
  const handleQuickProcess = (task: Task) => {
    console.log('工作台快速处理任务:', task.id);
    if (onQuickProcess) {
      onQuickProcess(task);
    } else {
      window.dispatchEvent(new CustomEvent('openTaskManagement', { detail: { selectedTask: task } }));
    }
  };

  // 生成提醒数据
  const reminders = [
    {
      id: 1,
      type: 'urgent',
      title: '紧急任务提醒',
      message: `您有 ${urgentTasks.length} 个紧急任务待处理`,
      time: '刚刚',
      priority: 'high',
      actionable: true,
      relatedTask: urgentTasks[0]
    },
    {
      id: 2,
      type: 'ai',
      title: 'AI智能助手',
      message: `${aiProcessableTasks.length} 个任务可使用AI自动处理`,
      time: '5分钟前',
      priority: 'medium',
      actionable: true
    },
    {
      id: 3,
      type: 'deadline',
      title: '截止时间提醒',
      message: '今日有3个任务即将到期',
      time: '1小时前',
      priority: 'medium',
      actionable: false
    },
    {
      id: 4,
      type: 'completion',
      title: '任务完成',
      message: '恭喜！您今日已完成8个任务',
      time: '2小时前',
      priority: 'low',
      actionable: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'ai': return <Bot className="h-4 w-4 text-purple-500" />;
      case 'deadline': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'completion': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-900">网格员工作台</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700 text-xs ml-auto">实时更新</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 优化后的快速概览指标 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center h-10 w-10 bg-blue-500 rounded-full mr-3">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  <AnimatedNumber value={pendingTasks.length} />
                </div>
                <div className="text-xs text-blue-700">待办任务</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
              <div className="flex items-center justify-center h-10 w-10 bg-red-500 rounded-full mr-3">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">
                  <AnimatedNumber value={urgentTasks.length} />
                </div>
                <div className="text-xs text-red-700">紧急任务</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center justify-center h-10 w-10 bg-orange-500 rounded-full mr-3">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">
                  <AnimatedNumber value={inProgressTasks.length} />
                </div>
                <div className="text-xs text-orange-700">进行中</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center justify-center h-10 w-10 bg-green-500 rounded-full mr-3">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  <AnimatedNumber value={employeeTasks?.completedToday || completedTasks.length} />
                </div>
                <div className="text-xs text-green-700">今日完成</div>
              </div>
            </div>
          </div>

          {/* 优化后的完成率进度条 */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-emerald-800">今日完成率</span>
              </div>
              <span className="text-xl font-bold text-emerald-600">
                <AnimatedNumber value={todayCompletionRate} suffix="%" />
              </span>
            </div>
            <Progress value={todayCompletionRate} className="h-3 mb-2" />
            <div className="text-xs text-emerald-600 text-center">
              已完成 {employeeTasks?.completedToday || completedTasks.length} / 
              总计 {employeeTasks?.totalToday || tasks.length} 个任务
            </div>
          </div>

          {/* 优化后的集成标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="workbench" className="text-xs flex items-center gap-1">
                <Target className="h-3 w-3" />
                工作台
              </TabsTrigger>
              <TabsTrigger value="todos" className="text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                我的待办
              </TabsTrigger>
              <TabsTrigger value="reminders" className="text-xs flex items-center gap-1 relative">
                <BellDot className="h-3 w-3" />
                我的提醒
                {reminders.filter(r => r.priority === 'high').length > 0 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* 工作台总览 - 优化UI */}
            <TabsContent value="workbench" className="space-y-4 mt-4">
              {/* 紧急任务和AI助手提醒 - 重新设计 */}
              {(urgentTasks.length > 0 || aiProcessableTasks.length > 0) && (
                <div className="space-y-3">
                  {urgentTasks.length > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 bg-red-500 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-red-800 text-sm">
                              紧急任务提醒
                            </div>
                            <div className="text-xs text-red-600">
                              {urgentTasks.length}个紧急任务需要立即处理
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleTaskProcess(urgentTasks[0])}
                          className="bg-red-500 hover:bg-red-600 text-white border-0 text-xs px-4 h-8"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          立即处理
                        </Button>
                      </div>
                    </div>
                  )}

                  {aiProcessableTasks.length > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 bg-purple-500 rounded-full">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-purple-800 text-sm">
                              AI智能助手
                            </div>
                            <div className="text-xs text-purple-600">
                              {aiProcessableTasks.length}个任务可自动处理，节省80%时间
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={onAIAssistClick}
                          className="bg-purple-500 hover:bg-purple-600 text-white border-0 text-xs px-4 h-8"
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          启动AI
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 今日重点任务 - 统一样式 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    今日重点任务
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onViewAllTasks}
                    className="text-xs h-7 border-gray-300"
                  >
                    查看全部
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                {pendingTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900 text-sm">{task.title}</span>
                          <div className="flex gap-1">
                            {task.priority === 'high' && (
                              <Badge className="bg-red-100 text-red-600 text-xs px-2 py-0.5">紧急</Badge>
                            )}
                            {task.autoProcessable && (
                              <Badge className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5">AI可处理</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{task.description}</div>
                        <div className="text-xs text-gray-400">
                          截止时间: {task.deadline}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTaskProcess(task)}
                        className="text-xs h-7 px-3 border-gray-300 hover:bg-gray-50"
                      >
                        <ArrowRight className="h-3 w-3 mr-1" />
                        查看详情
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleQuickProcess(task)}
                        className="text-xs h-7 px-3 bg-blue-500 hover:bg-blue-600 text-white border-0"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        快速处理
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 我的待办 - 统一处理逻辑和样式 */}
            <TabsContent value="todos" className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">我的待办 ({pendingTasks.length})</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onViewAllTasks}
                  className="text-xs h-7 border-gray-300"
                >
                  查看全部
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              {pendingTasks.length > 0 ? (
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200 bg-white"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 text-sm">{task.title}</span>
                            <div className="flex gap-1">
                              {task.priority === 'high' && (
                                <Badge className="bg-red-100 text-red-600 text-xs">紧急</Badge>
                              )}
                              {task.autoProcessable && (
                                <Badge className="bg-purple-100 text-purple-600 text-xs">AI可处理</Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">{task.description}</div>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>负责人: {task.assignee}</span>
                            <span>截止: {task.deadline}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTaskProcess(task)}
                          className="text-xs h-7 px-3 border-gray-300 hover:bg-gray-50"
                        >
                          <ArrowRight className="h-3 w-3 mr-1" />
                          查看详情
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleQuickProcess(task)}
                          className="text-xs h-7 px-3 bg-blue-500 hover:bg-blue-600 text-white border-0"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          快速处理
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-sm font-medium">太棒了！暂无待办任务</div>
                  <div className="text-xs text-gray-400 mt-1">您已完成所有任务</div>
                </div>
              )}
            </TabsContent>

            {/* 我的提醒 - 保持现有样式 */}
            <TabsContent value="reminders" className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  我的提醒 ({reminders.length})
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 border-gray-300"
                >
                  全部已读
                </Button>
              </div>
              
              <div className="space-y-2">
                {reminders.map((reminder) => (
                  <div 
                    key={reminder.id}
                    className={`p-3 border rounded-lg ${getPriorityColor(reminder.priority)} transition-colors`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(reminder.type)}
                        <div>
                          <div className="font-medium text-sm">{reminder.title}</div>
                          <div className="text-xs opacity-80 mt-1">{reminder.message}</div>
                        </div>
                      </div>
                      <div className="text-xs opacity-60">{reminder.time}</div>
                    </div>
                    
                    {reminder.actionable && (
                      <div className="flex gap-2 mt-3">
                        {reminder.type === 'urgent' && reminder.relatedTask && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTaskProcess(reminder.relatedTask)}
                            className="text-xs h-6 px-2"
                          >
                            立即处理
                          </Button>
                        )}
                        {reminder.type === 'ai' && (
                          <Button
                            size="sm"
                            onClick={onAIAssistClick}
                            className="text-xs h-6 px-2"
                          >
                            启动AI助手
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-6 px-2"
                        >
                          忽略
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GridWorkerWorkbench;
