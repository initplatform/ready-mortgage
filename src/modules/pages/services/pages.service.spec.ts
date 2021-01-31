import { TestBed } from '@angular/core/testing';

import { PagesService } from './pages.service';

describe('PagesService', () => {
    let pagesService: PagesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PagesService],
        });
        pagesService = TestBed.inject(PagesService);
    });

    describe('getPages$', () => {
        it('should return Observable<Pages>', () => {
            pagesService.getPages$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
