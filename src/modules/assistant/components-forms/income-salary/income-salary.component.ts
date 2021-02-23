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
import { IncomeSalaryFormValues, IncomeSourceSalary } from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-salary',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-salary.component.html',
    styleUrls: ['income-salary.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeSalaryComponent,
            multi: true,
        },
    ],
})
export class IncomeSalaryComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceSalary: IncomeSalaryFormValues) => void;
    total = 0;
    incomeSalaryForm = this.fb.group({
        salary: [undefined, [Validators.required, numberValidator()]],
        bonus: [undefined, [numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeSalaryForm.valueChanges.subscribe(
                (incomeSourceSalary: IncomeSalaryFormValues) => {
                    if (this.incomeSalaryForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceSalary));
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

    writeValue(incomeSourceSalary: IncomeSourceSalary): void {
        if (!incomeSourceSalary) {
            return;
        }
        const incomeSalaryFormValues: IncomeSalaryFormValues = {
            salary: incomeSourceSalary.salary,
            bonus: incomeSourceSalary.bonus,
        };
        this.incomeSalaryForm.patchValue(incomeSalaryFormValues);
        this._calculateTotals(incomeSalaryFormValues);
    }
    _calculateTotals(incomeSalaryFormValues: IncomeSalaryFormValues): IncomeSourceSalary {
        this.total =
            getNumberValue(incomeSalaryFormValues.salary) +
            getNumberValue(incomeSalaryFormValues.bonus);

        return {
            ...incomeSalaryFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceSalary: IncomeSalaryFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get salaryControl() {
        return this.incomeSalaryForm.get('salary') as FormControl;
    }

    get salaryControlValid() {
        return this.salaryControl.touched && !this.salaryControlInvalid;
    }

    get salaryControlInvalid() {
        return (
            this.salaryControl.touched &&
            (this.salaryControl.hasError('required') || this.salaryControl.hasError('NaN'))
        );
    }

    get bonusControl() {
        return this.incomeSalaryForm.get('bonus') as FormControl;
    }

    get bonusControlValid() {
        return this.bonusControl.touched && !this.bonusControlInvalid;
    }

    get bonusControlInvalid() {
        return (
            this.bonusControl.touched &&
            (this.bonusControl.hasError('required') || this.bonusControl.hasError('NaN'))
        );
    }
}
