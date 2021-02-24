import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormControl,
    NG_VALUE_ACCESSOR,
    Validators,
} from '@angular/forms';
import { getNumberValue, numberValidator } from '@common/validators';
import { DebtMortgageFormValues, DebtSourceMortgage } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-debt-mortgage',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-mortgage.component.html',
    styleUrls: ['debt-mortgage.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DebtMortgageComponent,
            multi: true,
        },
    ],
})
export class DebtMortgageComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (debtSourceMortgage: DebtMortgageFormValues) => void;
    total = 0;
    debtMortgageForm = this.fb.group({
        monthlyPayment: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.debtMortgageForm.valueChanges.subscribe(
                (debtSourceMortgage: DebtMortgageFormValues) => {
                    if (this.debtMortgageForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(debtSourceMortgage));
                    }
                }
            )
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    _remove() {
        this.remove.emit(this.index);
    }
    /* ControlValueAccessor Methods */

    writeValue(debtSourceMortgage: DebtSourceMortgage): void {
        if (!debtSourceMortgage) {
            return;
        }
        const debtMortgageFormValues: DebtMortgageFormValues = {
            monthlyPayment: debtSourceMortgage.monthlyPayment,
        };
        this.debtMortgageForm.patchValue(debtMortgageFormValues);
        this._calculateTotals(debtMortgageFormValues);
    }
    _calculateTotals(debtMortgageFormValues: DebtMortgageFormValues): DebtSourceMortgage {
        this.total = getNumberValue(debtMortgageFormValues.monthlyPayment);

        return {
            ...debtMortgageFormValues,
            total: this.total,
            incomeToDebtTotal: this.total,
        };
    }
    registerOnChange(fn: (debtSourceMortgage: DebtMortgageFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get monthlyPaymentControl() {
        return this.debtMortgageForm.get('monthlyPayment') as FormControl;
    }

    get monthlyPaymentControlValid() {
        return this.monthlyPaymentControl.touched && !this.monthlyPaymentControlInvalid;
    }

    get monthlyPaymentControlInvalid() {
        return (
            this.monthlyPaymentControl.touched &&
            (this.monthlyPaymentControl.hasError('required') ||
                this.monthlyPaymentControl.hasError('NaN'))
        );
    }
}
