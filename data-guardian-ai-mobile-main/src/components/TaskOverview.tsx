
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Clock, AlertTriangle, Bot, Zap, Brain, Target } from 'lucide-react';

interface TaskOverviewProps {
  overallProgress: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  onReassignTasks?: () => void;
  taskStats?: {
    totalTasks: number;
    pendingTasks: number;
    autoProcessableTasks: number;
  };
}

const TaskOverview: React.FC<TaskOverviewProps> = ({
  overallProgress,
  completedTasks,
  inProgressTasks,
  pendingTasks,
  onReassignTasks,
  taskStats
}) => {
  const totalTasks = completedTasks + inProgressTasks + pendingTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* 任务总体进度 */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              任务总体进度
            </div>
            <Badge variant="outline" className="text-blue-600">
              {completionRate}% 完成率
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 整体进度条 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">整体完成度</span>
                <span className="text-lg font-bold text-blue-600">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            {/* 任务统计卡片 */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-sm text-gray-600 mt-1">已完成</div>
                <div className="text-xs text-green-600 mt-1">
                  ✓ {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
                <div className="text-sm text-gray-600 mt-1">进行中</div>
                <div className="text-xs text-blue-600 mt-1">
                  → {totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0}%
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-2">
                  <AlertTriangle className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-600">{pendingTasks}</div>
                <div className="text-sm text-gray-600 mt-1">待处理</div>
                <div className="text-xs text-gray-600 mt-1">
                  ⏳ {totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}%
                </div>
              </div>
            </div>

            {/* 进度提示 */}
            {overallProgress >= 90 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">进度良好！即将完成所有任务</span>
                </div>
              </div>
            )}
            
            {overallProgress < 50 && pendingTasks > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-700">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">建议优先处理待办任务以提升整体进度</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI智能任务分配 - 整合在一起 */}
      {taskStats && onReassignTasks && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-5 w-5 text-purple-600" />
              AI智能任务分配
              <Badge className="bg-purple-500 text-xs">智能优化</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* AI分配统计 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{taskStats.totalTasks}</div>
                  <div className="text-sm text-gray-600">总任务数</div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{taskStats.pendingTasks}</div>
                  <div className="text-sm text-gray-600">待分配</div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{taskStats.autoProcessableTasks}</div>
                  <div className="text-sm text-gray-600">可自动化</div>
                </div>
              </div>

              {/* AI分配建议 */}
              {taskStats.pendingTasks > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-blue-800 mb-1">AI智能分配建议</div>
                      <div className="text-sm text-blue-600 space-y-1">
                        <div>• 发现 {taskStats.autoProcessableTasks} 个任务可自动处理</div>
                        <div>• 预计可节省 {Math.round(taskStats.autoProcessableTasks * 0.8)} 小时人工时间</div>
                        <div>• 智能分配后效率预计提升 25%</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={onReassignTasks}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    启动AI智能分配
                  </Button>
                </div>
              )}

              {/* 无待处理任务时的状态 */}
              {taskStats.pendingTasks === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                    <Target className="h-5 w-5" />
                    <span className="font-medium">所有任务已合理分配</span>
                  </div>
                  <div className="text-sm text-green-600">
                    当前无待分配任务，AI智能体正在高效处理中
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskOverview;
