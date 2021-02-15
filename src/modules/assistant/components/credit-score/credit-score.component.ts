import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RangeComponent } from '@modules/assistant/components/range/range.component';
import { Assistant, AssistantCreditEstimate } from '@modules/assistant/models';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-credit-score',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './credit-score.component.html',
    styleUrls: ['credit-score.component.scss'],
})
export class CreditScoreComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    assistant!: Assistant;

    constructor(private store: Store) {}

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
    estimatedCreditScore(score: AssistantCreditEstimate) {
        this.store.dispatch(
            assistantActions.setEstimatedCreditScore({
                estimatedCreditScore: score,
            })
        );
    }
}
