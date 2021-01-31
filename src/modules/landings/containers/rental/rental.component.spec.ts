import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoremIpsumService, UtilityService } from '@common/services';
import { UtilityServiceStub } from '@testing/stubs';

import { RentalComponent } from './rental.component';

@Component({
    template: `
        <sbpro-rental [someInput]="someInput" (someFunction)="someFunction($event)"></sbpro-rental>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('RentalComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: RentalComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let utilityService: UtilityService;
    const utilityServiceStub = UtilityServiceStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, RentalComponent],
            imports: [NoopAnimationsModule],
            providers: [
                { provide: UtilityService, useValue: new UtilityServiceStub() },
                LoremIpsumService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        utilityService = TestBed.inject(UtilityService);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sbpro-rental')).toEqual(jasmine.anything());
    });
});
