import { AssistantState } from '@modules/assistant/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAssistantState = createFeatureSelector<AssistantState>('assistantState');

export const selectAssistant = createSelector(
    selectAssistantState,
    (assistantState: AssistantState) => assistantState.assistant
);

export const selectAssistantLoaded = createSelector(
    selectAssistantState,
    (assistantState: AssistantState) => assistantState.loaded
);
