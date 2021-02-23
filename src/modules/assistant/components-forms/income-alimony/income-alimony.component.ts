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
import { IncomeAlimonyFormValues, IncomeSourceAlimony } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-alimony',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-alimony.component.html',
    styleUrls: ['income-alimony.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeAlimonyComponent,
            multi: true,
        },
    ],
})
export class IncomeAlimonyComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceAlimony: IncomeAlimonyFormValues) => void;
    total = 0;
    incomeAlimonyForm = this.fb.group({
        monthlyAmount: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeAlimonyForm.valueChanges.subscribe(
                (incomeSourceAlimony: IncomeAlimonyFormValues) => {
                    if (this.incomeAlimonyForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceAlimony));
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

    writeValue(incomeSourceAlimony: IncomeSourceAlimony): void {
        if (!incomeSourceAlimony) {
            return;
        }
        const incomeAlimonyFormValues: IncomeAlimonyFormValues = {
            monthlyAmount: incomeSourceAlimony.monthlyAmount,
        };
        this.incomeAlimonyForm.patchValue(incomeAlimonyFormValues);
        this._calculateTotals(incomeAlimonyFormValues);
    }
    _calculateTotals(incomeAlimonyFormValues: IncomeAlimonyFormValues): IncomeSourceAlimony {
        this.total = getNumberValue(incomeAlimonyFormValues.monthlyAmount);

        return {
            ...incomeAlimonyFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceAlimony: IncomeAlimonyFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get monthlyAmountControl() {
        return this.incomeAlimonyForm.get('monthlyAmount') as FormControl;
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
