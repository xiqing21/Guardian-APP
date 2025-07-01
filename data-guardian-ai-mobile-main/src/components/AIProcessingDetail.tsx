import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Power, CheckCircle, AlertTriangle, Clock, Brain } from 'lucide-react';

interface AIProcessingDetailProps {
  taskId: number;
  taskType: string;
  onComplete: (result: any) => void;
  onCancel: () => void;
}

const AIProcessingDetail = ({ taskId, taskType, onComplete, onCancel }: AIProcessingDetailProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [processingSteps, setProcessingSteps] = useState([]);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);

  const processingConfigs = {
    phone: {
      title: '手机号智能验证',
      steps: [
        { name: '数据预处理', desc: '格式化和清洗手机号数据', duration: 2000 },
        { name: '规则验证', desc: '基于运营商规则验证号码有效性', duration: 3000 },
        { name: 'AI智能识别', desc: '使用机器学习模型识别异常模式', duration: 4000 },
        { name: '外呼验证', desc: '智能外呼系统验证号码可达性', duration: 5000 },
        { name: '结果分析', desc: '综合分析生成处理建议', duration: 2000 }
      ]
    },
    address: {
      title: '地址信息智能补全',
      steps: [
        { name: '地址解析', desc: '分析地址结构和层级关系', duration: 2000 },
        { name: '地理编码', desc: '调用地图API获取精确坐标', duration: 3000 },
        { name: '标准化处理', desc: '统一地址格式和命名规范', duration: 3000 },
        { name: '完整性检查', desc: '检查地址要素完整性', duration: 2000 },
        { name: '质量评估', desc: '评估地址数据质量分数', duration: 1000 }
      ]
    },
    contract: {
      title: '合同信息智能校验',
      steps: [
        { name: '文本提取', desc: 'OCR识别合同关键信息', duration: 3000 },
        { name: '信息比对', desc: '与数据库信息进行智能比对', duration: 4000 },
        { name: '逻辑校验', desc: '检查合同逻辑一致性', duration: 3000 },
        { name: '风险评估', desc: 'AI模型识别潜在风险点', duration: 2000 },
        { name: '合规检查', desc: '验证合同合规性要求', duration: 2000 }
      ]
    }
  };

  useEffect(() => {
    const config = processingConfigs[taskType] || processingConfigs.phone;
    setProcessingSteps(config.steps);
    
    const processSteps = async () => {
      for (let i = 0; i < config.steps.length; i++) {
        setCurrentStep(i);
        
        // 模拟处理进度
        for (let p = 0; p <= 100; p += 10) {
          setProgress(p);
          await new Promise(resolve => setTimeout(resolve, config.steps[i].duration / 10));
        }
        
        // 生成步骤结果
        const stepResult = generateStepResult(config.steps[i], taskType);
        setResults(prev => [...prev, stepResult]);
        
        setProgress(0);
      }
      
      setIsProcessing(false);
      
      // 生成最终结果
      const finalResult = generateFinalResult(taskType);
      setTimeout(() => onComplete(finalResult), 1000);
    };
    
    processSteps();
  }, [taskType]);

  const generateStepResult = (step, type) => {
    const baseResults = {
      phone: {
        '数据预处理': { processed: 1247, valid: 1156, invalid: 91 },
        '规则验证': { passed: 1089, failed: 67, suspicious: 91 },
        'AI智能识别': { normal: 1045, anomaly: 44, confidence: 94.2 },
        '外呼验证': { reachable: 987, unreachable: 102, busy: 58 },
        '结果分析': { recommend_keep: 987, recommend_update: 158, recommend_remove: 102 }
      },
      address: {
        '地址解析': { parsed: 2156, structured: 2089, unstructured: 67 },
        '地理编码': { geocoded: 2034, failed: 55, partial: 67 },
        '标准化处理': { standardized: 2089, formatted: 2156, normalized: 2034 },
        '完整性检查': { complete: 1876, incomplete: 280, missing_elements: 158 },
        '质量评估': { high_quality: 1876, medium_quality: 213, low_quality: 67 }
      },
      contract: {
        '文本提取': { extracted: 867, fields: 45, confidence: 96.7 },
        '信息比对': { matched: 789, unmatched: 78, partial: 67 },
        '逻辑校验': { consistent: 801, inconsistent: 66, warning: 45 },
        '风险评估': { low_risk: 723, medium_risk: 122, high_risk: 22 },
        '合规检查': { compliant: 812, non_compliant: 34, review_needed: 21 }
      }
    };
    
    return {
      step: step.name,
      timestamp: new Date(),
      data: baseResults[type]?.[step.name] || {},
      status: 'completed'
    };
  };

  const generateFinalResult = (type) => {
    const finalResults = {
      phone: {
        total_processed: 1247,
        auto_resolved: 987,
        manual_review: 158,
        rejected: 102,
        accuracy: 94.2,
        processing_time: '16分钟',
        recommendations: [
          '987个号码验证通过，建议保留',
          '158个号码需要人工核实',
          '102个无效号码建议删除'
        ]
      },
      address: {
        total_processed: 2156,
        auto_completed: 1876,
        partial_completed: 213,
        failed: 67,
        completion_rate: 96.9,
        processing_time: '11分钟',
        recommendations: [
          '1876条地址已自动补全',
          '213条地址需要少量人工确认',
          '67条地址需要重新收集'
        ]
      },
      contract: {
        total_processed: 867,
        auto_verified: 723,
        manual_review: 122,
        high_risk: 22,
        accuracy: 92.8,
        processing_time: '14分钟',
        recommendations: [
          '723份合同验证通过',
          '122份合同需要人工复核',
          '22份合同存在高风险需要重点关注'
        ]
      }
    };
    
    return finalResults[type] || finalResults.phone;
  };

  const config = processingConfigs[taskType] || processingConfigs.phone;

  return (
    <div className="p-4 space-y-6">
      {/* 头部信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            {config.title}
            <Badge variant="outline" className="ml-auto">
              任务ID: {taskId}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {isProcessing ? '正在处理中...' : '处理完成'}
            </span>
            <Badge variant={isProcessing ? "default" : "default"} className={isProcessing ? "" : "bg-green-500"}>
              {isProcessing ? '运行中' : '已完成'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 处理步骤 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">处理步骤</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {processingSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep ? 'bg-green-500' : 
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : index === currentStep ? (
                  <Zap className="h-4 w-4 text-white animate-pulse" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{step.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {index < currentStep ? '已完成' : 
                     index === currentStep ? '处理中' : '等待中'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{step.desc}</p>
                
                {index === currentStep && isProcessing && (
                  <div className="mt-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{progress}%</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 实时结果 */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">处理结果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{result.step}</h5>
                  <Badge variant="default" className="bg-green-500">完成</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {Object.entries(result.data).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-semibold text-lg">{String(value)}</div>
                      <div className="text-gray-600 text-xs">{key.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          取消处理
        </Button>
        {!isProcessing && (
          <Button className="bg-purple-500 hover:bg-purple-600">
            查看详细报告
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIProcessingDetail;
