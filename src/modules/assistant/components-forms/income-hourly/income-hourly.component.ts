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
import { IncomeHourlyFormValues, IncomeSourceHourly } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-hourly',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-hourly.component.html',
    styleUrls: ['income-hourly.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeHourlyComponent,
            multi: true,
        },
    ],
})
export class IncomeHourlyComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceHourly: IncomeHourlyFormValues) => void;
    total = 0;
    incomeHourlyForm = this.fb.group({
        hourlyRate: [undefined, [Validators.required, numberValidator()]],
        hoursPerWeek: [undefined, [Validators.required, numberValidator()]],
        weeksPerYear: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeHourlyForm.valueChanges.subscribe(
                (incomeSourceHourly: IncomeHourlyFormValues) => {
                    if (this.incomeHourlyForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceHourly));
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

    writeValue(incomeSourceHourly: IncomeSourceHourly): void {
        if (!incomeSourceHourly) {
            return;
        }
        const incomeHourlyFormValues: IncomeHourlyFormValues = {
            hourlyRate: incomeSourceHourly.hourlyRate,
            hoursPerWeek: incomeSourceHourly.hoursPerWeek,
            weeksPerYear: incomeSourceHourly.weeksPerYear,
        };
        this.incomeHourlyForm.patchValue(incomeHourlyFormValues);
        this._calculateTotals(incomeHourlyFormValues);
    }
    _calculateTotals(incomeHourlyFormValues: IncomeHourlyFormValues): IncomeSourceHourly {
        this.total =
            getNumberValue(incomeHourlyFormValues.hourlyRate) *
            getNumberValue(incomeHourlyFormValues.hoursPerWeek) *
            getNumberValue(incomeHourlyFormValues.weeksPerYear);

        return {
            ...incomeHourlyFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceHourly: IncomeHourlyFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get hourlyRateControl() {
        return this.incomeHourlyForm.get('hourlyRate') as FormControl;
    }

    get hourlyRateControlValid() {
        return this.hourlyRateControl.touched && !this.hourlyRateControlInvalid;
    }

    get hourlyRateControlInvalid() {
        return (
            this.hourlyRateControl.touched &&
            (this.hourlyRateControl.hasError('required') || this.hourlyRateControl.hasError('NaN'))
        );
    }

    get hoursPerWeekControl() {
        return this.incomeHourlyForm.get('hoursPerWeek') as FormControl;
    }

    get hoursPerWeekControlValid() {
        return this.hoursPerWeekControl.touched && !this.hoursPerWeekControlInvalid;
    }

    get hoursPerWeekControlInvalid() {
        return (
            this.hoursPerWeekControl.touched &&
            (this.hoursPerWeekControl.hasError('required') ||
                this.hoursPerWeekControl.hasError('NaN'))
        );
    }

    get weeksPerYearControl() {
        return this.incomeHourlyForm.get('weeksPerYear') as FormControl;
    }

    get weeksPerYearControlValid() {
        return this.weeksPerYearControl.touched && !this.weeksPerYearControlInvalid;
    }

    get weeksPerYearControlInvalid() {
        return (
            this.weeksPerYearControl.touched &&
            (this.weeksPerYearControl.hasError('required') ||
                this.weeksPerYearControl.hasError('NaN'))
        );
    }
}
