import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssistantSearchStage, JourneyName } from '@modules/assistant/models';
import { assistantActions } from '@modules/assistant/store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'rdm-purchase-stage',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './purchase-stage.component.html',
    styleUrls: ['purchase-stage.component.scss'],
})
export class PurchaseStageComponent implements OnInit {
    constructor(private store: Store) {}
    ngOnInit() {
        this.store.dispatch(assistantActions.setJourney({ journey: JourneyName.GETTING_STARTED }));
    }
    homeKnown() {
        this.store.dispatch(
            assistantActions.setJourney({ journey: JourneyName.PURCHASE_HOME_KNOWN })
        );
        this.store.dispatch(
            assistantActions.setSearchStage({ searchStage: AssistantSearchStage.HOME_KNOWN })
        );
    }
    homeShopping() {
        this.store.dispatch(
            assistantActions.setJourney({ journey: JourneyName.PURCHASE_HOME_SHOPPING })
        );
        this.store.dispatch(
            assistantActions.setSearchStage({ searchStage: AssistantSearchStage.HOME_SHOPPING })
        );
    }
    research() {
        this.store.dispatch(
            assistantActions.setJourney({ journey: JourneyName.PURCHASE_RESEARCH })
        );
        this.store.dispatch(
            assistantActions.setSearchStage({ searchStage: AssistantSearchStage.RESEARCH })
        );
    }
}
