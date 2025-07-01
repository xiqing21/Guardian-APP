
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Award, 
  Target,
  Zap,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const ReportEffectiveness = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // 治理成效数据
  const effectivenessData = {
    overall: {
      score: 94.2,
      improvement: 8.5,
      efficiency: 92.8,
      satisfaction: 96.1
    },
    kpis: [
      {
        name: '数据质量提升',
        current: 92.1,
        target: 95,
        improvement: 5.8,
        status: 'good'
      },
      {
        name: '处理效率',
        current: 95.8,
        target: 90,
        improvement: 12.3,
        status: 'excellent'
      },
      {
        name: '成本节约',
        current: 87.5,
        target: 85,
        improvement: 15.2,
        status: 'excellent'
      },
      {
        name: '用户满意度',
        current: 96.1,
        target: 90,
        improvement: 8.9,
        status: 'excellent'
      }
    ],
    monthlyTrends: [
      { month: '1月', quality: 86.2, efficiency: 83.5, cost: 72.1, satisfaction: 87.3 },
      { month: '2月', quality: 87.8, efficiency: 85.2, cost: 75.8, satisfaction: 89.1 },
      { month: '3月', quality: 89.1, efficiency: 87.9, cost: 78.9, satisfaction: 91.2 },
      { month: '4月', quality: 90.3, efficiency: 90.1, cost: 82.3, satisfaction: 93.5 },
      { month: '5月', quality: 91.7, efficiency: 93.2, cost: 85.1, satisfaction: 94.8 },
      { month: '6月', quality: 92.1, efficiency: 95.8, cost: 87.5, satisfaction: 96.1 }
    ],
    capabilities: [
      {
        dimension: '智能识别',
        current: 96,
        baseline: 78,
        fullMark: 100
      },
      {
        dimension: '自动修复',
        current: 94,
        baseline: 72,
        fullMark: 100
      },
      {
        dimension: '异常预警',
        current: 92,
        baseline: 68,
        fullMark: 100
      },
      {
        dimension: '质量评估',
        current: 95,
        baseline: 75,
        fullMark: 100
      },
      {
        dimension: '流程优化',
        current: 89,
        baseline: 65,
        fullMark: 100
      },
      {
        dimension: '合规检查',
        current: 97,
        baseline: 80,
        fullMark: 100
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'good':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部成效概览 */}
      <Card className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">数据治理成效分析</h1>
              <p className="text-emerald-100 mb-4">
                全面评估AI智能治理效果与业务价值
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{effectivenessData.overall.score}%</div>
                  <div className="text-sm text-emerald-100">综合成效得分</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">+{effectivenessData.overall.improvement}%</div>
                  <div className="text-sm text-emerald-100">较去年提升</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <div className="mt-2 text-sm text-emerald-100">持续提升中</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 关键指标KPI */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            关键绩效指标 (KPI)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {effectivenessData.kpis.map((kpi, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(kpi.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(kpi.status)}
                    <span className="font-medium">{kpi.name}</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    +{kpi.improvement}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{kpi.current}%</span>
                  <span className="text-sm text-gray-600">目标: {kpi.target}%</span>
                </div>
                <Progress value={kpi.current} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 治理能力雷达图 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            AI治理能力全景图
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={effectivenessData.capabilities}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" className="text-sm" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar
                name="当前能力"
                dataKey="current"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="基线水平"
                dataKey="baseline"
                stroke="#e5e7eb"
                fill="#e5e7eb"
                fillOpacity={0.1}
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 月度趋势分析 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            月度成效趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={effectivenessData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="quality"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="数据质量"
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stackId="1"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.6}
                name="处理效率"
              />
              <Area
                type="monotone"
                dataKey="cost"
                stackId="1"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.6}
                name="成本节约"
              />
              <Area
                type="monotone"
                dataKey="satisfaction"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
                name="满意度"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 成效亮点 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            治理成效亮点
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="p-2 bg-green-500 rounded-full">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-green-800">处理效率大幅提升</div>
                <div className="text-sm text-green-600">AI自动化处理效率达95.8%，超出目标5.8个百分点</div>
              </div>
              <Badge className="bg-green-500 text-white">优秀</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <div className="p-2 bg-blue-500 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-800">数据质量稳步改善</div>
                <div className="text-sm text-blue-600">数据完整性、准确性等核心指标持续优化</div>
              </div>
              <Badge className="bg-blue-500 text-white">良好</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
              <div className="p-2 bg-purple-500 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-purple-800">响应速度显著加快</div>
                <div className="text-sm text-purple-600">平均问题处理时间从5分钟缩短至1.2秒</div>
              </div>
              <Badge className="bg-purple-500 text-white">卓越</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportEffectiveness;
