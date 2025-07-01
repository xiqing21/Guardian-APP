
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Video, 
  FileText, 
  Upload, 
  Mic, 
  Play, 
  Pause, 
  Square,
  Eye,
  Brain,
  Zap
} from 'lucide-react';

interface MediaRecognitionProps {
  onAnalysisComplete: (result: any) => void;
}

const MediaRecognition: React.FC<MediaRecognitionProps> = ({ onAnalysisComplete }) => {
  const [activeMode, setActiveMode] = useState<'image' | 'video' | 'text' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsAnalyzing(true);

    // 模拟AI分析过程
    setTimeout(() => {
      const mockResult = generateMockAnalysis(file.type);
      setIsAnalyzing(false);
      onAnalysisComplete(mockResult);
    }, 3000);
  };

  const generateMockAnalysis = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return {
        type: 'image',
        content: '🖼️ **图像识别分析完成**\n\n**识别内容：**\n• 电力设备：变压器 (置信度: 94.2%)\n• 设备状态：正常运行\n• 异常检测：未发现明显异常\n• 安全隐患：无\n\n**AI建议：**\n• 建议定期巡检\n• 关注设备运行温度\n• 检查接线端子',
        confidence: 94.2,
        details: {
          objects: ['变压器', '电力线路', '绝缘子'],
          status: '正常',
          risks: []
        }
      };
    } else if (fileType.startsWith('video/')) {
      return {
        type: 'video',
        content: '🎥 **视频分析完成**\n\n**视频内容：**\n• 时长：2分30秒\n• 场景：电力巡检作业\n• 人员：2名作业人员\n• 设备：线路巡检\n\n**关键发现：**\n• 作业规范性：95%\n• 安全防护：完备\n• 发现异常：绝缘子表面污损\n\n**AI建议：**\n• 及时清理污损绝缘子\n• 加强该区域巡检频次',
        confidence: 91.8,
        details: {
          duration: '2:30',
          scenes: ['巡检作业', '设备检查'],
          issues: ['绝缘子污损']
        }
      };
    } else {
      return {
        type: 'text',
        content: '📄 **文本分析完成**\n\n**文档类型：**电力设备检修报告\n\n**关键信息提取：**\n• 设备编号：TR-001\n• 检修日期：2024-01-15\n• 检修结果：合格\n• 下次检修：2024-07-15\n\n**AI分析：**\n• 文档完整性：100%\n• 信息准确性：98.5%\n• 合规性检查：通过\n\n**建议操作：**\n• 录入设备台账系统\n• 设置检修提醒',
        confidence: 98.5,
        details: {
          type: '检修报告',
          equipment: 'TR-001',
          status: '合格'
        }
      };
    }
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsRecording(true);
      }
    } catch (error) {
      console.error('无法访问摄像头:', error);
    }
  };

  const stopVideoRecording = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsRecording(false);
      
      // 模拟视频分析
      setIsAnalyzing(true);
      setTimeout(() => {
        const mockResult = generateMockAnalysis('video/mp4');
        setIsAnalyzing(false);
        onAnalysisComplete(mockResult);
      }, 4000);
    }
  };

  return (
    <div className="space-y-4">
      {/* 功能选择器 */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={activeMode === 'image' ? 'default' : 'outline'}
          onClick={() => setActiveMode('image')}
          className="h-12 text-xs"
        >
          <Camera className="h-4 w-4 mr-1" />
          图像识别
        </Button>
        <Button
          variant={activeMode === 'video' ? 'default' : 'outline'}
          onClick={() => setActiveMode('video')}
          className="h-12 text-xs"
        >
          <Video className="h-4 w-4 mr-1" />
          视频分析
        </Button>
        <Button
          variant={activeMode === 'text' ? 'default' : 'outline'}
          onClick={() => setActiveMode('text')}
          className="h-12 text-xs"
        >
          <FileText className="h-4 w-4 mr-1" />
          文档识别
        </Button>
      </div>

      {/* 分析状态显示 */}
      {isAnalyzing && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <div>
                <div className="font-medium text-purple-700">AI正在深度分析中...</div>
                <div className="text-sm text-purple-600">
                  {activeMode === 'image' && '🔍 图像内容识别与异常检测'}
                  {activeMode === 'video' && '🎬 视频内容分析与场景理解'}
                  {activeMode === 'text' && '📝 文档内容提取与智能解析'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 图像识别模式 */}
      {activeMode === 'image' && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-blue-500" />
                <span className="font-medium">智能图像识别</span>
                <Badge className="bg-blue-100 text-blue-700 text-xs">AI驱动</Badge>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={isAnalyzing}
              >
                <Upload className="h-4 w-4 mr-2" />
                上传图片进行AI识别
              </Button>
              
              <div className="text-xs text-gray-500">
                支持设备照片、巡检图像、故障图片等识别分析
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 视频分析模式 */}
      {activeMode === 'video' && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-green-500" />
                <span className="font-medium">智能视频分析</span>
                <Badge className="bg-green-100 text-green-700 text-xs">实时AI</Badge>
              </div>
              
              {!isRecording ? (
                <div className="text-center space-y-3">
                  <Button 
                    onClick={startVideoRecording}
                    className="w-full bg-green-500 hover:bg-green-600"
                    disabled={isAnalyzing}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    开始录制视频
                  </Button>
                  
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('video-upload')?.click()}
                    className="w-full"
                    disabled={isAnalyzing}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    上传视频文件
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    className="w-full rounded-lg bg-black"
                    style={{ maxHeight: '200px' }}
                  />
                  <Button 
                    onClick={stopVideoRecording}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    停止录制并分析
                  </Button>
                </div>
              )}
              
              <div className="text-xs text-gray-500 text-center">
                支持作业视频、设备运行视频、安全巡检视频分析
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 文档识别模式 */}
      {activeMode === 'text' && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-orange-500" />
                <span className="font-medium">智能文档识别</span>
                <Badge className="bg-orange-100 text-orange-700 text-xs">OCR+AI</Badge>
              </div>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="text-upload"
              />
              
              <Button 
                onClick={() => document.getElementById('text-upload')?.click()}
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isAnalyzing}
              >
                <Upload className="h-4 w-4 mr-2" />
                上传文档进行识别
              </Button>
              
              <div className="text-xs text-gray-500">
                支持PDF、Word、图片中的文字识别与信息提取
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 功能说明 */}
      {!activeMode && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <Brain className="h-8 w-8 mx-auto text-purple-500" />
              <h3 className="font-medium text-gray-800">AI多媒体识别助手</h3>
              <p className="text-sm text-gray-600">
                基于深度学习的图像、视频、文档智能识别与分析
              </p>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div className="p-2 bg-blue-100 rounded">
                  <div className="font-medium text-blue-700">图像识别</div>
                  <div className="text-blue-600">设备检测</div>
                </div>
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-medium text-green-700">视频分析</div>
                  <div className="text-green-600">行为识别</div>
                </div>
                <div className="p-2 bg-orange-100 rounded">
                  <div className="font-medium text-orange-700">文档解析</div>
                  <div className="text-orange-600">信息提取</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaRecognition;
