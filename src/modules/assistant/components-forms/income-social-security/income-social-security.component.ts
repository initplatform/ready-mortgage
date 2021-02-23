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
import {
    IncomeSocialSecurityFormValues,
    IncomeSourceSocialSecurity,
} from '@modules/assistant/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-income-social-security',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-social-security.component.html',
    styleUrls: ['income-social-security.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IncomeSocialSecurityComponent,
            multi: true,
        },
    ],
})
export class IncomeSocialSecurityComponent
    implements AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() index!: number;
    @Output() remove = new EventEmitter<number>();
    subscription: Subscription = new Subscription();
    onChange!: (incomeSourceSocialSecurity: IncomeSocialSecurityFormValues) => void;
    total = 0;
    incomeSocialSecurityForm = this.fb.group({
        monthlyAmount: [undefined, [Validators.required, numberValidator()]],
    });

    constructor(private fb: FormBuilder) {}
    ngAfterViewInit() {
        this.subscription.add(
            this.incomeSocialSecurityForm.valueChanges.subscribe(
                (incomeSourceSocialSecurity: IncomeSocialSecurityFormValues) => {
                    if (this.incomeSocialSecurityForm.status === 'VALID') {
                        this.onChange(this._calculateTotals(incomeSourceSocialSecurity));
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

    writeValue(incomeSourceSocialSecurity: IncomeSourceSocialSecurity): void {
        if (!incomeSourceSocialSecurity) {
            return;
        }
        const incomeSocialSecurityFormValues: IncomeSocialSecurityFormValues = {
            monthlyAmount: incomeSourceSocialSecurity.monthlyAmount,
        };
        this.incomeSocialSecurityForm.patchValue(incomeSocialSecurityFormValues);
        this._calculateTotals(incomeSocialSecurityFormValues);
    }
    _calculateTotals(
        incomeSocialSecurityFormValues: IncomeSocialSecurityFormValues
    ): IncomeSourceSocialSecurity {
        this.total = getNumberValue(incomeSocialSecurityFormValues.monthlyAmount);

        return {
            ...incomeSocialSecurityFormValues,
            total: this.total,
            debtToIncomeTotal: this.total,
        };
    }
    registerOnChange(fn: (incomeSourceSocialSecurity: IncomeSocialSecurityFormValues) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void) {}

    /* Accessor Methods */

    get monthlyAmountControl() {
        return this.incomeSocialSecurityForm.get('monthlyAmount') as FormControl;
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
