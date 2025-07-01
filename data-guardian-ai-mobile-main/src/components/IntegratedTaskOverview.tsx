
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Zap, Users, TrendingUp, Clock, CheckCircle, BarChart3 } from 'lucide-react';

interface IntegratedTaskOverviewProps {
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

const IntegratedTaskOverview: React.FC<IntegratedTaskOverviewProps> = ({ 
  overallProgress,
  completedTasks,
  inProgressTasks,
  pendingTasks,
  onReassignTasks,
  taskStats = { totalTasks: 5, pendingTasks: 1, autoProcessableTasks: 3 }
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiEfficiency, setAiEfficiency] = useState(92);
  const [lastReassignTime, setLastReassignTime] = useState<string | null>(null);
  const [reassignProgress, setReassignProgress] = useState(0);

  const handleReassignment = async () => {
    setIsProcessing(true);
    setReassignProgress(0);
    
    const progressInterval = setInterval(() => {
      setReassignProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setIsProcessing(false);
      setAiEfficiency(Math.min(98, aiEfficiency + Math.random() * 3));
      setLastReassignTime(new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }));
      setReassignProgress(0);
      
      if (onReassignTasks) {
        onReassignTasks();
      }
      
      console.log('AI智能分配完成:', {
        timestamp: new Date().toISOString(),
        efficiency: aiEfficiency,
        tasksReassigned: taskStats.pendingTasks
      });
    }, 2500);
  };

  const todayAssigned = 156 + (lastReassignTime ? taskStats.pendingTasks : 0);

  return (
    <div className="space-y-4">
      {/* 整合后的AI智能分配和任务进度 */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white overflow-hidden">
        <CardContent className="p-5 relative">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative z-10">
            {/* 头部信息 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    AI智能任务中心
                    <Badge variant="secondary" className="text-purple-700 bg-white/90 text-xs">
                      v2.0
                    </Badge>
                  </h3>
                  <p className="text-purple-100 text-sm">智能分配 · 实时监控 · 高效协作</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleReassignment}
                disabled={isProcessing || taskStats.pendingTasks === 0}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    分配中...
                  </div>
                ) : taskStats.pendingTasks === 0 ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    无待分配
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    重新分配({taskStats.pendingTasks})
                  </div>
                )}
              </Button>
            </div>

            {/* 核心指标网格 - 确保与首页数据一致 */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center bg-white/15 rounded-lg p-3">
                <div className="text-xl font-bold text-green-200">{completedTasks}</div>
                <div className="text-xs text-purple-100">已完成</div>
              </div>
              <div className="text-center bg-white/15 rounded-lg p-3">
                <div className="text-xl font-bold text-blue-200">{inProgressTasks}</div>
                <div className="text-xs text-purple-100">进行中</div>
              </div>
              <div className="text-center bg-white/15 rounded-lg p-3">
                <div className="text-xl font-bold text-orange-200">{pendingTasks}</div>
                <div className="text-xs text-purple-100">待处理</div>
              </div>
              <div className="text-center bg-white/15 rounded-lg p-3">
                <div className="text-xl font-bold text-cyan-200">{overallProgress}%</div>
                <div className="text-xs text-purple-100">总进度</div>
              </div>
            </div>

            {/* AI性能指标 */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold">{aiEfficiency.toFixed(1)}%</div>
                <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  AI效率
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">1.2s</div>
                <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  平均用时
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{todayAssigned}</div>
                <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                  <Users className="h-3 w-3" />
                  今日分配
                </div>
              </div>
            </div>

            {/* 进度条显示 */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm mb-2">
                <span>总体完成进度</span>
                <span className="font-semibold">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2 bg-white/20" />
              {lastReassignTime && (
                <div className="text-xs text-purple-200 mt-2 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  上次AI分配: {lastReassignTime}
                </div>
              )}
            </div>

            {/* 分配进度条 */}
            {isProcessing && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI智能分析中...</span>
                  <span>{reassignProgress}%</span>
                </div>
                <Progress value={reassignProgress} className="h-2 bg-white/20" />
                <div className="text-xs text-purple-200">
                  {reassignProgress < 30 && "分析任务类型和优先级..."}
                  {reassignProgress >= 30 && reassignProgress < 60 && "匹配最佳处理人员..."}
                  {reassignProgress >= 60 && reassignProgress < 90 && "优化分配策略..."}
                  {reassignProgress >= 90 && "完成智能分配..."}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedTaskOverview;
