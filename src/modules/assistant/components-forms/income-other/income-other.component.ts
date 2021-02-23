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
import { IncomeOtherFormValues, IncomeSourceOther } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-other',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-other.component.html',
    styleUrls: ['income-other.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeOtherComponent,
            multi: true,
        },
    ],
})
export class IncomeOtherComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceOther: IncomeOtherFormValues) => void;
    total = 0;
    incomeOtherForm = this.fb.group({
        description: [undefined, [Validators.required]],
        annualAmount: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeOtherForm.valueChanges.subscribe(
                (incomeSourceOther: IncomeOtherFormValues) => {
                    if (this.incomeOtherForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceOther));
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

    writeValue(incomeSourceOther: IncomeSourceOther): void {
        if (!incomeSourceOther) {
            return;
        }
        const incomeOtherFormValues: IncomeOtherFormValues = {
            description: incomeSourceOther.description,
            annualAmount: incomeSourceOther.annualAmount,
        };
        this.incomeOtherForm.patchValue(incomeOtherFormValues);
        this._calculateTotals(incomeOtherFormValues);
    }
    _calculateTotals(incomeOtherFormValues: IncomeOtherFormValues): IncomeSourceOther {
        this.total = getNumberValue(incomeOtherFormValues.annualAmount);

        return {
            ...incomeOtherFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceOther: IncomeOtherFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get descriptionControl() {
        return this.incomeOtherForm.get('description') as FormControl;
    }

    get descriptionControlValid() {
        return this.descriptionControl.touched && !this.descriptionControlInvalid;
    }

    get descriptionControlInvalid() {
        return this.descriptionControl.touched && this.descriptionControl.hasError('required');
    }

    get annualAmountControl() {
        return this.incomeOtherForm.get('annualAmount') as FormControl;
    }

    get annualAmountControlValid() {
        return this.annualAmountControl.touched && !this.annualAmountControlInvalid;
    }

    get annualAmountControlInvalid() {
        return (
            this.annualAmountControl.touched &&
            (this.annualAmountControl.hasError('required') ||
                this.annualAmountControl.hasError('NaN'))
        );
    }
}
