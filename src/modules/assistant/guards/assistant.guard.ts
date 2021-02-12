import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IndexedDBService } from '@modules/assistant/services';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class AssistantGuard implements CanActivate {
    constructor(private store: Store<{}>, private indexedDBService: IndexedDBService) {}

    canActivate(): Observable<boolean> {
        console.log('asd');

        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        // Wait until indexedDB is inited before loading store
        return this.indexedDBService.inited$
            .pipe(
                filter((inited) => inited),
                switchMap(() =>
                    combineLatest([
                        this.store.pipe(
                            select(assistantSelectors.selectAssistantLoaded),
                            tap((loaded) => {
                                if (!loaded) {
                                    this.store.dispatch(assistantActions.loadAssistant());
                                }
                            }),
                            filter((loaded) => loaded),
                            take(1)
                        ),
                    ])
                )
            )

            .pipe(switchMap(() => of(true)));
    }
}
