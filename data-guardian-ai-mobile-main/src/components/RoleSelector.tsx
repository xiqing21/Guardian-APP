
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Building2, MapPin, User, Crown, Shield, Users } from 'lucide-react';
import { Role } from '../types/Role';

interface RoleSelectorProps {
  currentRole: Role;
  availableRoles: Role[];
  onRoleChange: (roleId: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  availableRoles,
  onRoleChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getRoleIcon = (level: string) => {
    switch (level) {
      case 'province':
        return <Crown className="h-5 w-5 text-purple-600" />;
      case 'city':
        return <Shield className="h-5 w-5 text-blue-600" />;
      case 'county':
        return <Building2 className="h-5 w-5 text-green-600" />;
      case 'substation':
        return <MapPin className="h-5 w-5 text-orange-600" />;
      case 'grid':
        return <User className="h-5 w-5 text-gray-600" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getRoleLevelText = (level: string) => {
    switch (level) {
      case 'province': return '省级';
      case 'city': return '市级';
      case 'county': return '县级';  
      case 'substation': return '供电所';
      case 'grid': return '网格';
      default: return level;
    }
  };

  const getRoleLevelColor = (level: string) => {
    switch (level) {
      case 'province': return 'bg-purple-500 text-white shadow-lg shadow-purple-200';
      case 'city': return 'bg-blue-500 text-white shadow-lg shadow-blue-200';
      case 'county': return 'bg-green-500 text-white shadow-lg shadow-green-200';
      case 'substation': return 'bg-orange-500 text-white shadow-lg shadow-orange-200';
      case 'grid': return 'bg-gray-500 text-white shadow-lg shadow-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleBorderColor = (level: string) => {
    switch (level) {
      case 'province': return 'border-l-purple-500 bg-purple-50';
      case 'city': return 'border-l-blue-500 bg-blue-50';
      case 'county': return 'border-l-green-500 bg-green-50';
      case 'substation': return 'border-l-orange-500 bg-orange-50';
      case 'grid': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-300 bg-white';
    }
  };

  const handleRoleSelect = (roleId: string) => {
    console.log('角色选择:', roleId);
    onRoleChange(roleId);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log('切换下拉菜单:', !isOpen);
  };

  // 点击外部关闭下拉菜单
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.role-selector-container')) {
        setIsOpen(false);
        console.log('点击外部关闭下拉菜单');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative role-selector-container">
      <Button
        variant="outline"
        onClick={toggleDropdown}
        className={`flex items-center gap-3 min-w-60 justify-between hover:shadow-md transition-all duration-200 border-2 p-3 h-auto ${getRoleBorderColor(currentRole.level)}`}
        type="button"
      >
        <div className="flex items-center gap-3">
          {getRoleIcon(currentRole.level)}
          <div className="text-left">
            <div className="font-semibold text-base text-gray-900">{currentRole.name}</div>
            {currentRole.parentUnit && (
              <div className="text-sm text-gray-600 mt-0.5">隶属: {currentRole.parentUnit}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`text-sm px-3 py-1 font-semibold ${getRoleLevelColor(currentRole.level)}`}>
            {getRoleLevelText(currentRole.level)}
          </Badge>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </Button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto min-w-60 z-[99999] animate-fade-in"
          style={{ zIndex: 99999 }}
        >
          <div className="p-2">
            <div className="text-sm font-medium text-gray-500 px-3 py-2 border-b border-gray-100 mb-2">
              选择角色层级
            </div>
            {availableRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                className={`w-full p-4 hover:shadow-md cursor-pointer border-l-4 rounded-lg mb-2 transition-all duration-200 text-left ${
                  role.id === currentRole.id 
                    ? `${getRoleBorderColor(role.level)} ring-2 ring-offset-2 ring-blue-200` 
                    : `${getRoleBorderColor(role.level)} hover:shadow-lg`
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getRoleIcon(role.level)}
                    <div>
                      <div className="font-semibold text-base text-gray-900">{role.name}</div>
                      {role.parentUnit && (
                        <div className="text-sm text-gray-600 mt-0.5">隶属: {role.parentUnit}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-sm px-3 py-1 font-semibold ${getRoleLevelColor(role.level)}`}>
                      {getRoleLevelText(role.level)}
                    </Badge>
                    {role.id === currentRole.id && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                {/* 层级指示器 */}
                <div className="mt-3 flex items-center gap-1">
                  {['province', 'city', 'county', 'substation', 'grid'].map((level, index) => {
                    const isCurrentLevel = level === role.level;
                    const isPastLevel = ['province', 'city', 'county', 'substation', 'grid'].indexOf(role.level) >= index;
                    return (
                      <div key={level} className="flex items-center">
                        <div 
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isCurrentLevel 
                              ? 'bg-blue-500 ring-2 ring-blue-200' 
                              : isPastLevel 
                                ? 'bg-gray-400' 
                                : 'bg-gray-200'
                          }`}
                        />
                        {index < 4 && (
                          <div className={`w-4 h-0.5 ${isPastLevel ? 'bg-gray-400' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
