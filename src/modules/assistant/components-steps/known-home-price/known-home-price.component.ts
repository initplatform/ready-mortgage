import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RangeComponent } from '@modules/assistant/components/range/range.component';
import { Assistant } from '@modules/assistant/models';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-known-home-price',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './known-home-price.component.html',
    styleUrls: ['known-home-price.component.scss'],
})
export class KnownHomePriceComponent implements OnInit, OnDestroy {
    @ViewChild('homePrice') homePrice!: RangeComponent;
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
            assistantActions.setEstimatedPurchasePrice({
                estimatedPurchasePrice: this.homePrice.currentValue,
                nextStep: true,
            })
        );
    }
}
