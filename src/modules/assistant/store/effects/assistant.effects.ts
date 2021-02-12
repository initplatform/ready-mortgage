import { Injectable } from '@angular/core';
import { Assistant } from '@modules/assistant/models';
import { AssistantService } from '@modules/assistant/services';
import { assistantActions } from '@modules/assistant/store/actions';
// import { assistantSelectors } from '@modules/assistant/store/selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, switchMap } from 'rxjs/operators';

@Injectable()
export class AssistantEffects {
    constructor(private actions$: Actions, private assistantService: AssistantService) {}

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

    // loadAssistantSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(assistantActions.loadAssistantSuccess),
    //         map(({assistant}) => {
    //             // return previewsActions.loadPreviews({ assistantState });
    //         })
    //     )
    // );
}
