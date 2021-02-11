import { TestBed } from '@angular/core/testing';

import { AssistantService } from './assistant.service';

describe('AssistantService', () => {
    let assistantService: AssistantService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AssistantService],
        });
        assistantService = TestBed.inject(AssistantService);
    });

    describe('getAssistant$', () => {
        it('should return Observable<Assistant>', () => {
            expect(assistantService).toBeDefined();
        });
    });
});
