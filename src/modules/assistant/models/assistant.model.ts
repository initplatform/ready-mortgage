import { v4 as uuid } from 'uuid';

export interface AssistantState {
    assistant: Assistant | null;
    loaded: boolean;
    loading: boolean;
}

export type AssistantGoal = 'PURCHASE' | 'REFINANCE';
export type AssistantCreditEstimate = 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT';

export class Assistant {
    id: UUID = uuid();
    goal!: AssistantGoal;
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
}
