
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check, X, AlertTriangle, Eye } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskConfirmationProps {
  task: Task;
  aiResult: any;
  onConfirm: (approved: boolean, comments?: string) => void;
  onBack: () => void;
}

const TaskConfirmation: React.FC<TaskConfirmationProps> = ({
  task,
  aiResult,
  onConfirm,
  onBack
}) => {
  const [comments, setComments] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleConfirm = (approved: boolean) => {
    onConfirm(approved, comments);
  };

  const getResultSummary = () => {
    switch (task.category) {
      case 'phone':
        return {
          title: '手机号处理结果',
          items: [
            { label: '已验证号码', value: aiResult.verified_count || 0 },
            { label: '无效号码', value: aiResult.invalid_count || 0 },
            { label: '准确率', value: `${aiResult.accuracy || 0}%` }
          ]
        };
      case 'address':
        return {
          title: '地址补全结果',
          items: [
            { label: '补全地址', value: aiResult.completed_count || 0 },
            { label: '完整性提升', value: `${aiResult.completion_rate || 0}%` },
            { label: '处理时间', value: aiResult.processing_time || '未知' }
          ]
        };
      case 'contract':
        return {
          title: '合同校验结果',
          items: [
            { label: '校验通过', value: aiResult.valid_count || 0 },
            { label: '异常合同', value: aiResult.invalid_count || 0 },
            { label: '准确率', value: `${aiResult.accuracy || 0}%` }
          ]
        };
      case 'certificate':
        return {
          title: '证照检查结果',
          items: [
            { label: '有效证照', value: aiResult.valid_count || 0 },
            { label: '过期证照', value: aiResult.expired_count || 0 },
            { label: '处理完成率', value: `${aiResult.completion_rate || 0}%` }
          ]
        };
      case 'call':
        return {
          title: '外呼验证结果',
          items: [
            { label: '成功外呼', value: aiResult.successful_calls || 0 },
            { label: '接通率', value: `${aiResult.success_rate || 0}%` },
            { label: '验证通过', value: aiResult.verified_count || 0 }
          ]
        };
      default:
        return {
          title: 'AI处理结果',
          items: [
            { label: '处理数量', value: aiResult.processed_count || 0 },
            { label: '成功率', value: `${aiResult.success_rate || 0}%` }
          ]
        };
    }
  };

  const resultSummary = getResultSummary();

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部导航 - 简化样式 */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">AI处理结果确认</h1>
      </div>

      {/* 任务信息卡片 - 简化设计 */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">{task.title}</h3>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              AI已处理
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{task.description}</p>
        </CardContent>
      </Card>

      {/* AI处理结果展示 - 优化布局 */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-gray-900">
            {resultSummary.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4">
            {resultSummary.items.map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-600 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          
          {aiResult.anomalies && aiResult.anomalies.length > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">发现异常</span>
              </div>
              <div className="space-y-1">
                {aiResult.anomalies.slice(0, 3).map((anomaly, index) => (
                  <div key={index} className="text-xs text-orange-700">
                    • {anomaly}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 确认操作 - 简化按钮设计 */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                确认意见（可选）
              </label>
              <Textarea
                placeholder="请填写确认意见或备注..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => handleConfirm(true)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0"
              >
                <Check className="h-4 w-4 mr-2" />
                确认通过
              </Button>
              <Button
                onClick={() => handleConfirm(false)}
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                退回重处理
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskConfirmation;
