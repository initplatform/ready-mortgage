import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ErrorGuard implements CanActivate {
    constructor(private activatedRoute: ActivatedRoute) {}

    canActivate(): Observable<boolean> {
        return of(true);
    }
}
