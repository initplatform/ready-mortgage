import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RangeComponent } from '@modules/assistant/components/range/range.component';
import { Assistant } from '@modules/assistant/models';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-down-payment',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './down-payment.component.html',
    styleUrls: ['down-payment.component.scss'],
})
export class DownPaymentComponent implements OnInit, OnDestroy {
    @ViewChild('downPayment') downPayment!: RangeComponent;
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
    continue() {
        this.store.dispatch(
            assistantActions.setDownPayment({
                downPayment: this.downPayment.currentValue,
                nextStep: true,
            })
        );
    }
}
