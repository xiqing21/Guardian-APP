
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EnhancedMessageInputProps {
  onSendMessage: (message: string) => void;
}

const EnhancedMessageInput: React.FC<EnhancedMessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const startVoiceInput = () => {
    setIsListening(true);
    setInputMode('voice');
    // 模拟语音识别
    setTimeout(() => {
      setIsListening(false);
      setInputValue('请帮我进行全面的数据质量深度分析');
      setInputMode('text');
    }, 3000);
  };

  const stopVoiceInput = () => {
    setIsListening(false);
    setInputMode('text');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-3">
      {/* 输入模式切换 */}
      <div className="flex items-center gap-2">
        <Button
          variant={inputMode === 'text' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputMode('text')}
          className="flex items-center gap-1"
        >
          <span className="text-xs">文本</span>
        </Button>
        <Button
          variant={inputMode === 'voice' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputMode('voice')}
          className="flex items-center gap-1"
        >
          <Mic className="h-3 w-3" />
          <span className="text-xs">语音</span>
        </Button>
      </div>

      {/* 输入区域 */}
      {inputMode === 'text' ? (
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的问题... (支持Shift+Enter换行，Enter发送)"
            onKeyPress={handleKeyPress}
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            rows={2}
          />
          <Button 
            onClick={handleSendMessage} 
            size="sm" 
            className="px-3 self-end"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              variant={isListening ? "destructive" : "default"}
              size="sm"
              className="flex items-center gap-2"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? '停止录音' : '开始录音'}
            </Button>
            {inputValue && (
              <Button 
                onClick={handleSendMessage} 
                size="sm" 
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {isListening && (
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <Badge variant="secondary" className="animate-pulse bg-red-100 text-red-600 mb-2">
                🎤 正在监听语音输入...
              </Badge>
              <div className="text-sm text-gray-600">
                支持普通话/方言识别，请清晰说话
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          {inputValue && !isListening && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">识别结果：</div>
              <div className="text-sm">{inputValue}</div>
            </div>
          )}
        </div>
      )}

      {/* 快捷输入建议 */}
      <div className="flex flex-wrap gap-2">
        {[
          '数据质量分析',
          '异常检测',
          '自动化处理',
          '外呼任务'
        ].map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => setInputValue(suggestion)}
            className="text-xs h-6 px-2"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EnhancedMessageInput;
