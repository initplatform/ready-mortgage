import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    Assistant,
    IncomeSource,
    IncomeSourceDynamicControl,
    IncomeSourceForm,
    IncomeSourceName,
    IncomeSourceSalary,
} from '@modules/assistant/models';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import debounce from 'just-debounce';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'rdm-income',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income.component.html',
    styleUrls: ['income.component.scss'],
})
export class IncomeComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    assistant!: Assistant;
    totalIncome!: number;
    incomeSourceNames = [
        { name: IncomeSourceName.SALARY, displayName: 'Annual Salary' },
        { name: IncomeSourceName.HOURLY, displayName: 'Hourly Wages' },
        { name: IncomeSourceName.RENTAL, displayName: 'Rental Property' },
        { name: IncomeSourceName.PENSION, displayName: 'Pension' },
        { name: IncomeSourceName.SOCIAL_SECURITY, displayName: 'Social Security' },
        { name: IncomeSourceName.CHILD_SUPPORT, displayName: 'Child Support' },
        { name: IncomeSourceName.ALIMONY, displayName: 'Alimony' },
        { name: IncomeSourceName.OTHER, displayName: 'Other' },
    ];
    incomeForm = this.fb.group({
        incomeSources: new FormArray([]),
    });

    dispatch = debounce((incomeSources: IncomeSource[]) => {
        this.store.dispatch(
            assistantActions.setIncomeSources({
                incomeSources,
                nextStep: false,
            })
        );
    }, 500);
    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit() {
        this.store
            .select(assistantSelectors.selectAssistant)
            .pipe(take(1))
            .subscribe((assistant) => {
                this.assistant = assistant;
                if (this.assistant.buyer.incomeSources.length > 0) {
                    this.assistant.buyer.incomeSources.forEach((incomeSource) => {
                        this.addIncomeSource(incomeSource.name, incomeSource.dynamicControl);
                    });
                    this._setTotalIncome(this.assistant.buyer.incomeSources);
                }
            });

        this.subscription.add(
            this.incomeForm.valueChanges.subscribe((value: IncomeSourceForm) => {
                console.log(value);
                // Calculate total total
                this._setTotalIncome(value.incomeSources);
                this.dispatch(value.incomeSources);
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    _setTotalIncome(incomeSources: IncomeSource[]) {
        this.totalIncome = incomeSources.reduce<number>((previous, current) => {
            return previous + current.dynamicControl.total;
        }, 0);
    }
    removeIncomeSource(index: number) {
        this.incomeSources.removeAt(index);
    }
    addIncomeSource(incomeSource: IncomeSourceName, dynamicControl?: IncomeSourceDynamicControl) {
        if (!dynamicControl) {
            dynamicControl = { total: 0, debtToIncomeTotal: 0 };
        }
        this.incomeSources.push(
            this.fb.group({
                name: [incomeSource, Validators.required],
                dynamicControl: [dynamicControl, []],
            })
        );
    }

    get incomeSources() {
        return this.incomeForm.get('incomeSources') as FormArray;
    }
}
