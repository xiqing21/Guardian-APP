
import { useState, useEffect } from 'react';
import { Role, RoleContent, roleConfigs } from '../types/Role';

export const useRoleManagement = () => {
  const [currentRole, setCurrentRole] = useState<Role>({
    id: 'sx-province',
    name: '山西省电力公司',
    level: 'province',
    permissions: ['view-statistics', 'view-analytics', 'manage-units'],
    unitName: '山西省电力公司'
  });

  const [availableRoles] = useState<Role[]>([
    {
      id: 'sx-province',
      name: '山西省电力公司',
      level: 'province',
      permissions: ['view-statistics', 'view-analytics', 'manage-units'],
      unitName: '山西省电力公司'
    },
    {
      id: 'ty-city',
      name: '太原市供电公司',
      level: 'city',
      permissions: ['view-statistics', 'view-analytics'],
      unitName: '太原市供电公司',
      parentUnit: '山西省电力公司'
    },
    {
      id: 'dt-city',
      name: '大同市供电公司',
      level: 'city',
      permissions: ['view-statistics', 'view-analytics'],
      unitName: '大同市供电公司',
      parentUnit: '山西省电力公司'
    },
    {
      id: 'yc-county',
      name: '迎泽区供电公司',
      level: 'county',
      permissions: ['view-statistics'],
      unitName: '迎泽区供电公司',
      parentUnit: '太原市供电公司'
    },
    {
      id: 'jc-county',
      name: '晋源区供电公司',
      level: 'county',
      permissions: ['view-statistics'],
      unitName: '晋源区供电公司',
      parentUnit: '太原市供电公司'
    },
    {
      id: 'ty-substation',
      name: '桃园供电所',
      level: 'substation',
      permissions: ['manage-tasks', 'complete-tasks'],
      unitName: '桃园供电所',
      parentUnit: '迎泽区供电公司'
    },
    {
      id: 'cf-substation',
      name: '长风供电所',
      level: 'substation',
      permissions: ['manage-tasks', 'complete-tasks'],
      unitName: '长风供电所',
      parentUnit: '晋源区供电公司'
    },
    {
      id: 'grid-001',
      name: '网格员001',
      level: 'grid',
      permissions: ['complete-tasks'],
      unitName: '网格001',
      parentUnit: '桃园供电所'
    },
    {
      id: 'grid-002',
      name: '网格员002',
      level: 'grid',
      permissions: ['complete-tasks'],
      unitName: '网格002',
      parentUnit: '长风供电所'
    }
  ]);

  const switchRole = (roleId: string) => {
    const role = availableRoles.find(r => r.id === roleId);
    if (role) {
      setCurrentRole(role);
      console.log('角色切换至:', role.name);
    }
  };

  const getCurrentRoleContent = (): RoleContent => {
    return roleConfigs[currentRole.level];
  };

  const hasPermission = (permission: string): boolean => {
    return currentRole.permissions.includes(permission);
  };

  // 根据角色级别获取统计数据
  const getRoleStatistics = () => {
    const baseStats = {
      dataQuality: Math.floor(Math.random() * 10) + 90,
      taskCompletion: Math.floor(Math.random() * 15) + 85,
      efficiency: Math.floor(Math.random() * 20) + 80
    };

    switch (currentRole.level) {
      case 'province':
        return {
          ...baseStats,
          totalUnits: 123,
          activeUnits: 118,
          totalTasks: 15680,
          completedTasks: 14420
        };
      case 'city':
        return {
          ...baseStats,
          totalUnits: 28,
          activeUnits: 26,
          totalTasks: 3240,
          completedTasks: 2980
        };
      case 'county':
        return {
          ...baseStats,
          totalUnits: 8,
          activeUnits: 8,
          totalTasks: 680,
          completedTasks: 620
        };
      default:
        return baseStats;
    }
  };

  // 根据角色获取任务数据
  const getRoleTasks = () => {
    if (currentRole.level === 'substation') {
      return {
        pendingTasks: Math.floor(Math.random() * 10) + 8,
        urgentTasks: Math.floor(Math.random() * 5) + 2,
        inProgressTasks: Math.floor(Math.random() * 8) + 5,
        completedToday: Math.floor(Math.random() * 15) + 10,
        totalToday: Math.floor(Math.random() * 20) + 25
      };
    } else if (currentRole.level === 'grid') {
      return {
        pendingTasks: Math.floor(Math.random() * 5) + 3,
        urgentTasks: Math.floor(Math.random() * 3) + 1,
        inProgressTasks: Math.floor(Math.random() * 4) + 2,
        completedToday: Math.floor(Math.random() * 8) + 5,
        totalToday: Math.floor(Math.random() * 12) + 10
      };
    }
    return {
      pendingTasks: 0,
      urgentTasks: 0,
      inProgressTasks: 0,
      completedToday: 0,
      totalToday: 0
    };
  };

  return {
    currentRole,
    availableRoles,
    switchRole,
    getCurrentRoleContent,
    hasPermission,
    getRoleStatistics,
    getRoleTasks
  };
};
