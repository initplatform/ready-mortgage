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
import { IncomePensionFormValues, IncomeSourcePension } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-pension',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-pension.component.html',
    styleUrls: ['income-pension.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomePensionComponent,
            multi: true,
        },
    ],
})
export class IncomePensionComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourcePension: IncomePensionFormValues) => void;
    total = 0;
    incomePensionForm = this.fb.group({
        monthlyAmount: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomePensionForm.valueChanges.subscribe(
                (incomeSourcePension: IncomePensionFormValues) => {
                    if (this.incomePensionForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourcePension));
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

    writeValue(incomeSourcePension: IncomeSourcePension): void {
        if (!incomeSourcePension) {
            return;
        }
        const incomePensionFormValues: IncomePensionFormValues = {
            monthlyAmount: incomeSourcePension.monthlyAmount,
        };
        this.incomePensionForm.patchValue(incomePensionFormValues);
        this._calculateTotals(incomePensionFormValues);
    }
    _calculateTotals(incomePensionFormValues: IncomePensionFormValues): IncomeSourcePension {
        this.total = getNumberValue(incomePensionFormValues.monthlyAmount);

        return {
            ...incomePensionFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourcePension: IncomePensionFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get monthlyAmountControl() {
        return this.incomePensionForm.get('monthlyAmount') as FormControl;
    }

    get monthlyAmountControlValid() {
        return this.monthlyAmountControl.touched && !this.monthlyAmountControlInvalid;
    }

    get monthlyAmountControlInvalid() {
        return (
            this.monthlyAmountControl.touched &&
            (this.monthlyAmountControl.hasError('required') || this.monthlyAmountControl.hasError('NaN'))
        );
    }

}
