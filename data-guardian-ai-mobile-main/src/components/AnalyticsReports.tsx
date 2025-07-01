import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  PieChart,
  Activity,
  Zap,
  Grid3X3,
  AlertOctagon
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
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ComposedChart
} from 'recharts';

const AnalyticsReports = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [isGenerating, setIsGenerating] = useState(false);

  // 新增整体统计数据
  const overallStats = {
    totalDataVolume: 8657000,
    abnormalDataVolume: 173140,
    gridLevelDataVolume: 4328500,
    completedDataVolume: 8483860,
    abnormalRate: 2.0,
    gridCoverageRate: 50.0,
    completionRate: 98.0
  };

  // 分析数据
  const analyticsData = {
    qualityTrends: [
      { date: '01-01', completeness: 88, accuracy: 92, consistency: 85, volume: 120000, processed: 115000, errors: 5000 },
      { date: '01-08', completeness: 90, accuracy: 93, consistency: 87, volume: 135000, processed: 130000, errors: 5000 },
      { date: '01-15', completeness: 92, accuracy: 94, consistency: 89, volume: 142000, processed: 138000, errors: 4000 },
      { date: '01-22', completeness: 94, accuracy: 95, consistency: 91, volume: 158000, processed: 155000, errors: 3000 },
      { date: '01-29', completeness: 95, accuracy: 96, consistency: 92, volume: 165000, processed: 163000, errors: 2000 },
      { date: '02-05', completeness: 96, accuracy: 97, consistency: 93, volume: 172000, processed: 170000, errors: 2000 },
      { date: '02-12', completeness: 97, accuracy: 98, consistency: 94, volume: 185000, processed: 183000, errors: 2000 }
    ],
    volumeTrends: [
      { month: '1月', total: 850000, processed: 820000, pending: 30000, failed: 5000 },
      { month: '2月', total: 920000, processed: 895000, pending: 25000, failed: 4000 },
      { month: '3月', total: 1050000, processed: 1020000, pending: 30000, failed: 3500 },
      { month: '4月', total: 1180000, processed: 1155000, pending: 25000, failed: 3000 },
      { month: '5月', total: 1250000, processed: 1230000, pending: 20000, failed: 2500 },
      { month: '6月', total: 1320000, processed: 1300000, pending: 20000, failed: 2000 }
    ],
    categoryAnalysis: [
      { category: '手机号', processed: 12470, success: 11223, rate: 90.0, efficiency: 95 },
      { category: '地址', processed: 8950, success: 8507, rate: 95.1, efficiency: 98 },
      { category: '合同', processed: 3420, success: 2993, rate: 87.5, efficiency: 89 },
      { category: '证照', processed: 1680, success: 1428, rate: 85.0, efficiency: 92 },
    ],
    dataDistribution: [
      { name: '正常数据', value: 78, color: '#22c55e' },
      { name: '待处理', value: 12, color: '#f59e0b' },
      { name: '异常数据', value: 8, color: '#ef4444' },
      { name: '已修复', value: 2, color: '#8b5cf6' }
    ],
    performanceMetrics: [
      { time: '00:00', cpu: 45, memory: 60, network: 30, throughput: 1200 },
      { time: '04:00', cpu: 35, memory: 55, network: 25, throughput: 800 },
      { time: '08:00', cpu: 75, memory: 80, network: 60, throughput: 2500 },
      { time: '12:00', cpu: 85, memory: 85, network: 70, throughput: 3200 },
      { time: '16:00', cpu: 90, memory: 90, network: 80, throughput: 3800 },
      { time: '20:00', cpu: 60, memory: 70, network: 45, throughput: 1800 },
    ],
    correlationData: [
      { accuracy: 95, efficiency: 98, volume: 150 },
      { accuracy: 92, efficiency: 94, volume: 140 },
      { accuracy: 89, efficiency: 90, volume: 130 },
      { accuracy: 96, efficiency: 99, volume: 160 },
      { accuracy: 88, efficiency: 87, volume: 125 },
      { accuracy: 94, efficiency: 96, volume: 145 },
    ],
    // 6维度质量分析数据
    qualityDimensions: [
      { dimension: '完整性', current: 96.5, target: 98, benchmark: 92 },
      { dimension: '准确性', current: 94.2, target: 96, benchmark: 88 },
      { dimension: '一致性', current: 91.8, target: 95, benchmark: 85 },
      { dimension: '时效性', current: 93.6, target: 97, benchmark: 89 },
      { dimension: '有效性', current: 89.4, target: 93, benchmark: 82 },
      { dimension: '唯一性', current: 97.8, target: 99, benchmark: 94 }
    ],
    qualityTrendsByDimension: [
      { date: '2024-01', completeness: 88, accuracy: 89, consistency: 85, timeliness: 87, validity: 83, uniqueness: 94 },
      { date: '2024-02', completeness: 90, accuracy: 91, consistency: 87, timeliness: 89, validity: 85, uniqueness: 95 },
      { date: '2024-03', completeness: 92, accuracy: 92, consistency: 89, timeliness: 91, validity: 87, uniqueness: 96 },
      { date: '2024-04', completeness: 94, accuracy: 93, consistency: 90, timeliness: 92, validity: 88, uniqueness: 97 },
      { date: '2024-05', completeness: 95, accuracy: 94, consistency: 91, timeliness: 93, validity: 89, uniqueness: 97.5 },
      { date: '2024-06', completeness: 96.5, accuracy: 94.2, consistency: 91.8, timeliness: 93.6, validity: 89.4, uniqueness: 97.8 }
    ]
  };

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
    ]
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleExportReport = () => {
    console.log('导出报告...');
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部信息与导出功能 */}
      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">数据分析与报告</h1>
              <p className="text-blue-100">
                统一的数据治理分析与报告生成平台
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="text-3xl font-bold">{reportData.summary.qualityScore.toFixed(2)}%</div>
                <div className="text-sm text-blue-100">综合治理得分</div>
              </div>
              {/* 导出功能 */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      生成中...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      生成报告
                    </div>
                  )}
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleExportReport}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  导出PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 新增整体统计数据展示 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            整体数据统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {(overallStats.totalDataVolume / 10000).toFixed(0)}万
              </div>
              <div className="text-sm text-gray-600">数据总量</div>
              <div className="text-xs text-blue-600 mt-1">100.00%</div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertOctagon className="h-6 w-6 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">
                {(overallStats.abnormalDataVolume / 10000).toFixed(1)}万
              </div>
              <div className="text-sm text-gray-600">异常数据量</div>
              <div className="text-xs text-red-600 mt-1">{overallStats.abnormalRate.toFixed(2)}%</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Grid3X3 className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {(overallStats.gridLevelDataVolume / 10000).toFixed(1)}万
              </div>
              <div className="text-sm text-gray-600">网格粒度数据</div>
              <div className="text-xs text-purple-600 mt-1">{overallStats.gridCoverageRate.toFixed(2)}%</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {(overallStats.completedDataVolume / 10000).toFixed(1)}万
              </div>
              <div className="text-sm text-gray-600">完成数据量</div>
              <div className="text-xs text-green-600 mt-1">{overallStats.completionRate.toFixed(2)}%</div>
            </div>
          </div>

          {/* 数据处理进度条 */}
          <div className="mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>数据完成率</span>
                <span>{overallStats.completionRate.toFixed(2)}%</span>
              </div>
              <Progress value={overallStats.completionRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>网格覆盖率</span>
                <span>{overallStats.gridCoverageRate.toFixed(2)}%</span>
              </div>
              <Progress value={overallStats.gridCoverageRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>异常数据占比</span>
                <span>{overallStats.abnormalRate.toFixed(2)}%</span>
              </div>
              <Progress value={overallStats.abnormalRate} className="h-2 bg-red-100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="report" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="report">完整报告</TabsTrigger>
          <TabsTrigger value="trends">数据趋势</TabsTrigger>
          <TabsTrigger value="analytics">实时分析</TabsTrigger>
          <TabsTrigger value="quality">质量分析</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-4">
          {/* 完整数据治理报告 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                数据治理分析报告
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 执行摘要 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold mb-2">执行摘要</h3>
                <p className="text-gray-700 leading-relaxed">
                  本报告基于2024年6月数据治理工作的全面分析，涵盖数据质量、处理效率、系统性能等多个维度。
                  通过AI智能分析，当前数据治理综合得分达到{reportData.summary.qualityScore.toFixed(2)}%，较上月提升2.30个百分点，整体治理水平持续向好。
                  异常数据量控制在{overallStats.abnormalRate.toFixed(2)}%，网格粒度覆盖率达到{overallStats.gridCoverageRate.toFixed(2)}%，数据完成率达到{overallStats.completionRate.toFixed(2)}%。
                </p>
              </div>

              {/* 关键发现 */}
              <div>
                <h3 className="text-lg font-bold mb-3">关键发现</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">数据质量显著提升</div>
                      <div className="text-sm text-green-700">6个质量维度均有改善，完整性达到96.50%，准确性达到94.20%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">处理效率持续优化</div>
                      <div className="text-sm text-blue-700">AI自动化处理率达到90.20%，平均处理时间缩短至1.2秒</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-purple-800">系统性能稳定</div>
                      <div className="text-sm text-purple-700">系统可用性达到99.90%，日处理量突破240万条</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 数据治理成效 */}
              <div>
                <h3 className="text-lg font-bold mb-3">数据治理成效</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">132万</div>
                    <div className="text-sm text-gray-600">本月处理数据量</div>
                    <div className="text-xs text-blue-600 mt-1">↗ 环比增长 15.20%</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4,267</div>
                    <div className="text-sm text-gray-600">问题修复数量</div>
                    <div className="text-xs text-green-600 mt-1">↗ 自动修复率 90.00%</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{reportData.summary.efficiency.toFixed(2)}%</div>
                    <div className="text-sm text-gray-600">综合处理效率</div>
                    <div className="text-xs text-purple-600 mt-1">↗ 达到目标水平</div>
                  </div>
                </div>
              </div>

              {/* 问题与建议 */}
              <div>
                <h3 className="text-lg font-bold mb-3">问题识别与改进建议</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">有效性维度待提升</div>
                      <div className="text-sm text-yellow-700">当前89.40%，建议加强业务规则验证和实时监控</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-orange-800">峰值时段性能优化</div>
                      <div className="text-sm text-orange-700">建议在12-16点高峰期增加资源配置，提升处理能力</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 下月工作计划 */}
              <div>
                <h3 className="text-lg font-bold mb-3">下月工作计划</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>完善数据有效性检验规则，目标提升至93.00%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>优化AI模型算法，提升自动修复准确率至95.00%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>建立实时监控预警机制，降低系统响应时间</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>扩大治理覆盖范围，新增3个业务系统接入</span>
                  </div>
                </div>
              </div>

              {/* 报告生成信息 */}
              <div className="border-t pt-4 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>报告生成时间：2024年6月30日 14:30</span>
                  <span>数据截止时间：2024年6月29日 23:59</span>
                </div>
                <div className="mt-1">
                  <span>报告版本：v2.4.1 | 数据来源：数据治理平台 | 分析引擎：AI智能分析</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* 数据量变化趋势 - 多维度堆叠柱状图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                数据量变化趋势分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={analyticsData.volumeTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="processed" stackId="a" fill="#22c55e" name="已处理" />
                  <Bar yAxisId="left" dataKey="pending" stackId="a" fill="#f59e0b" name="待处理" />
                  <Bar yAxisId="left" dataKey="failed" stackId="a" fill="#ef4444" name="失败" />
                  <Line yAxisId="right" type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="总量" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 数据质量趋势 - 改进的面积图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据质量变化趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.qualityTrends}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7c7c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff7c7c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="volume" stackId="1" stroke="#8884d8" fillOpacity={1} fill="url(#colorVolume)" name="数据总量" />
                  <Area type="monotone" dataKey="processed" stackId="2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProcessed)" name="处理成功" />
                  <Area type="monotone" dataKey="errors" stackId="3" stroke="#ff7c7c" fillOpacity={1} fill="url(#colorErrors)" name="错误数据" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 新增图表：数据处理效率雷达图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据处理效率雷达图</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={[
                  { subject: '处理速度', A: 88, B: 95, fullMark: 100 },
                  { subject: '准确率', A: 92, B: 98, fullMark: 100 },
                  { subject: '完整性', A: 89, B: 94, fullMark: 100 },
                  { subject: '一致性', A: 85, B: 90, fullMark: 100 },
                  { subject: '及时性', A: 90, B: 96, fullMark: 100 },
                  { subject: '可用性', A: 87, B: 93, fullMark: 100 }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="当前表现" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="目标水平" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 新增图表：处理时间分布直方图 */}
          <Card>
            <CardHeader>
              <CardTitle>处理时间分布分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { timeRange: '0-1s', count: 4500, percentage: 45 },
                  { timeRange: '1-2s', count: 3200, percentage: 32 },
                  { timeRange: '2-5s', count: 1500, percentage: 15 },
                  { timeRange: '5-10s', count: 600, percentage: 6 },
                  { timeRange: '>10s', count: 200, percentage: 2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeRange" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="处理数量" />
                  <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#ef4444" strokeWidth={2} name="占比%" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* 关键指标概览 */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {(reportData.summary.totalDataVolume / 10000).toFixed(0)}万
                </div>
                <div className="text-sm text-gray-600 mt-1">数据总量</div>
                <div className="text-xs text-blue-600 mt-1">↗ 今日新增 2.30%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {reportData.summary.governanceRate.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">治理覆盖率</div>
                <div className="text-xs text-green-600 mt-1">↗ 实时提升中</div>
              </CardContent>
            </Card>
          </div>

          {/* 数据分布分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-500" />
                数据质量分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={analyticsData.dataDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.dataDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 分类处理成效 - 组合图表 */}
          <Card>
            <CardHeader>
              <CardTitle>分类处理统计</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={analyticsData.categoryAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="success" fill="#22c55e" name="成功处理" />
                  <Bar yAxisId="left" dataKey="processed" fill="#94a3b8" name="总数" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#8b5cf6" name="效率%" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          {/* 6维度质量分析雷达图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                6维度数据质量分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={analyticsData.qualityDimensions}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="当前水平" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="目标水平" dataKey="target" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  <Radar name="行业基准" dataKey="benchmark" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 6维度质量趋势线图 */}
          <Card>
            <CardHeader>
              <CardTitle>质量维度趋势分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={analyticsData.qualityTrendsByDimension}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completeness" stroke="#3b82f6" name="完整性" strokeWidth={2} />
                  <Line type="monotone" dataKey="accuracy" stroke="#22c55e" name="准确性" strokeWidth={2} />
                  <Line type="monotone" dataKey="consistency" stroke="#8b5cf6" name="一致性" strokeWidth={2} />
                  <Line type="monotone" dataKey="timeliness" stroke="#f59e0b" name="时效性" strokeWidth={2} />
                  <Line type="monotone" dataKey="validity" stroke="#ef4444" name="有效性" strokeWidth={2} />
                  <Line type="monotone" dataKey="uniqueness" stroke="#06b6d4" name="唯一性" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 质量维度对比柱状图 */}
          <Card>
            <CardHeader>
              <CardTitle>质量维度对比分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.qualityDimensions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dimension" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#3b82f6" name="当前水平" />
                  <Bar dataKey="target" fill="#22c55e" name="目标水平" />
                  <Bar dataKey="benchmark" fill="#f59e0b" name="行业基准" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* 系统性能监控 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                系统性能监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={analyticsData.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="cpu" fill="#ef4444" fillOpacity={0.6} name="CPU使用率%" />
                  <Area yAxisId="left" type="monotone" dataKey="memory" fill="#3b82f6" fillOpacity={0.6} name="内存使用率%" />
                  <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#22c55e" strokeWidth={3} name="吞吐量" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 实时状态指标 */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">1.20ms</div>
                <div className="text-sm text-gray-600">平均响应时间</div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Database className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">99.90%</div>
                <div className="text-sm text-gray-600">系统可用性</div>
                <Progress value={99.9} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">2,450</div>
                <div className="text-sm text-gray-600">今日处理量</div>
                <Progress value={78} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReports;
