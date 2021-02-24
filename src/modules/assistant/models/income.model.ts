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

export const incomeSourceNames = [
    { name: IncomeSourceName.SALARY, displayName: 'Annual Salary' },
    { name: IncomeSourceName.HOURLY, displayName: 'Hourly Wages' },
    { name: IncomeSourceName.RENTAL, displayName: 'Rental Property' },
    { name: IncomeSourceName.PENSION, displayName: 'Pension' },
    { name: IncomeSourceName.SOCIAL_SECURITY, displayName: 'Social Security' },
    { name: IncomeSourceName.CHILD_SUPPORT, displayName: 'Child Support' },
    { name: IncomeSourceName.ALIMONY, displayName: 'Alimony' },
    { name: IncomeSourceName.OTHER, displayName: 'Other' },
];

export interface IncomeSourceForm {
    incomeSources: IncomeSource[];
}

export interface IncomeSource {
    name: IncomeSourceName;
    dynamicControl: IncomeSourceDynamicControl;
}

export type IncomeSourceDynamicControl =
    | IncomeSourceSalary
    | IncomeSourceHourly
    | IncomeSourceRental
    | IncomeSourcePension
    | IncomeSourceSocialSecurity
    | IncomeSourceChildSupport
    | IncomeSourceAlimony
    | IncomeSourceOther
    | IncomeSourceBase;

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
// Pension
export interface IncomePensionFormValues {
    monthlyAmount: string | number;
}
export interface IncomeSourcePension extends IncomeSourceBase, IncomePensionFormValues {}
// Social Security
export interface IncomeSocialSecurityFormValues {
    monthlyAmount: string | number;
}
export interface IncomeSourceSocialSecurity
    extends IncomeSourceBase,
        IncomeSocialSecurityFormValues {}
// Child Support
export interface IncomeChildSupportFormValues {
    monthlyAmount: string | number;
}
export interface IncomeSourceChildSupport extends IncomeSourceBase, IncomeChildSupportFormValues {}
// Alimony
export interface IncomeAlimonyFormValues {
    monthlyAmount: string | number;
}
export interface IncomeSourceAlimony extends IncomeSourceBase, IncomeAlimonyFormValues {}
// Other
export interface IncomeOtherFormValues {
    description: string;
    annualAmount: string | number;
}
export interface IncomeSourceOther extends IncomeSourceBase, IncomeOtherFormValues {}
