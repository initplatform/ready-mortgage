import {
    Assistant,
    AssistantCreditEstimate,
    AssistantGoal,
    AssistantSearchStage,
    JourneyName,
} from '@modules/assistant/models';
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

export const setJourney = createAction(
    '[Assistant] Set Journey',
    props<{ journey: JourneyName }>()
);
export const setGoal = createAction('[Assistant] Set Goal', props<{ goal: AssistantGoal }>());
export const setSearchStage = createAction(
    '[Assistant] Set Search Stage',
    props<{ searchStage: AssistantSearchStage }>()
);
export const setEstimatedPurchasePrice = createAction(
    '[Assistant] Set Estimated Purchase Price',
    props<{ estimatedPurchasePrice: number }>()
);
export const setDownPayment = createAction(
    '[Assistant] Set Down Payment',
    props<{ downPayment: number }>()
);
export const setEstimatedCreditScore = createAction(
    '[Assistant] Set Estimated Credit Score',
    props<{ estimatedCreditScore: AssistantCreditEstimate }>()
);

const all = union({
    loadAssistant,
    loadAssistantFail,
    loadAssistantSuccess,
    setJourney,
    setGoal,
    setSearchStage,
    setEstimatedPurchasePrice,
    setDownPayment,
    setEstimatedCreditScore,
});
export type AllActions = typeof all;
