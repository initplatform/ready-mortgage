import { TestBed } from '@angular/core/testing';

import { LandingsGuard } from './landings.guard';

describe('_Template Module Guards', () => {
    let landingsGuard: LandingsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [LandingsGuard],
        });
        landingsGuard = TestBed.inject(LandingsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            landingsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
