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
    incomeSources: IncomeSource[] = [];
}

export enum IncomeSourceName {
    'SALARY' = 'SALARY',
    'HOURLY' = 'HOURLY',
    'RENTAL' = 'RENTAL',
    'PENSION' = 'PENSION',
    'SOCIAL_SECURITY' = 'SOCIAL_SECURITY',
    'CHILD_SUPPORT' = 'CHILD_SUPPORT',
    'ALIMONY' = 'ALIMONY',
    'OTHER' = 'OTHER',
}

// export enum IncomeSourceOtherName {
//     'PENSION' = 'PENSION',
//     'SOCIAL_SECURITY' = 'SOCIAL_SECURITY',
//     'CHILD_SUPPORT' = 'CHILD_SUPPORT',
//     'ALIMONY' = 'ALIMONY',
//     'OTHER' = 'OTHER',
// }

export interface IncomeSourceForm {
    incomeSources: IncomeSource[];
}

export interface IncomeSource {
    name: IncomeSourceName;
    dynamicControl: IncomeSourceDynamicControl;
}

export type IncomeSourceDynamicControl = IncomeSourceSalary | IncomeSourceHourly | IncomeSourceBase;

export interface IncomeSourceBase {
    total: number;
    debtToIncomeTotal: number;
}
// Salary
export interface IncomeSalaryFormValues {
    salary: string | number;
    bonus?: string | number;
}
export interface IncomeSourceSalary extends IncomeSourceBase, IncomeSalaryFormValues {}
// Hourly
export interface IncomeHourlyFormValues {
    hourlyRate: string | number;
    hoursPerWeek: string | number;
    weeksPerYear: string | number;
}
export interface IncomeSourceHourly extends IncomeSourceBase, IncomeHourlyFormValues {}
// Rental
export interface IncomeRentalFormValues {
    address: string;
    annualRevenue: string | number;
}
export interface IncomeSourceRental extends IncomeSourceBase, IncomeRentalFormValues {}
