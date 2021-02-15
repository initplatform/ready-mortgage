import { Injectable } from '@angular/core';
import { Assistant } from '@modules/assistant/models';
import { AssistantService, IndexedDBService, JourneyService } from '@modules/assistant/services';
import { assistantActions } from '@modules/assistant/store/actions';
import { assistantSelectors } from '@modules/assistant/store/selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AssistantEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private assistantService: AssistantService,
        private journeyService: JourneyService,
        private indexedDBService: IndexedDBService
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

    setData$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    assistantActions.setGoal,
                    assistantActions.setSearchStage,
                    assistantActions.setEstimatedPurchasePrice,
                    assistantActions.setDownPayment,
                    assistantActions.setEstimatedCreditScore
                ),
                concatMap((action) =>
                    of(action).pipe(
                        withLatestFrom(this.store.select(assistantSelectors.selectAssistant))
                    )
                ),
                switchMap(([action, assistant]) => {
                    return from(this.indexedDBService.putAssistant(assistant)).pipe(
                        map(() => {
                            this.journeyService.goToNextStep(assistant);
                        })
                    );
                })
            ),
        { dispatch: false }
    );
}
