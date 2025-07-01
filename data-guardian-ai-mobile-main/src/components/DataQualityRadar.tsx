
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Shield,
  Database
} from 'lucide-react';
import { Role, RoleContent } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';

interface DataQualityRadarProps {
  currentRole: Role;
  roleContent: RoleContent;
  dataQuality: {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
    compliance: number;
    uniqueness: number;
  };
  dimensionDetails: {
    [key: string]: {
      issues: number;
      trend: string;
      level: string;
    };
  };
}

const DataQualityRadar: React.FC<DataQualityRadarProps> = ({
  currentRole,
  roleContent,
  dataQuality,
  dimensionDetails
}) => {
  const radarData = [
    { dimension: '完整性', value: dataQuality.completeness, fullMark: 100 },
    { dimension: '准确性', value: dataQuality.accuracy, fullMark: 100 },
    { dimension: '一致性', value: dataQuality.consistency, fullMark: 100 },
    { dimension: '及时性', value: dataQuality.timeliness, fullMark: 100 },
    { dimension: '合规性', value: dataQuality.compliance, fullMark: 100 },
    { dimension: '唯一性', value: dataQuality.uniqueness, fullMark: 100 }
  ];

  // 维度名称映射
  const dimensionMap: { [key: string]: string } = {
    completeness: '完整性',
    accuracy: '准确性',
    consistency: '一致性',
    timeliness: '及时性',
    compliance: '合规性',
    uniqueness: '唯一性'
  };

  // 本月质量趋势数据
  const trendData = [
    { month: '1月', quality: 85.2 },
    { month: '2月', quality: 87.5 },
    { month: '3月', quality: 89.1 },
    { month: '4月', quality: 90.8 },
    { month: '5月', quality: 92.3 },
    { month: '6月', quality: 93.6 }
  ];

  const getQualityLevel = (value: number) => {
    if (value >= 95) return { level: '优秀', color: 'text-green-600', bg: 'bg-green-100' };
    if (value >= 90) return { level: '良好', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (value >= 85) return { level: '待改进', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: '需关注', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const overallQuality = Math.round(
    (dataQuality.completeness + dataQuality.accuracy + dataQuality.consistency + 
     dataQuality.timeliness + dataQuality.compliance + dataQuality.uniqueness) / 6
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            数据质量六维度评价
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 雷达图 */}
            <div className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis 
                      domain={[0, 100]} 
                      angle={-90} 
                      tick={{ fontSize: 10 }}
                    />
                    <Radar
                      name="数据质量"
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              {/* 整体评分 */}
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedNumber value={overallQuality} suffix="%" />
                </div>
                <div className="text-sm text-gray-600">整体数据质量评分</div>
                <Badge className={`mt-2 ${getQualityLevel(overallQuality).bg} ${getQualityLevel(overallQuality).color}`}>
                  {getQualityLevel(overallQuality).level}
                </Badge>
              </div>
            </div>

            {/* 维度详情 */}
            <div className="space-y-3">
              {Object.entries(dataQuality).map(([key, value]) => {
                const details = dimensionDetails[key];
                const qualityInfo = getQualityLevel(value);
                const dimensionName = dimensionMap[key] || key;
                
                return (
                  <div key={key} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{dimensionName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          <AnimatedNumber value={Math.round(value)} suffix="%" />
                        </span>
                        <Badge className={`text-xs ${qualityInfo.bg} ${qualityInfo.color}`}>
                          {qualityInfo.level}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={value} className="h-2 mb-2" />
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>问题数: <AnimatedNumber value={details?.issues || 0} /></span>
                      <span className={details?.trend?.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {details?.trend || '+0%'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 本月质量趋势 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            本月质量趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '数据质量']}
                  labelFormatter={(label) => `${label}份`}
                />
                <Line 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">+8.4%</span>
              </div>
              <div className="text-xs text-gray-600">月度提升</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-lg font-bold text-blue-600">
                  <AnimatedNumber value={93.6} suffix="%" />
                </span>
              </div>
              <div className="text-xs text-gray-600">当前质量</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-lg font-bold text-purple-600">95%</span>
              </div>
              <div className="text-xs text-gray-600">目标质量</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataQualityRadar;
