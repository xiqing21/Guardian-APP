
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Task } from '../types/Task';

interface NewTaskFormProps {
  onBack: () => void;
  onSubmit: (task: Task) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onBack, onSubmit }) => {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: 'phone',
      priority: 'medium',
      assignee: '网格员001',
      deadline: '',
      autoProcessable: false
    }
  });

  const onSubmitNewTask = (data: any) => {
    const newTask: Task = {
      id: Date.now(), // Simple ID generation
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: 'pending',
      progress: 0,
      assignee: data.assignee,
      deadline: data.deadline,
      autoProcessable: data.autoProcessable
    };
    
    onSubmit(newTask);
    form.reset();
    onBack();
    console.log('新建任务成功:', newTask);
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowLeft 
              className="h-4 w-4 cursor-pointer" 
              onClick={onBack}
            />
            新建任务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNewTask)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>任务标题</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入任务标题" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>任务描述</FormLabel>
                    <FormControl>
                      <Textarea placeholder="请输入任务描述" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>任务类别</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择类别" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phone">手机号</SelectItem>
                          <SelectItem value="address">地址</SelectItem>
                          <SelectItem value="contract">合同</SelectItem>
                          <SelectItem value="certificate">证照</SelectItem>
                          <SelectItem value="call">外呼</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>优先级</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择优先级" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">低</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="high">高</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>负责人</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择负责人" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="网格员001">网格员001</SelectItem>
                          <SelectItem value="网格员002">网格员002</SelectItem>
                          <SelectItem value="网格员003">网格员003</SelectItem>
                          <SelectItem value="网格员004">网格员004</SelectItem>
                          <SelectItem value="网格员005">网格员005</SelectItem>
                          <SelectItem value="AI智能体">AI智能体</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>截止日期</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  保存任务
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                >
                  取消
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTaskForm;
