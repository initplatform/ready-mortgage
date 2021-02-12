import { Injectable } from '@angular/core';
import { Assistant } from '@modules/assistant/models';
import { Observable, of } from 'rxjs';

@Injectable()
export class AssistantService {
    constructor() {}

    loadAssistant$(): Observable<Assistant> {
        return of({} as Assistant);
    }
}
