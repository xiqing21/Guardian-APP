
import React from 'react';
import EnhancedMessageInput from './EnhancedMessageInput';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  return <EnhancedMessageInput onSendMessage={onSendMessage} />;
};

export default MessageInput;
export { MessageInput };
