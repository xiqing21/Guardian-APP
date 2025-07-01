
import { useState } from 'react';
import { Task, Category } from '../types/Task';

export const useTaskManagement = (employeeTasks?: {
  pendingTasks: number;
  urgentTasks: number;
  inProgressTasks: number;
  completedToday: number;
  totalToday: number;
}) => {
  // Use passed employeeTasks data, fallback to defaults
  const defaultTasks = {
    pendingTasks: 12,
    urgentTasks: 3,
    inProgressTasks: 7,
    completedToday: 8,
    totalToday: 28
  };
  
  const currentTasks = employeeTasks || defaultTasks;
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '手机号异常检测',
      description: '检测并处理1,247个异常手机号',
      category: 'phone',
      priority: 'high',
      status: 'in-progress',
      progress: 75,
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
      title: '合同信息校验',
      description: '校验867个合同信息一致性',
      category: 'contract',
      priority: 'high',
      status: 'pending',
      progress: 0,
      assignee: '网格员005',
      deadline: '2024-01-16',
      autoProcessable: false
    },
    {
      id: 4,
      title: '证照有效期检查',
      description: '检查134个证照有效期状态',
      category: 'certificate',
      priority: 'low',
      status: 'in-progress',
      progress: 60,
      assignee: 'AI智能体',
      deadline: '2024-01-17',
      autoProcessable: true
    },
    {
      id: 5,
      title: '外呼验证任务',
      description: '验证3,421个手机号有效性',
      category: 'call',
      priority: 'medium',
      status: 'in-progress',
      progress: 45,
      assignee: 'AI外呼系统',
      deadline: '2024-01-15',
      autoProcessable: true
    },
    // 新增网格员和供电所的更多任务
    {
      id: 6,
      title: '用电户档案完善',
      description: '完善1,852户用电户基础档案信息',
      category: 'archive',
      priority: 'medium',
      status: 'pending',
      progress: 0,
      assignee: '网格员002',
      deadline: '2024-01-18',
      autoProcessable: false
    },
    {
      id: 7,
      title: '电表读数异常处理',
      description: '处理456个电表读数异常问题',
      category: 'meter',
      priority: 'high',
      status: 'in-progress',
      progress: 30,
      assignee: '供电所001',
      deadline: '2024-01-16',
      autoProcessable: true
    },
    {
      id: 8,
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
      id: 9,
      title: '缴费通知发送',
      description: '向1,672户发送电费缴费通知',
      category: 'payment',
      priority: 'medium',
      status: 'in-progress',
      progress: 80,
      assignee: 'AI外呼系统',
      deadline: '2024-01-15',
      autoProcessable: true
    },
    {
      id: 10,
      title: '台账信息录入',
      description: '录入589条设备台账信息',
      category: 'equipment',
      priority: 'low',
      status: 'pending',
      progress: 0,
      assignee: '供电所002',
      deadline: '2024-01-19',
      autoProcessable: false
    },
    {
      id: 11,
      title: '线路巡检记录',
      description: '完成12.5公里线路巡检并记录',
      category: 'inspection',
      priority: 'medium',
      status: 'in-progress',
      progress: 65,
      assignee: '网格员004',
      deadline: '2024-01-16',
      autoProcessable: false
    },
    {
      id: 12,
      title: '故障报修处理',
      description: '处理78起用户故障报修',
      category: 'repair',
      priority: 'high',
      status: 'pending',
      progress: 0,
      assignee: '供电所003',
      deadline: '2024-01-15',
      autoProcessable: false
    },
    {
      id: 13,
      title: '电力设施保护宣传',
      description: '向156户宣传电力设施保护知识',
      category: 'education',
      priority: 'low',
      status: 'in-progress',
      progress: 40,
      assignee: '网格员005',
      deadline: '2024-01-20',
      autoProcessable: false
    },
    {
      id: 14,
      title: '违约用电排查',
      description: '排查89起疑似违约用电行为',
      category: 'violation',
      priority: 'high',
      status: 'pending',
      progress: 0,
      assignee: '供电所004',
      deadline: '2024-01-17',
      autoProcessable: true
    },
    {
      id: 15,
      title: '新装用电业务',
      description: '办理23户新装用电业务',
      category: 'newservice',
      priority: 'medium',
      status: 'in-progress',
      progress: 55,
      assignee: '网格员006',
      deadline: '2024-01-18',
      autoProcessable: false
    }
  ]);

  const categories: Category[] = [
    { key: 'all', label: '全部', count: tasks.length },
    { key: 'phone', label: '手机号', count: tasks.filter(t => t.category === 'phone').length },
    { key: 'address', label: '地址', count: tasks.filter(t => t.category === 'address').length },
    { key: 'contract', label: '合同', count: tasks.filter(t => t.category === 'contract').length },
    { key: 'certificate', label: '证照', count: tasks.filter(t => t.category === 'certificate').length },
    { key: 'call', label: '外呼', count: tasks.filter(t => t.category === 'call').length },
    { key: 'archive', label: '档案', count: tasks.filter(t => t.category === 'archive').length },
    { key: 'meter', label: '电表', count: tasks.filter(t => t.category === 'meter').length },
    { key: 'safety', label: '安全', count: tasks.filter(t => t.category === 'safety').length },
    { key: 'payment', label: '缴费', count: tasks.filter(t => t.category === 'payment').length },
    { key: 'equipment', label: '设备', count: tasks.filter(t => t.category === 'equipment').length },
    { key: 'inspection', label: '巡检', count: tasks.filter(t => t.category === 'inspection').length },
    { key: 'repair', label: '报修', count: tasks.filter(t => t.category === 'repair').length },
    { key: 'education', label: '宣传', count: tasks.filter(t => t.category === 'education').length },
    { key: 'violation', label: '违约', count: tasks.filter(t => t.category === 'violation').length },
    { key: 'newservice', label: '新装', count: tasks.filter(t => t.category === 'newservice').length }
  ];

  const overallProgress = Math.round(
    tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length
  );

  // 确保任务数据一致性
  const completedTasks = currentTasks.completedToday;
  const inProgressTasks = currentTasks.inProgressTasks;
  const pendingTasks = currentTasks.pendingTasks;
  const totalTasks = completedTasks + inProgressTasks + pendingTasks;
  const autoProcessableTasks = tasks.filter(task => task.autoProcessable && task.status === 'pending').length;

  const taskStats = {
    totalTasks,
    pendingTasks,
    completedTasks,
    inProgressTasks,
    autoProcessableTasks
  };

  const addTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: number, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleAIReassignTasks = () => {
    console.log('开始AI智能重新分配任务');
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.status === 'pending') {
          let newAssignee = task.assignee;
          
          if (task.autoProcessable) {
            newAssignee = task.category === 'call' ? 'AI外呼系统' : 'AI智能体';
          } else {
            const gridWorkers = ['网格员001', '网格员002', '网格员003', '网格员004', '网格员005', '网格员006'];
            const substations = ['供电所001', '供电所002', '供电所003', '供电所004'];
            const allWorkers = [...gridWorkers, ...substations];
            newAssignee = allWorkers[Math.floor(Math.random() * allWorkers.length)];
          }
          
          return {
            ...task,
            assignee: newAssignee,
            status: task.autoProcessable ? 'in-progress' : 'pending',
            progress: task.autoProcessable ? Math.floor(Math.random() * 30) + 10 : 0
          };
        }
        return task;
      })
    );
    
    console.log('AI智能分配完成，已重新分配', pendingTasks, '个任务');
  };

  return {
    tasks,
    categories,
    overallProgress,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    totalTasks,
    taskStats,
    addTask,
    updateTask,
    handleAIReassignTasks
  };
};
