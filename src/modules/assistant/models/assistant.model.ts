import { v4 as uuid } from 'uuid';

import { BuyerDetails } from './buyer.model';
import { JourneyName } from './journey.model';
import { PropertyDetails } from './property.model';

export interface AssistantState {
    assistant: Assistant | null;
    loaded: boolean;
    loading: boolean;
}

export enum AssistantGoal {
    'PURCHASE' = 'PURCHASE',
    'REFINANCE' = 'REFINANCE',
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
