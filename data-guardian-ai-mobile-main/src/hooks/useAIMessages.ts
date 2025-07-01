
import { useState } from 'react';
import { Role } from '../types/Role';

export interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EmployeeTasks {
  pendingTasks: number;
  urgentTasks: number;
  inProgressTasks: number;
  completedToday: number;
  totalToday: number;
}

export const useAIMessages = (employeeTasks?: EmployeeTasks, currentRole?: Role) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: `您好！我是${currentRole?.name || '数据治理'}AI智能体助手。

🎯 **当前角色**: ${currentRole?.name || '未知角色'}
📊 **权限级别**: ${getRoleLevelText(currentRole?.level || 'province')}

${generateRoleBasedWelcome(currentRole, employeeTasks)}

我可以根据您的角色权限，为您提供专业的数据治理服务。有什么需要协助的吗？`,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // 角色级别文本转换
  function getRoleLevelText(level: string) {
    switch (level) {
      case 'province': return '省级管理';
      case 'city': return '市级管理';
      case 'county': return '县级管理';
      case 'substation': return '供电所作业';
      case 'grid': return '网格执行';
      default: return level;
    }
  }

  // 根据角色生成欢迎信息
  function generateRoleBasedWelcome(role?: Role, tasks?: EmployeeTasks) {
    if (!role) return '';

    if (role.level === 'province' || role.level === 'city' || role.level === 'county') {
      return `📈 **管理概览**
• 数据质量监控与分析
• 下级单位绩效管理
• 智能决策支持
• 异常预警与处理

🔧 **可用功能**
• 数据质量评估报告
• 多维度统计分析
• 智能预测建议
• 管理决策支持`;
    } else {
      return `📋 **任务概览**
• 待处理任务：${tasks?.pendingTasks || 0}个
• 进行中任务：${tasks?.inProgressTasks || 0}个  
• 紧急任务：${tasks?.urgentTasks || 0}个
• 今日已完成：${tasks?.completedToday || 0}个

🤖 **AI服务**
• 智能任务分配
• 自动数据处理
• 异常检测提醒
• 工作效率优化`;
    }
  }

  const generateAIReply = (inputValue: string): string => {
    const roleLevel = currentRole?.level || 'province';
    const roleName = currentRole?.name || '用户';

    // 根据角色类型生成不同的回复
    if (roleLevel === 'province' || roleLevel === 'city' || roleLevel === 'county') {
      return generateManagementReply(inputValue, roleName, roleLevel);
    } else {
      return generateOperationalReply(inputValue, roleName, employeeTasks);
    }
  };

  const generateManagementReply = (input: string, roleName: string, level: string): string => {
    if (input.includes('数据质量') || input.includes('质量')) {
      return `📊 **${roleName}数据质量分析报告**

🎯 **整体评估**: 92分 (${level === 'province' ? '全省' : level === 'city' ? '全市' : '全县'}平均)

📈 **质量维度表现**
• 数据准确性：95% ✅ 优秀水平
• 数据完整性：92% 🟡 良好水平
• 数据一致性：88% 🟠 需要关注
• 数据时效性：90% 🟡 良好水平

🔍 **下级单位排名**
1. 优秀单位：8个 (90分以上)
2. 良好单位：15个 (80-90分)
3. 待改进单位：5个 (80分以下)

💡 **管理建议**
• 重点关注数据一致性问题
• 建议对待改进单位进行专项指导
• 推广优秀单位的最佳实践`;

    } else if (input.includes('统计') || input.includes('分析')) {
      return `📈 **${roleName}综合统计分析**

🏢 **单位管理概览**
• 管辖单位总数：${level === 'province' ? '123' : level === 'city' ? '28' : '8'}个
• 活跃单位数量：${level === 'province' ? '118' : level === 'city' ? '26' : '8'}个
• 单位活跃率：${level === 'province' ? '95.9%' : level === 'city' ? '92.9%' : '100%'}

📊 **绩效指标**
• 总体完成率：${Math.floor(Math.random() * 10) + 85}%
• 效率提升：${Math.floor(Math.random() * 15) + 15}%
• 问题解决率：${Math.floor(Math.random() * 8) + 90}%

🎯 **重点关注**
• 数据治理覆盖率持续提升
• AI智能化程度不断加深
• 异常处理响应时间优化`;

    } else {
      return `🎯 **${roleName}智能决策支持**

基于当前数据分析，为您提供以下管理建议：

📋 **优先处理事项**
1. 数据质量监控与改进
2. 下级单位绩效提升
3. 异常情况预警处理

🔧 **可用管理工具**
• 智能数据分析报告
• 多维度绩效评估
• 预测性决策支持
• 实时监控预警

需要我为您生成详细的分析报告吗？`;
    }
  };

  const generateOperationalReply = (input: string, roleName: string, tasks?: EmployeeTasks): string => {
    if (input.includes('任务') || input.includes('处理')) {
      return `📋 **${roleName}任务处理分析**

🎯 **当前任务状态**
• 待处理：${tasks?.pendingTasks || 0}个 (建议优先处理)
• 进行中：${tasks?.inProgressTasks || 0}个 (正常推进)
• 紧急任务：${tasks?.urgentTasks || 0}个 (⚠️ 立即关注)

🤖 **AI智能服务**
• 可自动处理：数据补全、格式校验
• 智能推荐：任务优先级排序
• 效率提升：预计节省50%处理时间

💡 **处理建议**
1. 优先处理${tasks?.urgentTasks || 0}个紧急任务
2. 启用AI自动化处理常规任务
3. 关注异常数据的人工复核

需要我启动AI智能任务分配吗？`;

    } else if (input.includes('AI') || input.includes('智能')) {
      return `🤖 **${roleName}AI智能体服务**

⚡ **智能化能力**
• 自动数据处理：准确率95%+
• 异常检测识别：覆盖率92%
• 智能任务分配：效率提升30%
• 外呼验证服务：成功率85%

📊 **实时运行状态**
• AI处理中任务：${Math.floor(Math.random() * 10) + 5}个
• 待自动化任务：${Math.floor(Math.random() * 8) + 3}个
• 今日处理完成：${tasks?.completedToday || 0}个

🎯 **专属服务**
• 个人工作效率分析
• 智能任务优化建议
• 数据质量实时提醒

AI正在持续学习您的工作模式，提供更精准的服务！`;

    } else {
      return `💼 **${roleName}工作助手**

基于您的当前工作状态（${tasks?.totalToday || 0}个今日任务），我可以为您提供：

✨ **专业服务**
• 任务智能分配与优化
• 数据处理自动化
• 异常情况实时提醒
• 工作效率分析报告

🎯 **个性化建议**
• 根据历史数据优化工作流程
• 提供最佳任务处理时间建议
• 智能识别重要紧急任务

请告诉我您需要什么具体帮助，我会为您提供专业的数据治理解决方案。`;
    }
  };

  const sendMessage = (inputValue: string) => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantReply = generateAIReply(inputValue);
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: assistantReply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    messages,
    isTyping,
    sendMessage
  };
};
