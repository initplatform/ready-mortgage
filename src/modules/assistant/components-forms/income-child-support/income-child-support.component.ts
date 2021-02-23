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
import { IncomeChildSupportFormValues, IncomeSourceChildSupport } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-child-support',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-child-support.component.html',
    styleUrls: ['income-child-support.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeChildSupportComponent,
            multi: true,
        },
    ],
})
export class IncomeChildSupportComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceChildSupport: IncomeChildSupportFormValues) => void;
    total = 0;
    incomeChildSupportForm = this.fb.group({
        monthlyAmount: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeChildSupportForm.valueChanges.subscribe(
                (incomeSourceChildSupport: IncomeChildSupportFormValues) => {
                    if (this.incomeChildSupportForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceChildSupport));
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

    writeValue(incomeSourceChildSupport: IncomeSourceChildSupport): void {
        if (!incomeSourceChildSupport) {
            return;
        }
        const incomeChildSupportFormValues: IncomeChildSupportFormValues = {
            monthlyAmount: incomeSourceChildSupport.monthlyAmount,
        };
        this.incomeChildSupportForm.patchValue(incomeChildSupportFormValues);
        this._calculateTotals(incomeChildSupportFormValues);
    }
    _calculateTotals(
        incomeChildSupportFormValues: IncomeChildSupportFormValues
    ): IncomeSourceChildSupport {
        this.total = getNumberValue(incomeChildSupportFormValues.monthlyAmount);

        return {
            ...incomeChildSupportFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceChildSupport: IncomeChildSupportFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get monthlyAmountControl() {
        return this.incomeChildSupportForm.get('monthlyAmount') as FormControl;
    }

    get monthlyAmountControlValid() {
        return this.monthlyAmountControl.touched && !this.monthlyAmountControlInvalid;
    }

    get monthlyAmountControlInvalid() {
        return (
            this.monthlyAmountControl.touched &&
            (this.monthlyAmountControl.hasError('required') ||
                this.monthlyAmountControl.hasError('NaN'))
        );
    }
}
