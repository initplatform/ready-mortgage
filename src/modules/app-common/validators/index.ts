import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const numberValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            // Don't error since the required error will throw
            return null;
        }
        if (typeof control.value === 'number') {
            return null;
        }
        const testResults = parseInt(control.value.replace(/[$,]/g, ''), 10);
        if (!isNaN(testResults)) {
            return null;
        }
        return { NaN: true };
    };
};

export const getNumberValue = (value: string | number | undefined): number => {
    if (!value) {
        return 0;
    }
    if (typeof value === 'number') {
        return value;
    }
    if (value === '') {
        return 0;
    }
    if ((value as string).match(/\./)) {
        return parseFloat((value as string).replace(/[$,]/g, ''));
    }
    return parseInt((value as string).replace(/[$,]/g, ''), 10);
};
