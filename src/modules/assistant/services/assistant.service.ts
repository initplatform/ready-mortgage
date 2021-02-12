import { Injectable } from '@angular/core';
import { Assistant } from '@modules/assistant/models';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { IndexedDBService } from './indexed-db.service';

@Injectable()
export class AssistantService {
    constructor(private indexedDBService: IndexedDBService) {}

    loadAssistant$(): Observable<Assistant> {
        return this.indexedDBService.assistant$.pipe(take(1));
    }
}
