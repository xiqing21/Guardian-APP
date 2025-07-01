
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Building2,
  Filter,
  FileText,
  PieChart,
  LineChart,
  Database,
  Target,
  AlertTriangle,
  ChevronDown,
  Search,
  Users,
  Activity,
  MapPin,
  Zap,
  Clock,
  Layers
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
  LineChart as RechartsLineChart,
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
  ComposedChart
} from 'recharts';
import AnimatedNumber from './AnimatedNumber';

const EnhancedAnalyticsReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [selectedDimension, setSelectedDimension] = useState('region');
  const [showFilters, setShowFilters] = useState(false);

  // 时间范围选项
  const timeRanges = [
    { key: 'week', label: '近一周', desc: '最近7天数据' },
    { key: 'month', label: '近一月', desc: '最近30天数据' },
    { key: 'quarter', label: '近一季', desc: '最近90天数据' },
    { key: 'year', label: '近一年', desc: '最近365天数据' }
  ];

  // 单位选项
  const unitOptions = [
    { key: 'all', label: '全部单位', count: 156 },
    { key: 'province', label: '省级单位', count: 1 },
    { key: 'city', label: '市级单位', count: 11 },
    { key: 'county', label: '县级单位', count: 144 }
  ];

  // 分析维度选项
  const dimensionOptions = [
    { key: 'region', label: '地域维度', icon: MapPin },
    { key: 'business', label: '业务维度', icon: Building2 },
    { key: 'datasource', label: '数据源维度', icon: Database },
    { key: 'time', label: '时间维度', icon: Clock }
  ];

  // 模拟数据
  const overviewData = {
    totalDataVolume: 8657000,
    processedVolume: 8483860,
    qualityScore: 95.8,
    governanceRate: 94.7,
    issuesCount: 201,
    completionRate: 98.0,
    trend: '+2.3%'
  };

  const chartData = {
    qualityTrends: [
      { date: '12-01', quality: 92, governance: 89, completion: 87 },
      { date: '12-08', quality: 93, governance: 91, completion: 89 },
      { date: '12-15', quality: 94, governance: 92, completion: 91 },
      { date: '12-22', quality: 95, governance: 94, completion: 93 },
      { date: '12-29', quality: 96, governance: 95, completion: 95 }
    ],
    unitRanking: [
      { unit: '太原供电', score: 96.5, volume: 1567, issues: 12 },
      { unit: '大同供电', score: 94.2, volume: 1234, issues: 18 },
      { unit: '运城供电', score: 92.8, volume: 1089, issues: 25 },
      { unit: '临汾供电', score: 91.5, volume: 987, issues: 31 }
    ],
    dataDistribution: [
      { name: '已处理', value: 78, color: '#22c55e' },
      { name: '处理中', value: 15, color: '#3b82f6' },
      { name: '待处理', value: 5, color: '#f59e0b' },
      { name: '异常', value: 2, color: '#ef4444' }
    ],
    qualityDimensions: [
      { dimension: '完整性', score: 96.5, target: 98 },
      { dimension: '准确性', score: 94.2, target: 96 },
      { dimension: '一致性', score: 91.8, target: 95 },
      { dimension: '时效性', score: 93.6, target: 97 },
      { dimension: '有效性', score: 89.4, target: 93 },
      { dimension: '唯一性', score: 97.8, target: 99 }
    ],
    // 新增：地域维度分析
    regionAnalysis: [
      { region: '太原', volume: 2156, quality: 96.2, issues: 34, trend: '+1.8%' },
      { region: '大同', volume: 1834, quality: 94.7, issues: 42, trend: '+2.1%' },
      { region: '运城', volume: 1567, quality: 93.4, issues: 56, trend: '+0.9%' },
      { region: '临汾', volume: 1234, quality: 92.1, issues: 68, trend: '-0.3%' },
      { region: '晋中', volume: 987, quality: 91.8, issues: 43, trend: '+1.2%' },
      { region: '其他', volume: 879, quality: 90.5, issues: 58, trend: '+0.7%' }
    ],
    // 新增：业务维度分析
    businessAnalysis: [
      { business: '用户管理', volume: 2890, quality: 95.6, completion: 97.2, efficiency: 92.8 },
      { business: '计量管理', volume: 2340, quality: 94.3, completion: 96.5, efficiency: 91.4 },
      { business: '营销管理', volume: 1560, quality: 93.7, completion: 95.8, efficiency: 90.6 },
      { business: '配网管理', volume: 1234, quality: 92.4, completion: 94.3, efficiency: 89.2 },
      { business: '财务管理', volume: 633, quality: 96.8, completion: 98.1, efficiency: 94.5 }
    ],
    // 新增：数据源维度分析
    datasourceAnalysis: [
      { source: '营销系统', volume: 3245, quality: 96.4, errors: 67, type: '核心系统' },
      { source: '计量系统', volume: 2156, quality: 94.8, errors: 89, type: '核心系统' },
      { source: '配网系统', volume: 1567, quality: 93.2, errors: 124, type: '核心系统' },
      { source: 'ERP系统', volume: 890, quality: 95.6, errors: 45, type: '管理系统' },
      { source: '移动APP', volume: 456, quality: 91.3, errors: 78, type: '移动应用' },
      { source: '第三方接口', volume: 343, quality: 88.7, errors: 98, type: '外部系统' }
    ],
    // 新增：时间维度详细分析
    timeDetailAnalysis: [
      { time: '00:00-04:00', volume: 234, quality: 97.2, load: '低' },
      { time: '04:00-08:00', volume: 567, quality: 96.8, load: '中' },
      { time: '08:00-12:00', volume: 1890, quality: 94.5, load: '高' },
      { time: '12:00-16:00', volume: 2340, quality: 93.2, load: '高' },
      { time: '16:00-20:00', volume: 1567, quality: 94.8, load: '中' },
      { time: '20:00-24:00', volume: 890, quality: 96.1, load: '低' }
    ]
  };

  const renderOverview = () => (
    <div className="space-y-3">
      {/* 核心指标 */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <Database className="h-4 w-4 text-blue-600" />
              <Badge variant="outline" className="text-xs">{overviewData.trend}</Badge>
            </div>
            <div className="text-xl font-bold text-blue-700">
              <AnimatedNumber value={overviewData.totalDataVolume / 10000} suffix="万" />
            </div>
            <div className="text-xs text-blue-600">数据总量</div>
            <div className="text-xs text-gray-500 mt-1">
              已处理 {(overviewData.processedVolume / 10000).toFixed(1)}万
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <Target className="h-4 w-4 text-green-600" />
              <Badge variant="outline" className="text-xs">优秀</Badge>
            </div>
            <div className="text-xl font-bold text-green-700">
              <AnimatedNumber value={overviewData.qualityScore} suffix="%" />
            </div>
            <div className="text-xs text-green-600">质量得分</div>
            <div className="text-xs text-gray-500 mt-1">
              治理率 {overviewData.governanceRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 处理进度 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            数据处理进度
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>整体完成率</span>
                <span className="font-medium">{overviewData.completionRate}%</span>
              </div>
              <Progress value={overviewData.completionRate} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="p-2 bg-green-50 rounded text-xs">
                <div className="font-bold text-green-600">
                  {(overviewData.processedVolume / 10000).toFixed(1)}万
                </div>
                <div className="text-gray-600">已完成</div>
              </div>
              <div className="p-2 bg-blue-50 rounded text-xs">
                <div className="font-bold text-blue-600">
                  {((overviewData.totalDataVolume - overviewData.processedVolume) / 10000).toFixed(1)}万
                </div>
                <div className="text-gray-600">处理中</div>
              </div>
              <div className="p-2 bg-orange-50 rounded text-xs">
                <div className="font-bold text-orange-600">{overviewData.issuesCount}</div>
                <div className="text-gray-600">待解决</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 趋势图表 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">质量趋势</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={180}>
            <RechartsLineChart data={chartData.qualityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '6px',
                  fontSize: '12px'
                }} 
              />
              <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} name="质量分数" />
              <Line type="monotone" dataKey="governance" stroke="#22c55e" strokeWidth={2} name="治理进度" />
              <Line type="monotone" dataKey="completion" stroke="#8b5cf6" strokeWidth={2} name="完成率" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderDimensionAnalysis = () => (
    <div className="space-y-3">
      {/* 维度选择 */}
      <div className="grid grid-cols-2 gap-2">
        {dimensionOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <Button
              key={option.key}
              variant={selectedDimension === option.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDimension(option.key)}
              className="justify-start text-xs h-auto p-2"
            >
              <IconComponent className="h-3 w-3 mr-1" />
              {option.label}
            </Button>
          );
        })}
      </div>

      {/* 地域维度分析 */}
      {selectedDimension === 'region' && (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                地域分布分析
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData.regionAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#3b82f6" name="数据量(万)" />
                  <Bar dataKey="quality" fill="#22c55e" name="质量分数" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {chartData.regionAnalysis.map((region, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        region.quality >= 95 ? 'bg-green-500' :
                        region.quality >= 90 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="text-sm font-medium">{region.region}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{region.quality}%</div>
                      <div className="text-xs text-gray-500">{region.volume}万条</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">问题数: {region.issues}</div>
                    <Badge variant="outline" className={`text-xs ${
                      region.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {region.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 业务维度分析 */}
      {selectedDimension === 'business' && (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                业务线分析
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={chartData.businessAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="business" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#8b5cf6" name="数据量" />
                  <Line type="monotone" dataKey="quality" stroke="#22c55e" strokeWidth={2} name="质量分数" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {chartData.businessAnalysis.map((business, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{business.business}</span>
                    <Badge variant="outline" className="text-xs">{business.volume}万条</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{business.quality}%</div>
                      <div className="text-gray-500">质量</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{business.completion}%</div>
                      <div className="text-gray-500">完成率</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{business.efficiency}%</div>
                      <div className="text-gray-500">效率</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 数据源维度分析 */}
      {selectedDimension === 'datasource' && (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="h-4 w-4" />
                数据源质量分析
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData.datasourceAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="quality" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {chartData.datasourceAnalysis.map((source, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium">{source.source}</span>
                      <Badge variant="outline" className="ml-2 text-xs">{source.type}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{source.quality}%</div>
                      <div className="text-xs text-gray-500">{source.volume}万条</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-red-600">错误: {source.errors}个</div>
                    <Progress value={source.quality} className="w-20 h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 时间维度分析 */}
      {selectedDimension === 'time' && (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                时段处理分析
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData.timeDetailAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#f59e0b" name="处理量" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {chartData.timeDetailAnalysis.map((time, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-sm font-medium">{time.time}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{time.quality}%</div>
                      <div className="text-xs text-gray-500">{time.volume}万条</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={
                      time.load === '高' ? 'destructive' :
                      time.load === '中' ? 'default' : 'secondary'
                    } className="text-xs">
                      {time.load}负载
                    </Badge>
                    <Progress value={time.quality} className="w-16 h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderQualityAnalysis = () => (
    <div className="space-y-3">
      {/* 质量维度雷达图 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">6维度质量分析</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={chartData.qualityDimensions}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
              <Radar name="当前得分" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="目标值" dataKey="target" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 质量维度详情 */}
      <div className="space-y-2">
        {chartData.qualityDimensions.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.dimension}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">目标{item.target}%</span>
                  <Badge variant={item.score >= item.target ? 'default' : 'secondary'} className="text-xs">
                    {item.score}%
                  </Badge>
                </div>
              </div>
              <Progress value={item.score} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>当前: {item.score}%</span>
                <span className={item.score >= item.target ? 'text-green-600' : 'text-orange-600'}>
                  {item.score >= item.target ? '达标' : `差${item.target - item.score}%`}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部筛选区 */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">智能分析报表</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 px-3"
            >
              <Filter className="h-3 w-3 mr-1" />
              筛选
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* 筛选器 */}
          {showFilters && (
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-600 mb-2">时间范围</div>
                <div className="grid grid-cols-2 gap-2">
                  {timeRanges.map((range) => (
                    <Button
                      key={range.key}
                      variant={selectedTimeRange === range.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeRange(range.key)}
                      className="justify-start text-xs h-auto p-2"
                    >
                      <div>
                        <div>{range.label}</div>
                        <div className="text-xs opacity-70">{range.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-2">统计单位</div>
                <div className="grid grid-cols-2 gap-2">
                  {unitOptions.map((unit) => (
                    <Button
                      key={unit.key}
                      variant={selectedUnit === unit.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedUnit(unit.key)}
                      className="justify-between text-xs h-auto p-2"
                    >
                      <span>{unit.label}</span>
                      <Badge variant="secondary" className="text-xs">{unit.count}</Badge>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  生成报表
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-3">
                  <Download className="h-3 w-3 mr-1" />
                  导出
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 标签页内容 */}
      <div className="p-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">概览</TabsTrigger>
            <TabsTrigger value="dimensions" className="text-xs">多维分析</TabsTrigger>
            <TabsTrigger value="quality" className="text-xs">质量分析</TabsTrigger>
            <TabsTrigger value="units" className="text-xs">单位分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="dimensions" className="mt-0">
            {renderDimensionAnalysis()}
          </TabsContent>

          <TabsContent value="quality" className="mt-0">
            {renderQualityAnalysis()}
          </TabsContent>

          <TabsContent value="units" className="mt-0">
            <div className="space-y-3">
              {/* 单位排名 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    单位排名
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {chartData.unitRanking.map((unit, index) => (
                      <div key={unit.unit} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{unit.unit}</div>
                            <div className="text-xs text-gray-500">{unit.volume}万条数据</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-600">{unit.score}%</div>
                          <div className="text-xs text-gray-500">{unit.issues}个问题</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 数据分布 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">数据处理分布</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={160}>
                    <RechartsPieChart>
                      <Pie
                        data={chartData.dataDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                        fontSize={10}
                      >
                        {chartData.dataDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsReports;
