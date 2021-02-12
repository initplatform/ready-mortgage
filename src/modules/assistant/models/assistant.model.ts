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
    property: PropertyDetails | null = new PropertyDetails();
    buyer: BuyerDetails | null = new BuyerDetails();
}

export class PropertyDetails {
    zipCode!: string;
    estimatedPrice!: number;
}

export class BuyerDetails {
    firstName!: string;
    lastName!: string;
    phone!: string;
    email!: string;
    downPayment!: number;
    estimatedCredit!: AssistantCreditEstimate;
    workingWithAgent!: boolean;
}
