import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AssistantService {
    constructor() {}

    getAssistant$(): Observable<{}> {
        return of({});
    }

}
