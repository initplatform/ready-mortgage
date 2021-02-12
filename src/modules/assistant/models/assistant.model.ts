export interface AssistantState {
    assistant: Assistant | null;
    loaded: boolean;
    loading: boolean;
}

export interface Assistant {
    generalInfo: string;
}
