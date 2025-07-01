import React from 'react';
import { Role } from '../types/Role';
import GridWorkerWorkbench from './GridWorkerWorkbench';
import GridWorkerRanking from './GridWorkerRanking';
import PowerSupplyRanking from './PowerSupplyRanking';
import TaskOverview from './TaskOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedNumber from './AnimatedNumber';
import { 
  Building2, 
  Users, 
  BarChart3, 
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Database,
  Activity,
  Trophy,
  Medal,
  Award
} from 'lucide-react';

interface LevelHomepageProps {
  currentRole: Role;
  statistics: any;
  tasks: any;
  onTaskDetailClick: (type: 'completed' | 'pending') => void;
  onUnitsDetailClick: () => void;
}

const LevelHomepage: React.FC<LevelHomepageProps> = ({
  currentRole,
  statistics,
  tasks,
  onTaskDetailClick,
  onUnitsDetailClick
}) => {
  // 网格员专用工作台
  if (currentRole.level === 'grid') {
    return (
      <div className="space-y-3">
        <GridWorkerWorkbench
          tasks={[
            // 使用来自 useTaskManagement 的任务数据
            {
              id: 1,
              title: '手机号异常检测',
              description: '检测并处理1,247个异常手机号',
              category: 'phone',
              priority: 'high',
              status: 'pending',
              progress: 0,
              assignee: '网格员001',
              deadline: '2024-01-15',
              autoProcessable: true
            },
            {
              id: 2,
              title: '地址信息补全',
              description: '补全2,156条不完整地址信息',
              category: 'address',
              priority: 'medium',
              status: 'completed',
              progress: 100,
              assignee: 'AI智能体',
              deadline: '2024-01-14',
              autoProcessable: true
            },
            {
              id: 3,
              title: '用电户档案完善',
              description: '完善1,852户用电户基础档案信息',
              category: 'archive',
              priority: 'medium',
              status: 'in-progress',
              progress: 45,
              assignee: '网格员002',
              deadline: '2024-01-18',
              autoProcessable: false
            },
            {
              id: 4,
              title: '用电安全检查',
              description: '对234户进行用电安全隐患排查',
              category: 'safety',
              priority: 'high',
              status: 'pending',
              progress: 0,
              assignee: '网格员003',
              deadline: '2024-01-17',
              autoProcessable: false
            },
            {
              id: 5,
              title: '缴费通知发送',
              description: '向1,672户发送电费缴费通知',
              category: 'payment',
              priority: 'medium',
              status: 'in-progress',
              progress: 80,
              assignee: 'AI外呼系统',
              deadline: '2024-01-15',
              autoProcessable: true
            }
          ]}
          onTaskClick={(task) => {
            // 根据任务状态跳转到相应页面
            if (task.status === 'completed') {
              onTaskDetailClick('completed');
            } else {
              onTaskDetailClick('pending');
            }
          }}
          onAIAssistClick={() => {
            // 通过父组件触发AI助手界面
            const event = new CustomEvent('openAIAssistant');
            window.dispatchEvent(event);
          }}
          onViewAllTasks={() => {
            // 通过父组件触发任务管理界面
            const event = new CustomEvent('openTaskManagement');
            window.dispatchEvent(event);
          }}
          employeeTasks={tasks}
        />
        
        {/* 网格员排名 */}
        <GridWorkerRanking currentRole={currentRole} />
      </div>
    );
  }

  // 供电所专用界面
  if (currentRole.level === 'substation') {
    return (
      <div className="space-y-3">
        {/* 供电所概览卡片 */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600 mb-1">管辖网格员</div>
                  <div className="text-2xl font-bold text-blue-700">
                    <AnimatedNumber value={statistics.totalGridWorkers} />
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-600 mb-1">任务完成率</div>
                  <div className="text-2xl font-bold text-green-700">
                    <AnimatedNumber value={statistics.completionRate} suffix="%" />
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 供电所排名 */}
        <PowerSupplyRanking currentRole={currentRole} />
      </div>
    );
  }

  // 获取进度排名数据
  const getProgressRankingData = () => {
    if (currentRole.level === 'province') {
      return [
        { id: 1, name: '太原市', completion: 96.8, tasks: 28475, totalUnits: 156, rank: 1, trend: '+2.3%' },
        { id: 2, name: '大同市', completion: 94.2, tasks: 21563, totalUnits: 134, rank: 2, trend: '+1.8%' },
        { id: 3, name: '临汾市', completion: 92.5, tasks: 19432, totalUnits: 128, rank: 3, trend: '+1.2%' },
        { id: 4, name: '运城市', completion: 91.8, tasks: 18765, totalUnits: 142, rank: 4, trend: '+0.9%' },
        { id: 5, name: '长治市', completion: 90.3, tasks: 16547, totalUnits: 118, rank: 5, trend: '+0.6%' },
        { id: 6, name: '晋中市', completion: 89.7, tasks: 15324, totalUnits: 105, rank: 6, trend: '+0.4%' },
        { id: 7, name: '晋城市', completion: 88.9, tasks: 14256, totalUnits: 98, rank: 7, trend: '+0.2%' },
        { id: 8, name: '阳泉市', completion: 87.6, tasks: 13187, totalUnits: 89, rank: 8, trend: '-0.1%' }
      ];
    } else if (currentRole.level === 'city') {
      return [
        { id: 1, name: '小店区', completion: 97.5, tasks: 4563, totalUnits: 24, rank: 1, trend: '+3.2%' },
        { id: 2, name: '迎泽区', completion: 95.8, tasks: 3876, totalUnits: 18, rank: 2, trend: '+2.8%' },
        { id: 3, name: '杏花岭区', completion: 94.2, tasks: 3564, totalUnits: 16, rank: 3, trend: '+2.1%' },
        { id: 4, name: '万柏林区', completion: 92.6, tasks: 2987, totalUnits: 15, rank: 4, trend: '+1.7%' },
        { id: 5, name: '尖草坪区', completion: 91.4, tasks: 2675, totalUnits: 12, rank: 5, trend: '+1.3%' },
        { id: 6, name: '晋源区', completion: 90.1, tasks: 2234, totalUnits: 11, rank: 6, trend: '+0.9%' }
      ];
    } else {
      return [
        { id: 1, name: '东山供电所', completion: 98.2, tasks: 892, totalUnits: 8, rank: 1, trend: '+4.1%' },
        { id: 2, name: '西山供电所', completion: 96.7, tasks: 765, totalUnits: 7, rank: 2, trend: '+3.6%' },
        { id: 3, name: '南山供电所', completion: 95.3, tasks: 684, totalUnits: 6, rank: 3, trend: '+2.9%' },
        { id: 4, name: '北山供电所', completion: 93.8, tasks: 542, totalUnits: 5, rank: 4, trend: '+2.2%' },
        { id: 5, name: '中心供电所', completion: 92.5, tasks: 476, totalUnits: 4, rank: 5, trend: '+1.8%' }
      ];
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-base font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-l-yellow-500 bg-yellow-50';
      case 2: return 'border-l-gray-400 bg-gray-50';
      case 3: return 'border-l-amber-600 bg-amber-50';
      default: return 'border-l-blue-500 bg-white';
    }
  };

  const getTitle = () => {
    if (currentRole.level === 'province') return '地市进度排名';
    if (currentRole.level === 'city') return '区县进度排名';
    return '供电所进度排名';
  };

  const getUnit = () => {
    if (currentRole.level === 'province') return '个地市';
    if (currentRole.level === 'city') return '个区县';
    return '个供电所';
  };

  const progressRankingData = getProgressRankingData();

  // 管理层级界面（省市县）- 按照省市县展示进度排名
  return (
    <div className="space-y-3">
      {/* 管理层概览 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 mb-1">管辖单位</div>
                <div className="text-2xl font-bold text-blue-700">
                  <AnimatedNumber value={statistics.totalUnits} />
                </div>
                <div className="text-xs text-blue-500">{getUnit()}</div>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-600 mb-1">平均完成率</div>
                <div className="text-2xl font-bold text-green-700">
                  <AnimatedNumber value={Math.round(progressRankingData.reduce((sum, item) => sum + item.completion, 0) / progressRankingData.length)} suffix="%" />
                </div>
                <div className="text-xs text-green-500">整体表现良好</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 进度排名展示 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-5 w-5" />
            {getTitle()}
            <Badge className="bg-blue-100 text-blue-700 text-xs">实时更新</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressRankingData.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-lg border-l-4 ${getRankColor(item.rank)} transition-all hover:shadow-md cursor-pointer`}
                onClick={onUnitsDetailClick}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getRankIcon(item.rank)}
                    <div>
                      <span className="font-medium text-base">{item.name}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        <AnimatedNumber value={item.totalUnits} />个下级单位 • <AnimatedNumber value={item.tasks} />个任务
                      </div>
                    </div>
                    {item.rank <= 3 && (
                      <Badge className="bg-green-100 text-green-700 text-xs">优秀</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      <AnimatedNumber value={item.completion} suffix="%" />
                    </div>
                    <div className={`text-xs ${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {item.trend}
                    </div>
                  </div>
                </div>
                <Progress value={item.completion} className="h-2" />
                
                {/* 详细指标 */}
                <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">
                      <AnimatedNumber value={Math.round(item.tasks * item.completion / 100)} />
                    </div>
                    <div className="text-xs text-gray-500">已完成</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-orange-600">
                      <AnimatedNumber value={item.tasks - Math.round(item.tasks * item.completion / 100)} />
                    </div>
                    <div className="text-xs text-gray-500">待处理</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-600">
                      <AnimatedNumber value={Math.round(item.tasks * 0.3)} />
                    </div>
                    <div className="text-xs text-gray-500">AI处理</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 整体趋势统计 */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-green-600">
              <AnimatedNumber value={progressRankingData.filter(item => item.completion >= 95).length} />
            </div>
            <div className="text-xs text-gray-500">优秀单位</div>
            <div className="text-xs text-green-600 mt-1">
              占比 {Math.round(progressRankingData.filter(item => item.completion >= 95).length / progressRankingData.length * 100)}%
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-blue-600">
              <AnimatedNumber value={progressRankingData.reduce((sum, item) => sum + item.tasks, 0)} />
            </div>
            <div className="text-xs text-gray-500">总任务数</div>
            <div className="text-xs text-blue-600 mt-1">
              今日新增 <AnimatedNumber value={Math.round(progressRankingData.reduce((sum, item) => sum + item.tasks, 0) * 0.05)} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-purple-600">
              <AnimatedNumber value={progressRankingData.filter(item => item.trend.startsWith('+')).length} />
            </div>
            <div className="text-xs text-gray-500">上升趋势</div>
            <div className="text-xs text-purple-600 mt-1">
              整体向好
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LevelHomepage;
