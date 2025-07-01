
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, User } from 'lucide-react';

interface Unit {
  id: number;
  name: string;
  type: string;
  region: string;
  employees: number;
  totalDataVolume: number;
  processedDataVolume: number;
  responsiblePerson: string;
}

interface UnitBasicInfoProps {
  unit: Unit;
}

const UnitBasicInfo: React.FC<UnitBasicInfoProps> = ({ unit }) => {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Building2 className="h-4 w-4" />
          基本信息
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">单位类型</span>
              <Badge variant="outline" className="text-xs">{unit.type}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">所在区域</span>
              <span className="font-medium text-xs">{unit.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">责任主体</span>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-blue-500" />
                <span className="font-medium text-xs">{unit.responsiblePerson}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">员工数量</span>
              <span className="font-medium text-xs">{unit.employees}人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">总数据量</span>
              <span className="font-medium text-xs">{unit.totalDataVolume}GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">已处理数据量</span>
              <span className="font-medium text-green-600 text-xs">{unit.processedDataVolume}GB</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitBasicInfo;
