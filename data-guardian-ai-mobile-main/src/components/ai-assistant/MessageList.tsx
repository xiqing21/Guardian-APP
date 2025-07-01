
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../../hooks/useAIMessages';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.type === 'assistant' && (
            <div className="p-2 bg-blue-500 rounded-full self-start">
              <Bot className="h-4 w-4 text-white" />
            </div>
          )}
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-white border shadow-sm'
            }`}
          >
            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
            <div
              className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
          {message.type === 'user' && (
            <div className="p-2 bg-gray-300 rounded-full self-start">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          )}
        </div>
      ))}
      
      {isTyping && (
        <div className="flex gap-3 justify-start">
          <div className="p-2 bg-blue-500 rounded-full">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="bg-white border shadow-sm p-3 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
