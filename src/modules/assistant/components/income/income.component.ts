import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { numberValidator } from '@common/validators';
import { Assistant, IncomeSource, IncomeSourceName } from '@modules/assistant/models';
import { assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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

    incomeForm = this.fb.group({
        incomeSources: new FormArray([]),
    });

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit() {
        this.subscription.add(
            this.store.select(assistantSelectors.selectAssistant).subscribe((assistant) => {
                this.assistant = assistant;
            })
        );
        this.subscription.add(
            this.incomeForm.valueChanges.subscribe((value) => {
                console.log(value);
                if (!value.incomeSources || value.incomeSources.length === 0) {
                    this.totalIncome = 0;
                }
                this.totalIncome = (value.incomeSources as IncomeSource[]).reduce<number>(
                    (previous, current) => {
                        if (typeof current.amount === 'number') {
                            return previous + current.amount;
                        }
                        return parseInt((current.amount as string).replace(/[$,]/g, ''), 10);
                    },
                    0
                );
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    addIncomeSource(incomeSource: IncomeSourceName) {
        this.incomeSources.push(
            this.fb.group({
                name: [incomeSource, Validators.required],
                amount: [0, [Validators.required, numberValidator()]],
            })
        );
        // this.store.dispatch(
        //     assistantActions.setEstimatedCreditScore({
        //         estimatedCreditScore: score,
        //     })
        // );
    }

    get incomeSources() {
        return this.incomeForm.get('incomeSources') as FormArray;
    }
}
