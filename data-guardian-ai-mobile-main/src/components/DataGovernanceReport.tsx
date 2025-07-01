
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Clock
} from 'lucide-react';
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
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const DataGovernanceReport = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [isGenerating, setIsGenerating] = useState(false);

  // 报告数据
  const reportData = {
    summary: {
      totalDataVolume: 8657000,
      qualityScore: 92.1,
      governanceRate: 90.2,
      issuesResolved: 4267,
      efficiency: 95.8
    },
    trends: [
      { month: '1月', quality: 88, governance: 85, efficiency: 90 },
      { month: '2月', quality: 89, governance: 87, efficiency: 92 },
      { month: '3月', quality: 90, governance: 88, efficiency: 93 },
      { month: '4月', quality: 91, governance: 89, efficiency: 94 },
      { month: '5月', quality: 92, governance: 90, efficiency: 95 },
      { month: '6月', quality: 92.1, governance: 90.2, efficiency: 95.8 }
    ],
    issueDistribution: [
      { name: '格式错误', value: 35, color: '#ef4444' },
      { name: '逻辑矛盾', value: 25, color: '#f97316' },
      { name: '数据缺失', value: 20, color: '#eab308' },
      { name: '重复数据', value: 15, color: '#22c55e' },
      { name: '其他', value: 5, color: '#6366f1' }
    ],
    aiPerformance: [
      { category: '手机号', auto: 1247, manual: 156, rate: 88.9 },
      { category: '地址', auto: 2156, manual: 234, rate: 90.2 },
      { category: '合同', auto: 867, manual: 123, rate: 87.6 },
      { category: '证照', auto: 134, manual: 45, rate: 74.9 }
    ]
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // 模拟报告生成过程
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部信息 */}
      <Card className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">数据治理工作报告</h1>
              <p className="text-indigo-100">
                基于AI智能分析的数据治理成效评估报告
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{reportData.summary.qualityScore}%</div>
              <div className="text-sm text-indigo-100">综合治理得分</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 报告生成控制 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            报告生成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium">报告周期</label>
                <select 
                  value={reportPeriod}
                  onChange={(e) => setReportPeriod(e.target.value)}
                  className="ml-2 border rounded px-3 py-1 text-sm"
                >
                  <option value="weekly">周报</option>
                  <option value="monthly">月报</option>
                  <option value="quarterly">季报</option>
                  <option value="yearly">年报</option>
                </select>
              </div>
              <Badge variant="outline" className="text-green-600">
                <Calendar className="h-3 w-3 mr-1" />
                2024年6月
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    生成中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    生成报告
                  </div>
                )}
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                <Download className="h-4 w-4 mr-1" />
                导出PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">执行摘要</TabsTrigger>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
          <TabsTrigger value="performance">AI成效</TabsTrigger>
          <TabsTrigger value="issues">问题分析</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          {/* 关键指标 */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {(reportData.summary.totalDataVolume / 10000).toFixed(0)}万
                </div>
                <div className="text-sm text-gray-600 mt-1">数据总量</div>
                <div className="text-xs text-blue-600 mt-1">↗ 较上月增长 2.3%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {reportData.summary.governanceRate}%
                </div>
                <div className="text-sm text-gray-600 mt-1">治理覆盖率</div>
                <div className="text-xs text-green-600 mt-1">↗ 较上月提升 1.8%</div>
              </CardContent>
            </Card>
          </div>

          {/* 治理成效概览 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                治理成效概览
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">数据质量提升</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92.1} className="w-32" />
                    <span className="text-sm font-bold text-green-600">92.1%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">问题解决效率</span>
                  <div className="flex items-center gap-2">
                    <Progress value={95.8} className="w-32" />
                    <span className="text-sm font-bold text-blue-600">95.8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">自动化程度</span>
                  <div className="flex items-center gap-2">
                    <Progress value={90.2} className="w-32" />
                    <span className="text-sm font-bold text-purple-600">90.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 本月亮点 */}
          <Card>
            <CardHeader>
              <CardTitle>本月治理亮点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">AI自动修复率突破90%</div>
                    <div className="text-sm text-gray-600">较上月提升5.2个百分点</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">数据完整性达到历史新高</div>
                    <div className="text-sm text-gray-600">完整性指标提升至96.5%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">平均处理时间缩短至1.2秒</div>
                    <div className="text-sm text-gray-600">处理效率提升23%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>治理效果趋势分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quality" stroke="#3b82f6" name="数据质量" strokeWidth={2} />
                  <Line type="monotone" dataKey="governance" stroke="#22c55e" name="治理覆盖" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" name="处理效率" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI治理成效分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.aiPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="auto" fill="#22c55e" name="自动处理" />
                  <Bar dataKey="manual" fill="#f97316" name="人工处理" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>问题类型分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={reportData.issueDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {reportData.issueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataGovernanceReport;
