import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { journeys } from '@modules/assistant/data';
import { Assistant, JourneyName } from '@modules/assistant/models';
import { JourneyService } from '@modules/assistant/services';
import { assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

interface Steps {
    name: string;
    path: string;
}

@Component({
    selector: 'rdm-steps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './steps.component.html',
    styleUrls: ['steps.component.scss'],
})
export class StepsComponent implements OnInit, OnDestroy {
    @HostBinding('style.display') display = 'none';
    subscription: Subscription = new Subscription();

    assistant!: Assistant;
    steps: Steps[] = [];
    currentJourney!: JourneyName;
    currentPath!: string;

    constructor(
        private store: Store,
        private journeyService: JourneyService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.store
                .select(assistantSelectors.selectAssistant)
                .pipe(distinctUntilKeyChanged('journey'))
                .subscribe((assistant) => {
                    this.assistant = assistant;
                    this._determineSteps();
                })
        );
        this.subscription.add(
            this.journeyService.currentPath$.subscribe((currentPath) => {
                this.currentPath = currentPath;
                this.changeDetectorRef.detectChanges();
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    _determineSteps() {
        const foundJourney = journeys.find((journey) => journey.name === this.assistant.journey);
        if (!foundJourney || !foundJourney.showSteps) {
            this.display = 'none';
            return;
        }
        this.display = 'block';
        this.currentJourney = foundJourney.name;
        this.steps = foundJourney.steps
            .filter((step) => !!step.namedStep)
            .map((step) => ({
                path: step.path,
                name: step.namedStep as string,
            }));
        console.log(this.steps);
    }
}
