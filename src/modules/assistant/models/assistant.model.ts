import { v4 as uuid } from 'uuid';

import { JourneyName } from './journey.model';

export interface AssistantState {
    assistant: Assistant | null;
    loaded: boolean;
    loading: boolean;
}

export enum AssistantGoal {
    'PURCHASE' = 'PURCHASE',
    'REFINANCE' = 'REFINANCE',
}

export enum AssistantCreditEstimate {
    'BAD' = 'BAD',
    'POOR' = 'POOR',
    'FAIR' = 'FAIR',
    'GOOD' = 'GOOD',
    'EXCELLENT' = 'EXCELLENT',
}

export enum AssistantSearchStage {
    'HOME_KNOWN' = 'HOME_KNOWN',
    'HOME_SHOPPING' = 'HOME_SHOPPING',
    'RESEARCH' = 'RESEARCH',
}

export class Assistant {
    id: UUID = uuid();
    journey: JourneyName = JourneyName.GETTING_STARTED;
    goal!: AssistantGoal;
    searchStage!: AssistantSearchStage;
    property: PropertyDetails = new PropertyDetails();
    buyer: BuyerDetails = new BuyerDetails();
}

export class PropertyDetails {
    zipCode!: string;
    estimatedPurchasePrice!: number;
}

export class BuyerDetails {
    firstName!: string;
    lastName!: string;
    phone!: string;
    email!: string;
    downPayment!: number;
    estimatedCreditScore!: AssistantCreditEstimate;
    workingWithAgent!: boolean;
}
