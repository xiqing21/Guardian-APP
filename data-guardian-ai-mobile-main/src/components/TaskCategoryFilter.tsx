
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, SortAsc } from 'lucide-react';

interface Category {
  key: string;
  label: string;
  count: number;
}

interface TaskCategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const TaskCategoryFilter: React.FC<TaskCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'label' | 'count'>('count');

  // 过滤和排序分类
  const filteredAndSortedCategories = categories
    .filter(category => 
      category.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'count') {
        return b.count - a.count;
      }
      return a.label.localeCompare(b.label);
    });

  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="mb-6 space-y-4">
      {/* 搜索和排序控制 */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索分类..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortBy(sortBy === 'count' ? 'label' : 'count')}
          className="flex items-center gap-2"
        >
          <SortAsc className="h-4 w-4" />
          {sortBy === 'count' ? '按数量' : '按名称'}
        </Button>
      </div>

      {/* 统计信息 */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>共 {filteredAndSortedCategories.length} 个分类</span>
        </div>
        <span>总计 {totalCount} 个任务</span>
      </div>

      {/* 分类按钮 */}
      <div className="flex flex-wrap gap-2">
        {filteredAndSortedCategories.map((category) => {
          const isSelected = selectedCategory === category.key;
          const percentage = totalCount > 0 ? Math.round((category.count / totalCount) * 100) : 0;
          
          return (
            <Button
              key={category.key}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.key)}
              className={`relative transition-all hover:scale-105 ${
                isSelected 
                  ? 'shadow-md ring-2 ring-blue-200' 
                  : 'hover:shadow-sm'
              }`}
            >
              <span className="flex items-center gap-2">
                {category.label}
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.count}
                </Badge>
              </span>
              
              {/* 百分比提示 */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full">
                  {percentage}%
                </div>
              )}
            </Button>
          );
        })}
      </div>

      {/* 快速操作 */}
      <div className="flex items-center gap-2 pt-2 border-t">
        <span className="text-sm text-gray-500">快速选择:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCategoryChange('all')}
          className="text-xs h-7"
        >
          全部
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const highestCountCategory = categories.reduce((max, cat) => 
              cat.count > max.count ? cat : max
            );
            onCategoryChange(highestCountCategory.key);
          }}
          className="text-xs h-7"
        >
          最多任务
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSearchTerm('')}
          className="text-xs h-7"
        >
          清除搜索
        </Button>
      </div>

      {/* 搜索结果提示 */}
      {searchTerm && filteredAndSortedCategories.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <Filter className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">未找到匹配的分类</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
            className="mt-2 text-xs"
          >
            清除搜索条件
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskCategoryFilter;
