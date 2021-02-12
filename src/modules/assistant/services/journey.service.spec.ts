import { TestBed } from '@angular/core/testing';

import { JourneyService } from './journey.service';

describe('JourneyService', () => {
    let journeyService: JourneyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JourneyService],
        });
        journeyService = TestBed.inject(JourneyService);
    });

    describe('getJourney$', () => {
        it('should return Observable<{}}>', () => {
            expect(journeyService).toBeDefined();
        });
    });
});
