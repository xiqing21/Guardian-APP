
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';
import { Role } from '../types/Role';
import RoleSelector from './RoleSelector';

interface AppHeaderProps {
  currentRole: Role;
  availableRoles: Role[];
  onRoleChange: (roleId: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  currentRole, 
  availableRoles, 
  onRoleChange 
}) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-3 py-3">
        <div>
          <h1 className="text-base font-semibold text-gray-900">智能体</h1>
        </div>
        <div className="flex items-center gap-2">
          <RoleSelector
            currentRole={currentRole}
            availableRoles={availableRoles}
            onRoleChange={onRoleChange}
          />
          <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
            <Bell className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
            <User className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
