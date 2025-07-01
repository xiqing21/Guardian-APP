
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Database, 
  Users, 
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';
import { Role, RoleContent } from '../types/Role';

interface RoleBasedContentProps {
  role: Role;
  roleContent: RoleContent;
  statistics: any;
  tasks: any;
}

const RoleBasedContent: React.FC<RoleBasedContentProps> = ({
  role,
  roleContent,
  statistics,
  tasks
}) => {
  const renderStatisticsView = () => (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            {role.name} - 统计概览
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{statistics.dataQuality}%</div>
              <div className="text-sm text-gray-600">数据质量</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{statistics.taskCompletion}%</div>
              <div className="text-sm text-gray-600">任务完成率</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{statistics.efficiency}%</div>
              <div className="text-sm text-gray-600">工作效率</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{statistics.activeUnits || 0}</div>
              <div className="text-sm text-gray-600">活跃单位</div>
            </div>
          </div>
          
          {(role.level === 'province' || role.level === 'city' || role.level === 'county') && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">下级单位管理</span>
                <Badge className="bg-blue-500 text-xs">
                  {statistics.totalUnits} 个单位
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">总任务数:</span>
                  <span className="font-medium">{statistics.totalTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">已完成:</span>
                  <span className="font-medium text-green-600">{statistics.completedTasks}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderTaskView = () => (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            {role.name} - 任务管理
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{tasks.pendingTasks}</div>
              <div className="text-xs text-gray-600">待处理</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">{tasks.urgentTasks}</div>
              <div className="text-xs text-gray-600">紧急任务</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{tasks.inProgressTasks}</div>
              <div className="text-xs text-gray-600">进行中</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{tasks.completedToday}</div>
              <div className="text-xs text-gray-600">今日完成</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="text-sm font-medium">手机号异常检测</div>
                  <div className="text-xs text-gray-500">优先级：高</div>
                </div>
              </div>
              <Badge className="bg-orange-500 text-xs">待处理</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">地址信息补全</div>
                  <div className="text-xs text-gray-500">进度：75%</div>
                </div>
              </div>
              <Badge className="bg-blue-500 text-xs">进行中</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-4">
      {roleContent.showStatistics && renderStatisticsView()}
      {roleContent.showTasks && renderTaskView()}
    </div>
  );
};

export default RoleBasedContent;
