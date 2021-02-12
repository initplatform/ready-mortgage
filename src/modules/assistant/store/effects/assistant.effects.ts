import { Injectable } from '@angular/core';
import { Assistant } from '@modules/assistant/models';
import { AssistantService, JourneyService } from '@modules/assistant/services';
import { assistantActions } from '@modules/assistant/store/actions';
import { assistantSelectors } from '@modules/assistant/store/selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AssistantEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private assistantService: AssistantService,
        private journeyService: JourneyService
    ) {}

    loadAssistant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assistantActions.loadAssistant),
            switchMap(() => {
                return this.assistantService
                    .loadAssistant$()
                    .pipe(
                        concatMap((assistant: Assistant) => [
                            assistantActions.loadAssistantSuccess({ assistant }),
                        ])
                    );
            })
        )
    );

    setGoal$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(assistantActions.setGoal, assistantActions.setSearchStage),
                concatMap((action) =>
                    of(action).pipe(
                        withLatestFrom(this.store.select(assistantSelectors.selectAssistant))
                    )
                ),
                map(([action, assistant]) => {
                    this.journeyService.goToNextStep(assistant);
                })
            ),
        { dispatch: false }
    );
}
