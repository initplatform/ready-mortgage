import { Assistant } from '@modules/assistant/models';
import { createAction, props, union } from '@ngrx/store';

export const loadAssistant = createAction('[Assistant] Load Assistant');
export const loadAssistantFail = createAction(
    '[Assistant] Load Assistant Fail',
    props<{ errorMessage: string }>()
);
export const loadAssistantSuccess = createAction(
    '[Assistant] Load Assistant Success',
    props<{ assistant: Assistant }>()
);

const all = union({ loadAssistant, loadAssistantFail, loadAssistantSuccess });
export type AllActions = typeof all;
