import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JourneyName } from '@modules/assistant/models';
import { assistantActions } from '@modules/assistant/store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'rdm-remaining-mortgage',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './remaining-mortgage.component.html',
    styleUrls: ['remaining-mortgage.component.scss'],
})
export class RemainingMortgageComponent implements OnInit {
    constructor(private store: Store) {}
    ngOnInit() {
        this.store.dispatch(assistantActions.setJourney({ journey: JourneyName.REFINANCE }));
    }
}
