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
        showSteps: false,
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
        showSteps: false,
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
        showSteps: true,
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
                path: '/assistant/known-home-price',
                namedStep: 'Home Price',
            },
            {
                path: '/assistant/down-payment',
                namedStep: 'Down Payment',
            },
            {
                path: '/assistant/credit-score',
                namedStep: 'Credit Score',
            },
            {
                path: '/assistant/income',
                namedStep: 'Income',
            },
            {
                path: '/assistant/debt',
                namedStep: 'Debt',
            },
            {
                path: '/assistant/summary',
                namedStep: 'Summary',
            },
        ],
    },
];
