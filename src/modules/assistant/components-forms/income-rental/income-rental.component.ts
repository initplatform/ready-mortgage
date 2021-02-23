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
import { IncomeRentalFormValues, IncomeSourceRental } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-rental',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-rental.component.html',
    styleUrls: ['income-rental.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeRentalComponent,
            multi: true,
        },
    ],
})
export class IncomeRentalComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceRental: IncomeRentalFormValues) => void;
    total = 0;
    incomeRentalForm = this.fb.group({
        address: [undefined, [Validators.required]],
        annualRevenue: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeRentalForm.valueChanges.subscribe(
                (incomeSourceRental: IncomeRentalFormValues) => {
                    if (this.incomeRentalForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceRental));
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

    writeValue(incomeSourceRental: IncomeSourceRental): void {
        if (!incomeSourceRental) {
            return;
        }
        const incomeRentalFormValues: IncomeRentalFormValues = {
            address: incomeSourceRental.address,
            annualRevenue: incomeSourceRental.annualRevenue,
        };
        this.incomeRentalForm.patchValue(incomeRentalFormValues);
        this._calculateTotals(incomeRentalFormValues);
    }
    _calculateTotals(incomeRentalFormValues: IncomeRentalFormValues): IncomeSourceRental {
        this.total = getNumberValue(incomeRentalFormValues.annualRevenue);

        return {
            ...incomeRentalFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceRental: IncomeRentalFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get addressControl() {
        return this.incomeRentalForm.get('address') as FormControl;
    }

    get addressControlValid() {
        return this.addressControl.touched && !this.addressControlInvalid;
    }

    get addressControlInvalid() {
        return this.addressControl.touched && this.addressControl.hasError('required');
    }

    get annualRevenueControl() {
        return this.incomeRentalForm.get('annualRevenue') as FormControl;
    }

    get annualRevenueControlValid() {
        return this.annualRevenueControl.touched && !this.annualRevenueControlInvalid;
    }

    get annualRevenueControlInvalid() {
        return (
            this.annualRevenueControl.touched &&
            (this.annualRevenueControl.hasError('required') ||
                this.annualRevenueControl.hasError('NaN'))
        );
    }
}
