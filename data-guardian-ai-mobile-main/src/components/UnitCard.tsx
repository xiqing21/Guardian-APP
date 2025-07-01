
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  Users,
  Activity,
  User,
  AlertTriangle
} from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

interface Unit {
  id: number;
  name: string;
  type: string;
  governanceProgress: number;
  dataQuality: number;
  taskCompletion: number;
  totalTasks: number;
  completedTasks: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  region: string;
  employees: number;
  totalDataVolume: number;
  processedDataVolume: number;
  responsiblePerson: string;
  urgentTasks: number;
  overdueRate: number;
}

interface UnitCardProps {
  unit: Unit;
  index: number;
  onClick: (unit: Unit) => void;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, index, onClick }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(unit)}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
              <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{unit.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{unit.region}</span>
                <Badge variant="outline" className="text-xs px-1">
                  {unit.type}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <User className="h-3 w-3" />
                <span>责任主体: {unit.responsiblePerson}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-blue-600">
                <AnimatedNumber value={unit.governanceProgress} suffix="%" />
              </span>
              {getTrendIcon(unit.trend)}
            </div>
            <div className={`text-xs ${getTrendColor(unit.trend)}`}>
              {unit.trend === 'up' ? '+' : unit.trend === 'down' ? '' : '±'}
              <AnimatedNumber value={Math.abs(unit.trendValue)} suffix="%" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-gray-900">
              <AnimatedNumber value={unit.dataQuality} suffix="%" />
            </div>
            <div className="text-xs text-gray-600">数据质量</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-900">
              <AnimatedNumber value={unit.taskCompletion} suffix="%" />
            </div>
            <div className="text-xs text-gray-600">任务完成率</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
              <Users className="h-3 w-3" />
              <AnimatedNumber value={unit.employees} />
            </div>
            <div className="text-xs text-gray-600">员工数</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-purple-600">
              <AnimatedNumber value={unit.totalDataVolume} />GB
            </div>
            <div className="text-xs text-gray-600">数据量</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">治理进度</span>
            <span className="font-medium">
              <AnimatedNumber value={unit.governanceProgress} suffix="%" />
            </span>
          </div>
          <Progress value={unit.governanceProgress} className="h-1.5" />
        </div>

        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <span>任务进度: {unit.completedTasks}/{unit.totalTasks}</span>
          <div className="flex items-center gap-2">
            {unit.urgentTasks > 0 && (
              <div className="flex items-center gap-1 text-red-600">
                <AlertTriangle className="h-3 w-3" />
                <span>紧急: {unit.urgentTasks}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>活跃度: 高</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitCard;
