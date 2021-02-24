import { DebtSource } from './debt.model';
import { IncomeSource } from './income.model';

export enum AssistantCreditEstimate {
    'BAD' = 'BAD',
    'POOR' = 'POOR',
    'FAIR' = 'FAIR',
    'GOOD' = 'GOOD',
    'EXCELLENT' = 'EXCELLENT',
}

export class BuyerDetails {
    firstName!: string;
    lastName!: string;
    phone!: string;
    email!: string;
    downPayment!: number;
    estimatedCreditScore!: AssistantCreditEstimate;
    workingWithAgent!: boolean;
    incomeSources: IncomeSource[] = [];
    debtSources: DebtSource[] = [];
}
