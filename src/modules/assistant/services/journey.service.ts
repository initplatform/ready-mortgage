import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { journeys } from '@modules/assistant/data';
import { Assistant } from '@modules/assistant/models';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class JourneyService {
    private _currentPath$ = new ReplaySubject<string>(1);
    private history: string[] = [];

    constructor(private router: Router, private store: Store) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects);
                console.log(event.urlAfterRedirects);
                this._currentPath$.next(event.urlAfterRedirects);
            }
        });
    }

    goToNextStep(assistant: Assistant) {
        const currentPath = this.currentPath();
        const currentJourney = assistant.journey;
        const foundJourney = journeys.find((journey) => journey.name === currentJourney);
        if (!foundJourney) {
            throw new Error(`JOURNEY_NOT_FOUND: ${currentJourney}`);
        }
        const foundStepIndex = foundJourney.steps.findIndex((step) => step.path === currentPath);
        if (foundStepIndex === -1) {
            throw new Error(`JOURNEY_STEP_NOT_FOUND: ${currentJourney} : ${currentPath}`);
        }
        const foundStep = foundJourney.steps[foundStepIndex];
        if (foundStep.branch) {
            const branchResult = foundStep.branch(assistant);
            if (branchResult) {
                return this.router.navigateByUrl(branchResult);
            }
        }
        const nextStep = foundJourney.steps[foundStepIndex + 1];
        if (!nextStep) {
            throw new Error('REACHED_UNEXPECTED_END_OF_JOURNEY');
        }
        this.router.navigateByUrl(nextStep.path);
    }

    currentPath() {
        const urlTree = this.router.parseUrl(this.router.url);
        urlTree.queryParams = {};
        return urlTree.toString();
    }
    get currentPath$() {
        return this._currentPath$;
    }
}
