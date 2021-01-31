import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from '@common/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalServiceStub, UtilityServiceStub } from '@testing/stubs';

import { LeadCaptureComponent } from './lead-capture.component';

@Component({
    template: `
        <sbpro-lead-capture
            [someInput]="someInput"
            (someFunction)="someFunction($event)"
        ></sbpro-lead-capture>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('LeadCaptureComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: LeadCaptureComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let utilityService: UtilityService;
    const utilityServiceStub = UtilityServiceStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, LeadCaptureComponent],
            imports: [NoopAnimationsModule],
            providers: [
                FormBuilder,
                { provide: NgbModal, useValue: new ModalServiceStub() },
                { provide: UtilityService, useValue: new UtilityServiceStub() },
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
        expect(hostComponentNE.querySelector('sbpro-lead-capture')).toEqual(jasmine.anything());
    });
});
