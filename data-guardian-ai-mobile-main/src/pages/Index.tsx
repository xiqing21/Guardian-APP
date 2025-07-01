import React, { useState, useEffect } from 'react';
import AIAssistantWithProps from '@/components/AIAssistantWithProps';
import EnhancedAnalyticsReports from '@/components/EnhancedAnalyticsReports';
import TaskManagement from '@/components/TaskManagement';
import LevelHomepage from '@/components/LevelHomepage';
import TaskDetailModal from '@/components/TaskDetailModal';
import UnitsDetail from '@/components/UnitsDetail';
import FloatingAvatar from '@/components/FloatingAvatar';
import { useRoleManagement } from '@/hooks/useRoleManagement';
import AppHeader from '@/components/AppHeader';
import DataQualityRadar from '@/components/DataQualityRadar';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [taskDetailType, setTaskDetailType] = useState<'completed' | 'pending' | null>(null);
  const [showUnitsDetail, setShowUnitsDetail] = useState(false);
  
  const {
    currentRole,
    availableRoles,
    switchRole,
    getCurrentRoleContent,
    hasPermission,
    getRoleStatistics,
    getRoleTasks
  } = useRoleManagement();

  const roleContent = getCurrentRoleContent();
  const roleStatistics = getRoleStatistics();
  const roleTasks = getRoleTasks();
  
  const [dataQuality, setDataQuality] = useState({
    completeness: 92.35,
    accuracy: 95.42,
    consistency: 88.67,
    timeliness: 90.28,
    compliance: 94.15,
    uniqueness: 96.73
  });

  const [dimensionDetails, setDimensionDetails] = useState({
    completeness: { issues: 128, trend: '+2.15%', level: '良好' },
    accuracy: { issues: 45, trend: '+1.83%', level: '优秀' },
    consistency: { issues: 287, trend: '-0.52%', level: '待改进' },
    timeliness: { issues: 156, trend: '+3.24%', level: '良好' },
    compliance: { issues: 67, trend: '+1.56%', level: '优秀' },
    uniqueness: { issues: 23, trend: '+0.84%', level: '优秀' }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDataQuality(prev => ({
        ...prev,
        completeness: Math.min(95, prev.completeness + Math.random() * 0.5),
        accuracy: Math.min(98, prev.accuracy + Math.random() * 0.3)
      }));
    }, 5000);

    // 添加自定义事件监听
    const handleOpenAIAssistant = () => {
      setActiveTab('ai-assistant');
    };

    const handleOpenTaskManagement = () => {
      setActiveTab('tasks');
    };

    window.addEventListener('openAIAssistant', handleOpenAIAssistant);
    window.addEventListener('openTaskManagement', handleOpenTaskManagement);

    return () => {
      clearInterval(interval);
      window.removeEventListener('openAIAssistant', handleOpenAIAssistant);
      window.removeEventListener('openTaskManagement', handleOpenTaskManagement);
    };
  }, []);

  const handleTaskDetailClick = (type: 'completed' | 'pending') => {
    setTaskDetailType(type);
  };

  const handleUnitsDetailClick = () => {
    setShowUnitsDetail(true);
  };

  const handleBackFromUnitsDetail = () => {
    setShowUnitsDetail(false);
  };

  // 处理悬浮AI图标点击
  const handleAvatarClick = () => {
    setActiveTab('ai-assistant');
  };

  // 处理从任务管理切换到AI助手
  const handleSwitchToAI = () => {
    setActiveTab('ai-assistant');
  };

  const renderDashboard = () => (
    <div className="space-y-3 p-3 pb-20">
      {/* 层级化首页展示 */}
      <LevelHomepage
        currentRole={currentRole}
        statistics={roleStatistics}
        tasks={roleTasks}
        onTaskDetailClick={handleTaskDetailClick}
        onUnitsDetailClick={handleUnitsDetailClick}
      />

      {/* 数据质量雷达图 */}
      <DataQualityRadar
        currentRole={currentRole}
        roleContent={roleContent}
        dataQuality={dataQuality}
        dimensionDetails={dimensionDetails}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        currentRole={currentRole} 
        availableRoles={availableRoles}
        onRoleChange={switchRole}
      />

      <div className="flex-1">
        {showUnitsDetail ? (
          <UnitsDetail 
            currentRole={currentRole}
            onBack={handleBackFromUnitsDetail}
          />
        ) : taskDetailType ? (
          <TaskDetailModal 
            type={taskDetailType}
            onBack={() => setTaskDetailType(null)}
          />
        ) : activeTab === 'dashboard' ? (
          renderDashboard()
        ) : activeTab === 'ai-assistant' ? (
          <AIAssistantWithProps 
            employeeTasks={roleTasks} 
            currentRole={currentRole}
          />
        ) : activeTab === 'analytics' && roleContent.showAnalytics ? (
          <EnhancedAnalyticsReports />
        ) : activeTab === 'tasks' && roleContent.showTasks ? (
          <TaskManagement 
            employeeTasks={roleTasks} 
            onSwitchToAI={handleSwitchToAI}
          />
        ) : null}
      </div>

      {/* 悬浮AI智能体图标 */}
      {!showUnitsDetail && !taskDetailType && (
        <FloatingAvatar onAvatarClick={handleAvatarClick} />
      )}

      {!showUnitsDetail && !taskDetailType && (
        <BottomNavigation
          activeTab={activeTab}
          roleContent={roleContent}
          onTabChange={setActiveTab}
        />
      )}
    </div>
  );
};

export default Index;
