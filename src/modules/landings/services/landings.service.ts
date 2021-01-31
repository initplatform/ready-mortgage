import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class LandingsService {
    constructor() {}

    getLandings$(): Observable<{}> {
        return of({});
    }
}
