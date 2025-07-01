import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Clock,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { Role } from '../types/Role';
import TaskStatistics from './TaskStatistics';
import TaskList from './TaskList';
import UnitBasicInfo from './UnitBasicInfo';
import UnitCard from './UnitCard';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  assignee: string;
  deadline: string;
  autoProcessable: boolean;
}

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
  tasks?: Task[];
}

interface UnitsDetailProps {
  currentRole: Role;
  onBack: () => void;
}

const UnitsDetail: React.FC<UnitsDetailProps> = ({ currentRole, onBack }) => {
  const [sortBy, setSortBy] = useState<'governance' | 'quality' | 'completion'>('governance');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // 生成任务数据
  const generateTasksForUnit = (unitId: number): Task[] => {
    const taskTemplates = [
      {
        title: '手机号异常检测',
        description: '检测并处理异常手机号码',
        category: 'phone',
        autoProcessable: true
      },
      {
        title: '地址信息补全',
        description: '补全不完整的地址信息',
        category: 'address',
        autoProcessable: true
      },
      {
        title: '用电户档案完善',
        description: '完善用电户基础档案信息',
        category: 'archive',
        autoProcessable: false
      },
      {
        title: '用电安全检查',
        description: '进行用电安全隐患排查',
        category: 'safety',
        autoProcessable: false
      },
      {
        title: '缴费通知发送',
        description: '发送电费缴费通知',
        category: 'payment',
        autoProcessable: true
      },
      {
        title: '数据质量核查',
        description: '核查数据质量问题',
        category: 'data',
        autoProcessable: true
      },
      {
        title: '设备维护记录',
        description: '更新设备维护记录',
        category: 'maintenance',
        autoProcessable: false
      }
    ];

    const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    const statuses: ('pending' | 'in-progress' | 'completed')[] = ['pending', 'in-progress', 'completed'];
    const assignees = ['网格员001', '网格员002', '网格员003', 'AI智能体', 'AI外呼系统'];

    return taskTemplates.map((template, index) => ({
      id: unitId * 100 + index + 1,
      title: template.title,
      description: template.description,
      category: template.category,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      progress: Math.floor(Math.random() * 100),
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      deadline: `2024-01-${15 + Math.floor(Math.random() * 15)}`,
      autoProcessable: template.autoProcessable
    }));
  };

  // 模拟数据 - 根据角色层级生成不同的管辖单位
  const generateUnits = (): Unit[] => {
    if (currentRole.level === 'province') {
      return [
        {
          id: 1,
          name: '太原供电公司',
          type: '地市公司',
          governanceProgress: 94.2,
          dataQuality: 96.1,
          taskCompletion: 92.5,
          totalTasks: 1245,
          completedTasks: 1152,
          trend: 'up',
          trendValue: 2.3,
          region: '太原市',
          employees: 2850,
          totalDataVolume: 15680,
          processedDataVolume: 14579,
          responsiblePerson: '张明华',
          urgentTasks: 12,
          overdueRate: 3.2,
          tasks: generateTasksForUnit(1)
        },
        {
          id: 2,
          name: '大同供电公司',
          type: '地市公司',
          governanceProgress: 91.8,
          dataQuality: 93.4,
          taskCompletion: 89.2,
          totalTasks: 1156,
          completedTasks: 1031,
          trend: 'up',
          trendValue: 1.8,
          region: '大同市',
          employees: 2340,
          totalDataVolume: 12340,
          processedDataVolume: 11015,
          responsiblePerson: '李建国',
          urgentTasks: 18,
          overdueRate: 5.1,
          tasks: generateTasksForUnit(2)
        },
        {
          id: 3,
          name: '运城供电公司',
          type: '地市公司',
          governanceProgress: 88.5,
          dataQuality: 90.2,
          taskCompletion: 86.7,
          totalTasks: 1089,
          completedTasks: 944,
          trend: 'stable',
          trendValue: 0.2,
          region: '运城市',
          employees: 2180,
          totalDataVolume: 10890,
          processedDataVolume: 9442,
          responsiblePerson: '王德华',
          urgentTasks: 25,
          overdueRate: 7.3,
          tasks: generateTasksForUnit(3)
        },
        {
          id: 4,
          name: '晋中供电公司',
          type: '地市公司',
          governanceProgress: 87.2,
          dataQuality: 89.1,
          taskCompletion: 85.3,
          totalTasks: 987,
          completedTasks: 842,
          trend: 'down',
          trendValue: -0.8,
          region: '晋中市',
          employees: 1950,
          totalDataVolume: 9870,
          processedDataVolume: 8420,
          responsiblePerson: '赵志强',
          urgentTasks: 31,
          overdueRate: 8.9,
          tasks: generateTasksForUnit(4)
        },
        {
          id: 5,
          name: '临汾供电公司',
          type: '地市公司',
          governanceProgress: 85.9,
          dataQuality: 87.8,
          taskCompletion: 83.1,
          totalTasks: 912,
          completedTasks: 758,
          trend: 'up',
          trendValue: 1.2,
          region: '临汾市',
          employees: 1820,
          totalDataVolume: 9120,
          processedDataVolume: 7580,
          responsiblePerson: '陈建军',
          urgentTasks: 28,
          overdueRate: 9.8,
          tasks: generateTasksForUnit(5)
        }
      ];
    } else if (currentRole.level === 'city') {
      return [
        {
          id: 1,
          name: '迎泽区供电所',
          type: '区县供电所',
          governanceProgress: 93.1,
          dataQuality: 94.2,
          taskCompletion: 91.8,
          totalTasks: 156,
          completedTasks: 143,
          trend: 'up',
          trendValue: 3.2,
          region: '迎泽区',
          employees: 45,
          totalDataVolume: 1560,
          processedDataVolume: 1433,
          responsiblePerson: '刘敏',
          urgentTasks: 3,
          overdueRate: 2.1,
          tasks: generateTasksForUnit(1)
        },
        {
          id: 2,
          name: '小店区供电所',
          type: '区县供电所',
          governanceProgress: 89.7,
          dataQuality: 91.5,
          taskCompletion: 88.2,
          totalTasks: 134,
          completedTasks: 118,
          trend: 'up',
          trendValue: 1.9,
          region: '小店区',
          employees: 38,
          totalDataVolume: 1340,
          processedDataVolume: 1182,
          responsiblePerson: '孙伟',
          urgentTasks: 5,
          overdueRate: 4.2,
          tasks: generateTasksForUnit(2)
        },
        {
          id: 3,
          name: '杏花岭区供电所',
          type: '区县供电所',
          governanceProgress: 86.3,
          dataQuality: 88.1,
          taskCompletion: 84.6,
          totalTasks: 128,
          completedTasks: 108,
          trend: 'stable',
          trendValue: 0.1,
          region: '杏花岭区',
          employees: 42,
          totalDataVolume: 1280,
          processedDataVolume: 1083,
          responsiblePerson: '马晓东',
          urgentTasks: 7,
          overdueRate: 6.3,
          tasks: generateTasksForUnit(3)
        }
      ];
    } else {
      return [
        {
          id: 1,
          name: '网格A区域',
          type: '网格区域',
          governanceProgress: 91.2,
          dataQuality: 92.8,
          taskCompletion: 89.5,
          totalTasks: 28,
          completedTasks: 25,
          trend: 'up',
          trendValue: 2.1,
          region: '城南片区',
          employees: 8,
          totalDataVolume: 280,
          processedDataVolume: 251,
          responsiblePerson: '周磊',
          urgentTasks: 1,
          overdueRate: 3.6,
          tasks: generateTasksForUnit(1)
        },
        {
          id: 2,
          name: '网格B区域',
          type: '网格区域',
          governanceProgress: 87.6,
          dataQuality: 89.3,
          taskCompletion: 85.2,
          totalTasks: 31,
          completedTasks: 26,
          trend: 'stable',
          trendValue: -0.3,
          region: '城北片区',
          employees: 6,
          totalDataVolume: 310,
          processedDataVolume: 264,
          responsiblePerson: '钱文静',
          urgentTasks: 2,
          overdueRate: 6.5,
          tasks: generateTasksForUnit(2)
        }
      ];
    }
  };

  const units = generateUnits();

  const sortedUnits = [...units].sort((a, b) => {
    switch (sortBy) {
      case 'governance':
        return b.governanceProgress - a.governanceProgress;
      case 'quality':
        return b.dataQuality - a.dataQuality;
      case 'completion':
        return b.taskCompletion - a.taskCompletion;
      default:
        return b.governanceProgress - a.governanceProgress;
    }
  });

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleBackToList = () => {
    setSelectedUnit(null);
  };

  const handleTaskClick = (task: Task) => {
    console.log('跳转到任务处理:', task.id, task.title);
    window.dispatchEvent(new CustomEvent('openTaskManagement'));
  };

  if (selectedUnit) {
    const tasks = selectedUnit.tasks || [];
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');

    return (
      <div className="min-h-screen bg-gray-50 p-3 pb-20">
        {/* Header - 移动端优化 */}
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="p-1.5 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{selectedUnit.name}</h1>
            <p className="text-xs text-gray-600">任务详情管理</p>
          </div>
        </div>

        {/* 统计概览 */}
        <TaskStatistics tasks={tasks} />

        {/* 任务分类标签页 */}
        <Card>
          <CardContent className="p-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="overview" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  待办事项 ({pendingTasks.length})
                </TabsTrigger>
                <TabsTrigger value="progress" className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  进行中 ({inProgressTasks.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  已完成 ({completedTasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-3 mt-0">
                <TaskList tasks={tasks} status="pending" onTaskClick={handleTaskClick} />
              </TabsContent>

              <TabsContent value="progress" className="space-y-3 mt-0">
                <TaskList tasks={tasks} status="in-progress" onTaskClick={handleTaskClick} />
              </TabsContent>

              <TabsContent value="completed" className="space-y-3 mt-0">
                <TaskList tasks={tasks} status="completed" onTaskClick={handleTaskClick} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 基本信息卡片 */}
        <UnitBasicInfo unit={selectedUnit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header - 移动端优化 */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1.5 h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">管辖单位详情</h1>
          <p className="text-xs text-gray-600">{currentRole.name} - 按治理进度排名</p>
        </div>
      </div>

      {/* 排序选择 - 移动端优化 */}
      <div className="flex gap-1.5 mb-3">
        <Button
          variant={sortBy === 'governance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('governance')}
          className="text-xs px-3 py-1.5 h-auto"
        >
          治理进度
        </Button>
        <Button
          variant={sortBy === 'quality' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('quality')}
          className="text-xs px-3 py-1.5 h-auto"
        >
          数据质量
        </Button>
        <Button
          variant={sortBy === 'completion' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('completion')}
          className="text-xs px-3 py-1.5 h-auto"
        >
          任务完成率
        </Button>
      </div>

      {/* 单位列表 - 移动端优化 */}
      <div className="space-y-2">
        {sortedUnits.map((unit, index) => (
          <UnitCard 
            key={unit.id}
            unit={unit}
            index={index}
            onClick={handleUnitClick}
          />
        ))}
      </div>
    </div>
  );
};

export default UnitsDetail;
