import { TestBed } from '@angular/core/testing';

import { AssistantGuard } from './assistant.guard';

describe('Assistant Guards', () => {
    let assistantGuard: AssistantGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [AssistantGuard],
        });
        assistantGuard = TestBed.inject(AssistantGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            assistantGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
