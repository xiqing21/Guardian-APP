
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Role } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';

interface PowerSupplyRankingProps {
  currentRole: Role;
}

const PowerSupplyRanking: React.FC<PowerSupplyRankingProps> = ({ currentRole }) => {
  // 模拟排名数据
  const getRankingData = () => {
    if (currentRole.level === 'province') {
      return [
        { id: 1, name: '太原市供电公司', completion: 96.8, tasks: 2847, rank: 1 },
        { id: 2, name: '大同市供电公司', completion: 94.2, tasks: 2156, rank: 2 },
        { id: 3, name: '临汾市供电公司', completion: 92.5, tasks: 1943, rank: 3 },
        { id: 4, name: '运城市供电公司', completion: 91.8, tasks: 1876, rank: 4 },
        { id: 5, name: '长治市供电公司', completion: 90.3, tasks: 1654, rank: 5 }
      ];
    } else if (currentRole.level === 'city') {
      return [
        { id: 1, name: '小店区供电公司', completion: 97.5, tasks: 456, rank: 1 },
        { id: 2, name: '迎泽区供电公司', completion: 95.8, tasks: 387, rank: 2 },
        { id: 3, name: '杏花岭区供电公司', completion: 94.2, tasks: 356, rank: 3 },
        { id: 4, name: '万柏林区供电公司', completion: 92.6, tasks: 298, rank: 4 },
        { id: 5, name: '尖草坪区供电公司', completion: 91.4, tasks: 267, rank: 5 }
      ];
    } else {
      return [
        { id: 1, name: '东山供电所', completion: 98.2, tasks: 89, rank: 1 },
        { id: 2, name: '西山供电所', completion: 96.7, tasks: 76, rank: 2 },
        { id: 3, name: '南山供电所', completion: 95.3, tasks: 68, rank: 3 },
        { id: 4, name: '北山供电所', completion: 93.8, tasks: 54, rank: 4 },
        { id: 5, name: '中心供电所', completion: 92.5, tasks: 47, rank: 5 }
      ];
    }
  };

  const rankingData = getRankingData();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2: return <Medal className="h-4 w-4 text-gray-400" />;
      case 3: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
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
    if (currentRole.level === 'province') return '地市公司排名';
    if (currentRole.level === 'city') return '区县公司排名';
    return '供电所排名';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5" />
          {getTitle()}
          <Badge className="bg-blue-100 text-blue-700 text-xs">实时更新</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rankingData.map((item) => (
            <div 
              key={item.id}
              className={`p-3 rounded-lg border-l-4 ${getRankColor(item.rank)} transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getRankIcon(item.rank)}
                  <span className="font-medium text-sm">{item.name}</span>
                  {item.rank <= 3 && (
                    <Badge className="bg-green-100 text-green-700 text-xs">优秀</Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    <AnimatedNumber value={item.completion} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <AnimatedNumber value={item.tasks} />个任务
                  </div>
                </div>
              </div>
              <Progress value={item.completion} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerSupplyRanking;
