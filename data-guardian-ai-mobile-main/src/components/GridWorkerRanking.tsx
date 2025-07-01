
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Star, Crown, Zap } from 'lucide-react';
import { Role } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';

interface GridWorkerRankingProps {
  currentRole: Role;
}

const GridWorkerRanking: React.FC<GridWorkerRankingProps> = ({ currentRole }) => {
  // 模拟网格员排名数据
  const gridWorkerData = [
    { id: 1, name: '网格员001', completion: 98.5, todayTasks: 12, totalTasks: 45, rank: 1, isCurrentUser: false },
    { id: 2, name: '网格员003', completion: 96.3, todayTasks: 11, totalTasks: 38, rank: 2, isCurrentUser: false },
    { id: 3, name: '网格员005', completion: 94.8, todayTasks: 9, totalTasks: 42, rank: 3, isCurrentUser: true },
    { id: 4, name: '网格员002', completion: 92.1, todayTasks: 8, totalTasks: 35, rank: 4, isCurrentUser: false },
    { id: 5, name: '网格员004', completion: 89.7, todayTasks: 7, totalTasks: 33, rank: 5, isCurrentUser: false }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2: return <Star className="h-4 w-4 text-gray-400" />;
      case 3: return <Zap className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'border-l-blue-500 bg-blue-50';
    switch (rank) {
      case 1: return 'border-l-yellow-500 bg-yellow-50';
      case 2: return 'border-l-gray-400 bg-gray-50';
      case 3: return 'border-l-amber-600 bg-amber-50';
      default: return 'border-l-green-500 bg-white';
    }
  };

  const getPerformanceBadge = (completion: number) => {
    if (completion >= 95) return <Badge className="bg-green-100 text-green-700 text-xs">优秀</Badge>;
    if (completion >= 85) return <Badge className="bg-blue-100 text-blue-700 text-xs">良好</Badge>;
    return <Badge className="bg-orange-100 text-orange-700 text-xs">待提升</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="h-5 w-5" />
          网格员进度排名
          <Badge className="bg-green-100 text-green-700 text-xs">本周排名</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {gridWorkerData.map((worker) => (
            <div 
              key={worker.id}
              className={`p-3 rounded-lg border-l-4 ${getRankColor(worker.rank, worker.isCurrentUser)} transition-all hover:shadow-md ${
                worker.isCurrentUser ? 'ring-2 ring-blue-200' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getRankIcon(worker.rank)}
                  <span className={`font-medium text-sm ${worker.isCurrentUser ? 'text-blue-700' : ''}`}>
                    {worker.name}
                    {worker.isCurrentUser && <span className="text-xs text-blue-500 ml-1">(我)</span>}
                  </span>
                  {getPerformanceBadge(worker.completion)}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    <AnimatedNumber value={worker.completion} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500">
                    今日<AnimatedNumber value={worker.todayTasks} />/<AnimatedNumber value={worker.totalTasks} />
                  </div>
                </div>
              </div>
              <Progress value={worker.completion} className="h-1.5" />
              
              {worker.isCurrentUser && (
                <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>继续努力，冲击前两名！</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GridWorkerRanking;
