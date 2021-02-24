export enum DebtSourceName {
    'MORTGAGE' = 'MORTGAGE',
    'RENT' = 'RENT',
    'AUTOMOBILE' = 'AUTOMOBILE',
    'STUDENT_LOAN' = 'STUDENT_LOAN',
    'CREDIT_CARDS' = 'CREDIT_CARDS',
    'TIME_SHARE' = 'TIME_SHARE',
    'PERSONAL_LOAN' = 'PERSONAL_LOAN',
    'CHILD_SUPPORT' = 'CHILD_SUPPORT',
    'ALIMONY' = 'ALIMONY',
    'OTHER' = 'OTHER',
}

export const debtSourceNames = [
    { name: DebtSourceName.MORTGAGE, displayName: 'Mortgage' },
    { name: DebtSourceName.RENT, displayName: 'Rent' },
    { name: DebtSourceName.AUTOMOBILE, displayName: 'Automobile' },
    { name: DebtSourceName.STUDENT_LOAN, displayName: 'Student Loan' },
    { name: DebtSourceName.CREDIT_CARDS, displayName: 'Credit Cards' },
    { name: DebtSourceName.TIME_SHARE, displayName: 'Time Share' },
    { name: DebtSourceName.PERSONAL_LOAN, displayName: 'Personal Loan' },
    { name: DebtSourceName.CHILD_SUPPORT, displayName: 'Child Support' },
    { name: DebtSourceName.ALIMONY, displayName: 'Alimony' },
    { name: DebtSourceName.OTHER, displayName: 'Other' },
];

export interface DebtSourceForm {
    debtSources: DebtSource[];
}

export interface DebtSource {
    name: DebtSourceName;
    dynamicControl: DebtSourceDynamicControl;
}

export type DebtSourceDynamicControl =
    | DebtSourceMortgage
    // | DebtSourceHourly
    // | DebtSourceRental
    // | DebtSourcePension
    // | DebtSourceSocialSecurity
    // | DebtSourceChildSupport
    // | DebtSourceAlimony
    // | DebtSourceOther
    | DebtSourceBase;

export interface DebtSourceBase {
    total: number;
    incomeToDebtTotal: number;
}

// Mortgage
export interface DebtMortgageFormValues {
    monthlyPayment: string | number;
    realStateTaxes?: string | number;
    homeOwnersInsurance?: string | number;
    hoaDues?: string | number;
}
export interface DebtSourceMortgage extends DebtSourceBase, DebtMortgageFormValues {}
