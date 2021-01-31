import { TestBed } from '@angular/core/testing';

import { LoremIpsumService } from './lorem-ipsum.service';

describe('LoremIpsumService', () => {
    let loremIpsumService: LoremIpsumService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoremIpsumService],
        });
        loremIpsumService = TestBed.inject(LoremIpsumService);
    });

    describe('getLoremIpsum$', () => {
        it('should return a string of lorem ipsum', () => {
            expect(loremIpsumService.lorem()).toBeDefined();
        });
    });
});
