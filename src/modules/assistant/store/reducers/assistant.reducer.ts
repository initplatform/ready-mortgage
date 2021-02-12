import { AssistantState } from '@modules/assistant/models';
import { assistantActions } from '@modules/assistant/store/actions';
import { on } from '@ngrx/store';
import { createImmerReducer } from 'ngrx-immer/store';

export const featureKey = 'assistantState';

export const initialState: AssistantState = {
    assistant: null,
    loaded: false,
    loading: false,
};

export const assistantReducer = createImmerReducer(
    initialState,
    on(assistantActions.loadAssistant, (state) => ({ ...state, loading: true })),
    on(assistantActions.loadAssistantFail, (state, { errorMessage }) => ({
        ...state,
        loading: false,
        loaded: false,
    })),
    on(assistantActions.loadAssistantSuccess, (state, { assistant }) => ({
        ...state,
        ...assistant,
        loading: false,
        loaded: true,
    }))
);