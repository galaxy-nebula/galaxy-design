export interface PromptAttachment {
  id: string;
  name: string;
  size?: string;
}

export interface SlashCommand {
  name: string;
  description: string;
}

export interface PromptBoxProps {
  placeholder?: string;
  model?: string;
  disabled?: boolean;
  busy?: boolean;
  attachments?: PromptAttachment[];
  commands?: SlashCommand[];
  onSubmit?: (content: string) => void;
  onStop?: () => void;
  className?: string;
}
