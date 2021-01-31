import { TestBed } from '@angular/core/testing';

import { LandingsService } from './landings.service';

describe('LandingsService', () => {
    let landingsService: LandingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LandingsService],
        });
        landingsService = TestBed.inject(LandingsService);
    });

    describe('getLandings$', () => {
        it('should return Observable<Landings>', () => {
            landingsService.getLandings$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
