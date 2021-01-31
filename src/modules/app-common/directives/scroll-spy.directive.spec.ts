import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UtilityService } from '@common/services';
import { UtilityServiceStub } from '@testing/stubs';

import { ScrollSpyDirective } from './scroll-spy.directive';

@Component({
    template: '<div sbproScrollSpy param="test"></div>',
})
class TestComponent {}

describe('ScrollSpyDirective', () => {
    let fixture: ComponentFixture<TestComponent>;

    let testComponent: TestComponent;
    let testComponentDE: DebugElement;
    let testComponentNE: Element;

    let utilityService: UtilityService;
    const utilityServiceStub = UtilityServiceStub;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ScrollSpyDirective, TestComponent],
            providers: [{ provide: UtilityService, useValue: new UtilityServiceStub() }],
        }).createComponent(TestComponent);

        fixture.detectChanges();

        testComponent = fixture.componentInstance;
        testComponentDE = fixture.debugElement;
        testComponentNE = testComponentDE.nativeElement;

        utilityService = TestBed.inject(UtilityService);
    });

    it('should have param set to test', () => {
        const directiveInstance = testComponentDE.query(By.directive(ScrollSpyDirective));
        expect(directiveInstance.attributes.param).toBe('test');
    });
});
