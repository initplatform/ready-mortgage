import { TestBed } from '@angular/core/testing';

import { IndexedDBService } from './indexed-db.service';

describe('IndexedDBService', () => {
    let indexedDbService: IndexedDBService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IndexedDBService],
        });
        indexedDbService = TestBed.inject(IndexedDBService);
    });

    describe('getIndexedDb$', () => {
        it('should return Observable<{}}>', () => {
            indexedDbService.getIndexedDb$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
