
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChartBar, Database, Calendar, User } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const DataAnalytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  // 数据质量趋势数据
  const qualityTrendData = [
    { date: '6-1', completeness: 88, accuracy: 92, consistency: 85, timeliness: 90 },
    { date: '6-8', completeness: 89, accuracy: 93, consistency: 86, timeliness: 91 },
    { date: '6-15', completeness: 90, accuracy: 94, consistency: 87, timeliness: 92 },
    { date: '6-22', completeness: 91, accuracy: 95, consistency: 88, timeliness: 90 },
    { date: '6-29', completeness: 92, accuracy: 95, consistency: 88, timeliness: 90 }
  ];

  // 治理成效数据
  const treatmentEffectData = [
    { name: '手机号', auto: 1247, manual: 156, success: 92 },
    { name: '地址', auto: 2156, manual: 234, success: 89 },
    { name: '合同', auto: 867, manual: 123, success: 95 },
    { name: '证照', auto: 134, manual: 45, success: 88 }
  ];

  // 六维度雷达图数据
  const sixDimensionData = [
    {
      dimension: '完整性',
      current: 92,
      target: 95,
      fullMark: 100
    },
    {
      dimension: '准确性',
      current: 95,
      target: 95,
      fullMark: 100
    },
    {
      dimension: '一致性',
      current: 88,
      target: 94,
      fullMark: 100
    },
    {
      dimension: '时效性',
      current: 90,
      target: 90,
      fullMark: 100
    },
    {
      dimension: '合规性',
      current: 94,
      target: 95,
      fullMark: 100
    },
    {
      dimension: '唯一性',
      current: 96,
      target: 95,
      fullMark: 100
    }
  ];

  // 异常分布饼图数据
  const abnormalDistributionData = [
    { name: '格式错误', value: 35, color: '#ef4444' },
    { name: '逻辑矛盾', value: 25, color: '#f97316' },
    { name: '数据缺失', value: 20, color: '#eab308' },
    { name: '重复数据', value: 15, color: '#22c55e' },
    { name: '其他', value: 5, color: '#6366f1' }
  ];

  // AI处理能力数据
  const aiCapabilityData = [
    { category: '自动识别', rate: 98 },
    { category: '智能分类', rate: 95 },
    { category: '自动修复', rate: 90 },
    { category: '异常预警', rate: 92 },
    { category: '质量评估', rate: 94 }
  ];

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部统计卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8,657</div>
            <div className="text-sm text-blue-100">总数据条数(万)</div>
            <div className="text-xs text-blue-100 mt-1">↗ 较上周增长 2.3%</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">92.1%</div>
            <div className="text-sm text-green-100">综合质量得分</div>
            <div className="text-xs text-green-100 mt-1">↗ 较上周提升 1.8%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="quality">质量</TabsTrigger>
          <TabsTrigger value="treatment">治理</TabsTrigger>
          <TabsTrigger value="ai">AI能力</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* 数据质量六维度雷达图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-blue-500" />
                数据质量六维度分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={sixDimensionData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="当前值"
                    dataKey="current"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="目标值"
                    dataKey="target"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 异常分布 */}
          <Card>
            <CardHeader>
              <CardTitle>异常数据分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={abnormalDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {abnormalDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          {/* 质量趋势图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据质量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={qualityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completeness" stroke="#3b82f6" name="完整性" />
                  <Line type="monotone" dataKey="accuracy" stroke="#22c55e" name="准确性" />
                  <Line type="monotone" dataKey="consistency" stroke="#f97316" name="一致性" />
                  <Line type="monotone" dataKey="timeliness" stroke="#8b5cf6" name="时效性" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 质量详情卡片 */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: '手机号质量', score: 95, total: 125840, error: 1247 },
              { name: '地址质量', score: 88, total: 125840, error: 2156 },
              { name: '合同质量', score: 92, total: 89650, error: 867 },
              { name: '证照质量', score: 94, total: 45230, error: 134 }
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant={item.score >= 95 ? "default" : item.score >= 85 ? "secondary" : "destructive"}>
                      {item.score}%
                    </Badge>
                  </div>
                  <Progress value={item.score} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>总量: {item.total.toLocaleString()}</span>
                    <span className="text-red-500">异常: {item.error}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          {/* 治理成效柱状图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据治理成效</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={treatmentEffectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="auto" fill="#22c55e" name="自动处理" />
                  <Bar dataKey="manual" fill="#f97316" name="人工处理" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 治理进度统计 */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">90%</div>
                <div className="text-sm text-gray-600">自动化治理率</div>
                <div className="text-xs text-green-600 mt-1">超出目标</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">4,267</div>
                <div className="text-sm text-gray-600">今日处理量</div>
                <div className="text-xs text-blue-600 mt-1">较昨日+12%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          {/* AI能力评估 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-500" />
                AI智能体能力评估
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiCapabilityData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-bold text-purple-600">
                      {item.rate}%
                    </span>
                  </div>
                  <Progress value={item.rate} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI处理统计 */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">127,542</div>
                <div className="text-sm text-purple-100">AI累计处理数据量</div>
                <div className="text-xs text-purple-100 mt-1">🤖 智能化程度: 90%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">AI模型性能</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>异常检测准确率</span>
                    <span className="font-bold text-green-600">92.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>自动修复成功率</span>
                    <span className="font-bold text-blue-600">90.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>处理速度</span>
                    <span className="font-bold text-purple-600">1000条/5秒</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataAnalytics;
