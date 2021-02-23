import {
    Assistant,
    AssistantCreditEstimate,
    AssistantGoal,
    AssistantSearchStage,
    IncomeSource,
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
export const setGoal = createAction(
    '[Assistant] Set Goal',
    props<{ goal: AssistantGoal; nextStep: boolean }>()
);
export const setSearchStage = createAction(
    '[Assistant] Set Search Stage',
    props<{ searchStage: AssistantSearchStage; nextStep: boolean }>()
);
export const setEstimatedPurchasePrice = createAction(
    '[Assistant] Set Estimated Purchase Price',
    props<{ estimatedPurchasePrice: number; nextStep: boolean }>()
);
export const setDownPayment = createAction(
    '[Assistant] Set Down Payment',
    props<{ downPayment: number; nextStep: boolean }>()
);
export const setEstimatedCreditScore = createAction(
    '[Assistant] Set Estimated Credit Score',
    props<{ estimatedCreditScore: AssistantCreditEstimate; nextStep: boolean }>()
);
export const setIncomeSources = createAction(
    '[Assistant] Set Income Sources',
    props<{ incomeSources: IncomeSource[]; nextStep: boolean }>()
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
    setIncomeSources,
});
export type AllActions = typeof all;
