import { TestBed } from '@angular/core/testing';

import { PagesGuard } from './pages.guard';

describe('_Template Module Guards', () => {
    let pagesGuard: PagesGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PagesGuard],
        });
        pagesGuard = TestBed.inject(PagesGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            pagesGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
