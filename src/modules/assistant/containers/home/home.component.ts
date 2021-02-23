import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssistantGoal, JourneyName } from '@modules/assistant/models';
import { assistantActions } from '@modules/assistant/store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'rdm-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private store: Store) {}
    ngOnInit() {
        this.store.dispatch(assistantActions.setJourney({ journey: JourneyName.GETTING_STARTED }));
    }
    purchase() {
        this.store.dispatch(
            assistantActions.setGoal({ goal: AssistantGoal.PURCHASE, nextStep: true })
        );
    }
    refinance() {
        this.store.dispatch(
            assistantActions.setGoal({ goal: AssistantGoal.REFINANCE, nextStep: true })
        );
    }
}
