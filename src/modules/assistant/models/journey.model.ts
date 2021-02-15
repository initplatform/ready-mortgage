import { Assistant } from './assistant.model';

export enum JourneyName {
    'GETTING_STARTED' = 'GETTING_STARTED',
    'PURCHASE_HOME_KNOWN' = 'PURCHASE_HOME_KNOWN',
    'PURCHASE_HOME_SHOPPING' = 'PURCHASE_HOME_SHOPPING',
    'PURCHASE_RESEARCH' = 'PURCHASE_RESEARCH',
    'REFINANCE' = 'REFINANCE',
}

export interface JourneyStep {
    path: string;
    branch?: (assistant: Assistant) => string | undefined;
    namedStep?: string;
}
export interface Journey {
    name: JourneyName;
    showSteps: boolean;
    steps: JourneyStep[];
}
