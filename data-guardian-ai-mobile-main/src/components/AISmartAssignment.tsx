
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Zap, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface AISmartAssignmentProps {
  onReassignTasks?: () => void;
  taskStats?: {
    totalTasks: number;
    pendingTasks: number;
    autoProcessableTasks: number;
  };
}

const AISmartAssignment: React.FC<AISmartAssignmentProps> = ({ 
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
    
    // 模拟AI重新分配过程
    const progressInterval = setInterval(() => {
      setReassignProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // 模拟AI分析和分配过程
    setTimeout(() => {
      setIsProcessing(false);
      setAiEfficiency(Math.min(98, aiEfficiency + Math.random() * 3));
      setLastReassignTime(new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }));
      setReassignProgress(0);
      
      // 调用外部回调函数，实际重新分配任务
      if (onReassignTasks) {
        onReassignTasks();
      }
      
      // 显示成功提示
      console.log('AI智能分配完成:', {
        timestamp: new Date().toISOString(),
        efficiency: aiEfficiency,
        tasksReassigned: taskStats.pendingTasks
      });
    }, 2500);
  };

  const todayAssigned = 156 + (lastReassignTime ? taskStats.pendingTasks : 0);

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white overflow-hidden">
      <CardContent className="p-4 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  AI智能任务分配
                  <Badge variant="secondary" className="text-purple-700 bg-white/90">
                    v2.0
                  </Badge>
                </h3>
                <p className="text-purple-100 text-sm">基于工作负载和技能匹配自动分配</p>
                {lastReassignTime && (
                  <p className="text-purple-200 text-xs flex items-center gap-1 mt-1">
                    <CheckCircle className="h-3 w-3" />
                    上次分配: {lastReassignTime}
                  </p>
                )}
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

          {/* AI效率指标 */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">{aiEfficiency.toFixed(1)}%</div>
              <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3" />
                分配效率
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">1.2s</div>
              <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                平均用时
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{todayAssigned}</div>
              <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                <Users className="h-3 w-3" />
                今日分配
              </div>
            </div>
          </div>

          {/* 任务统计 */}
          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>待分配任务</span>
              <span className="font-semibold">{taskStats.pendingTasks}/{taskStats.totalTasks}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span>可自动处理</span>
              <span className="font-semibold">{taskStats.autoProcessableTasks}</span>
            </div>
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
  );
};

export default AISmartAssignment;
