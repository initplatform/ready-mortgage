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
        assistant,
        loading: false,
        loaded: true,
    })),
    on(assistantActions.setJourney, (state, { journey }) => {
        if (!state.assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }
        state.assistant.journey = journey;
        return state;
    }),
    on(assistantActions.setGoal, (state, { goal }) => {
        if (!state.assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }
        state.assistant.goal = goal;
        return state;
    }),
    on(assistantActions.setSearchStage, (state, { searchStage }) => {
        if (!state.assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }
        state.assistant.searchStage = searchStage;
        return state;
    }),
    on(assistantActions.setEstimatedPurchasePrice, (state, { estimatedPurchasePrice }) => {
        if (!state.assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }
        state.assistant.property.estimatedPurchasePrice = estimatedPurchasePrice;
        return state;
    }),
    on(assistantActions.setDownPayment, (state, { downPayment }) => {
        if (!state.assistant) {
            throw new Error('ASSISTANT_NOT_FOUND');
        }
        state.assistant.buyer.downPayment = downPayment;
        return state;
    })
);
