export interface AgentTask {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  detail?: string;
}

export interface AgentToolEvent {
  id: string;
  name: string;
  summary: string;
  timestamp?: Date;
}

export interface AgentActivityProps {
  agentName?: string;
  status?: 'idle' | 'thinking' | 'working';
  tasks: AgentTask[];
  toolEvents?: AgentToolEvent[];
  elapsedLabel?: string;
  className?: string;
}
