import {
    Assistant,
    AssistantGoal,
    AssistantSearchStage,
    Journey,
    JourneyName,
} from '@modules/assistant/models';

export const journeys: Journey[] = [
    {
        name: JourneyName.GETTING_STARTED,
        steps: [
            {
                path: '/assistant',
                branch: (assistant: Assistant) => {
                    if (assistant.goal === AssistantGoal.REFINANCE) {
                        return '/assistant/remaining-mortgage';
                    }
                },
            },
            {
                path: '/assistant/purchase-stage',
            },
        ],
    },
    {
        name: JourneyName.REFINANCE,
        steps: [
            {
                path: '/assistant',
            },
            {
                path: '/assistant/remaining-mortgage',
            },
        ],
    },
    {
        name: JourneyName.PURCHASE_HOME_KNOWN,
        steps: [
            {
                path: '/assistant/purchase-stage',
                branch: (assistant: Assistant) => {
                    if (assistant.searchStage === AssistantSearchStage.HOME_KNOWN) {
                        return '/assistant/known-home-price';
                    }
                },
            },
            {
                path: '/assistant/remaining-mortgage',
            },
        ],
    },
];
