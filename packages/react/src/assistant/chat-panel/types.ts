export interface ChatToolCall {
  id: string;
  name: string;
  args?: string;
  result?: string;
  status: 'running' | 'completed' | 'error';
}

export interface AssistantChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  toolCalls?: ChatToolCall[];
  streaming?: boolean;
}

export interface ChatPanelProps {
  title?: string;
  model?: string;
  messages: AssistantChatMessage[];
  placeholder?: string;
  disabled?: boolean;
  onSendMessage?: (content: string) => void;
  onStop?: () => void;
  className?: string;
}
