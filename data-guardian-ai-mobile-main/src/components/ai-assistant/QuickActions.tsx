
import React from 'react';
import { Button } from '@/components/ui/button';
import { Role } from '../../types/Role';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
  currentRole?: Role;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, currentRole }) => {
  // 根据角色生成不同的快捷操作
  const getQuickActions = () => {
    if (!currentRole) {
      return [
        { label: '查看任务状态', message: '当前任务状态如何？' },
        { label: '数据质量分析', message: '帮我分析数据质量' },
        { label: 'AI智能分配', message: '启动AI智能任务分配' },
        { label: '异常检测', message: '检查是否有数据异常' }
      ];
    }

    // 管理层角色（省市县）
    if (currentRole.level === 'province' || currentRole.level === 'city' || currentRole.level === 'county') {
      return [
        { label: '数据质量报告', message: '生成数据质量分析报告' },
        { label: '单位绩效统计', message: '查看下级单位绩效统计' },
        { label: '智能决策建议', message: '提供管理决策建议' },
        { label: '异常预警分析', message: '检查异常情况和预警信息' }
      ];
    } 
    // 操作层角色（供电所、网格）
    else {
      return [
        { label: '我的任务列表', message: '查看我的任务处理状态' },
        { label: 'AI智能处理', message: '启动AI智能任务处理' },
        { label: '效率优化建议', message: '分析我的工作效率并给出建议' },
        { label: '数据异常检测', message: '检测当前数据是否有异常' }
      ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onActionClick(action.message)}
          className="text-xs h-8"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
