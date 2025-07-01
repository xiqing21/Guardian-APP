
export interface Role {
  id: string;
  name: string;
  level: 'province' | 'city' | 'county' | 'substation' | 'grid';
  permissions: string[];
  unitName: string;
  parentUnit?: string;
}

export interface RoleContent {
  showStatistics: boolean;
  showTasks: boolean;
  showAnalytics: boolean;
  showManagement: boolean;
}

export const roleConfigs: Record<string, RoleContent> = {
  province: {
    showStatistics: true,
    showTasks: false,
    showAnalytics: true,
    showManagement: true
  },
  city: {
    showStatistics: true,
    showTasks: false,
    showAnalytics: true,
    showManagement: true
  },
  county: {
    showStatistics: true,
    showTasks: false,
    showAnalytics: true,
    showManagement: false
  },
  substation: {
    showStatistics: false,
    showTasks: true,
    showAnalytics: false,
    showManagement: false
  },
  grid: {
    showStatistics: false,
    showTasks: true,
    showAnalytics: false,
    showManagement: false
  }
};
