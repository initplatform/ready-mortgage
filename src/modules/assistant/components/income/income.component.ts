import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Assistant, AssistantCreditEstimate, IncomeSourceName } from '@modules/assistant/models';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
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
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    addIncomeSource(incomeSource: IncomeSourceName) {
        this.incomeSources.push(
            this.fb.group({
                name: [incomeSource, Validators.required],
                amount: [0, [Validators.required, Validators.email]],
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
