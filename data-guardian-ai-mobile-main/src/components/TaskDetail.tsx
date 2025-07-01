
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Upload, 
  Camera,
  FileText,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Task } from '../types/Task';

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
  onConfirm: (taskId: number, result: any) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onBack, onConfirm }) => {
  const [confirmationType, setConfirmationType] = useState('');
  const [reportData, setReportData] = useState({
    status: '',
    notes: '',
    images: [],
    phoneVerified: '',
    addressConfirmed: '',
    contractValid: '',
    certificateStatus: ''
  });
  const [showReportForm, setShowReportForm] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    // 模拟图片上传
    console.log('上传图片:', files);
  };

  const handleConfirmTask = () => {
    const result = {
      ...reportData,
      confirmationType,
      timestamp: new Date().toISOString(),
      operator: '网格员001'
    };
    onConfirm(task.id, result);
    onBack();
  };

  const getTaskTypeForm = () => {
    switch (task.category) {
      case 'phone':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneVerified">手机号验证结果</Label>
              <select 
                id="phoneVerified"
                className="w-full p-2 border rounded-md"
                value={reportData.phoneVerified}
                onChange={(e) => setReportData({...reportData, phoneVerified: e.target.value})}
              >
                <option value="">请选择</option>
                <option value="valid">有效</option>
                <option value="invalid">无效</option>
                <option value="suspended">停机</option>
                <option value="wrong">号码错误</option>
              </select>
            </div>
            <div>
              <Label htmlFor="newPhone">正确手机号（如需更正）</Label>
              <Input id="newPhone" placeholder="请输入正确的手机号" />
            </div>
          </div>
        );
      case 'address':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="addressConfirmed">地址确认结果</Label>
              <select 
                id="addressConfirmed"
                className="w-full p-2 border rounded-md"
                value={reportData.addressConfirmed}
                onChange={(e) => setReportData({...reportData, addressConfirmed: e.target.value})}
              >
                <option value="">请选择</option>
                <option value="correct">地址正确</option>
                <option value="incomplete">地址不完整</option>
                <option value="wrong">地址错误</option>
                <option value="moved">已搬迁</option>
              </select>
            </div>
            <div>
              <Label htmlFor="correctAddress">正确地址</Label>
              <Textarea id="correctAddress" placeholder="请填写完整正确的地址" />
            </div>
          </div>
        );
      case 'contract':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contractValid">合同信息核查结果</Label>
              <select 
                id="contractValid"
                className="w-full p-2 border rounded-md"
                value={reportData.contractValid}
                onChange={(e) => setReportData({...reportData, contractValid: e.target.value})}
              >
                <option value="">请选择</option>
                <option value="valid">信息一致</option>
                <option value="mismatch">信息不一致</option>
                <option value="missing">合同缺失</option>
                <option value="expired">合同过期</option>
              </select>
            </div>
          </div>
        );
      case 'certificate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="certificateStatus">证照检查结果</Label>
              <select 
                id="certificateStatus"
                className="w-full p-2 border rounded-md"
                value={reportData.certificateStatus}
                onChange={(e) => setReportData({...reportData, certificateStatus: e.target.value})}
              >
                <option value="">请选择</option>
                <option value="valid">证照有效</option>
                <option value="expired">证照过期</option>
                <option value="invalid">证照无效</option>
                <option value="missing">证照缺失</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部导航 */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">任务详情</h1>
      </div>

      {/* 任务基本信息 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {task.title}
            <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
              {task.status === 'pending' ? '待处理' : 
               task.status === 'in-progress' ? '进行中' : '已完成'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{task.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">分配给：</span>
                <span className="font-medium">{task.assignee}</span>
              </div>
              <div>
                <span className="text-gray-500">截止时间：</span>
                <span className="font-medium">{task.deadline}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">进度</span>
                <span className="text-sm font-medium">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI处理结果 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            AI智能检测结果
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="font-medium text-red-800">发现异常</div>
              <div className="text-sm text-red-600">
                {task.category === 'phone' && '手机号格式不符合规范，疑似虚假号码'}
                {task.category === 'address' && '地址信息不完整，缺少详细门牌号'}
                {task.category === 'contract' && '合同信息与系统记录不一致'}
                {task.category === 'certificate' && '证照即将过期，需要及时更新'}
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-medium text-blue-800">AI建议处理方案</div>
              <div className="text-sm text-blue-600">
                {task.category === 'phone' && '建议通过外呼验证手机号有效性'}
                {task.category === 'address' && '建议实地核查并补全完整地址信息'}
                {task.category === 'contract' && '建议核对原始合同文件'}
                {task.category === 'certificate' && '建议联系客户更新证照信息'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 处理操作 */}
      {!showReportForm ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>选择处理方式</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setConfirmationType('ai-correct');
                  setShowReportForm(true);
                }}
              >
                <Check className="h-4 w-4 mr-2" />
                确认AI处理结果正确
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setConfirmationType('manual-verify');
                  setShowReportForm(true);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                需要人工核查处理
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setConfirmationType('escalate');
                  setShowReportForm(true);
                }}
              >
                <Clock className="h-4 w-4 mr-2" />
                上报上级处理
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>处理详情填写</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 具体任务类型的表单 */}
              {getTaskTypeForm()}
              
              {/* 现场照片上传 */}
              <div>
                <Label>现场照片（可选）</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">拍摄现场照片作为证据</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-1" />
                      拍照
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      上传图片
                    </Button>
                  </div>
                </div>
              </div>

              {/* 处理说明 */}
              <div>
                <Label htmlFor="notes">处理说明</Label>
                <Textarea 
                  id="notes"
                  placeholder="请详细描述处理过程和结果..."
                  value={reportData.notes}
                  onChange={(e) => setReportData({...reportData, notes: e.target.value})}
                  rows={4}
                />
              </div>

              {/* 处理结果状态 */}
              <div>
                <Label htmlFor="status">处理结果</Label>
                <select 
                  id="status"
                  className="w-full p-2 border rounded-md"
                  value={reportData.status}
                  onChange={(e) => setReportData({...reportData, status: e.target.value})}
                >
                  <option value="">请选择处理结果</option>
                  <option value="resolved">问题已解决</option>
                  <option value="partial">部分解决</option>
                  <option value="unable">无法解决</option>
                  <option value="escalated">已上报处理</option>
                </select>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleConfirmTask}
                  disabled={!reportData.status}
                  className="flex-1"
                >
                  提交处理结果
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1"
                >
                  返回选择
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskDetail;
