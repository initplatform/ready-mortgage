import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class PagesService {
    constructor() {}

    getPages$(): Observable<{}> {
        return of({});
    }
}
