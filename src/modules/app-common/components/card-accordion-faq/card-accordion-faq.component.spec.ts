import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FAQ } from '@common/models';

import { CardAccordionFaqComponent } from './card-accordion-faq.component';

@Component({
    template: `
        <sbpro-card-accordion-faq [faqs]="faqs"></sbpro-card-accordion-faq>
    `,
})
class TestHostComponent {
    faqs: FAQ[] = [
        {
            question: 'TEST_QUESTION',
            answer: 'TEST_ANSWER',
        },
        {
            question: 'TEST_QUESTION',
            answer: 'TEST_ANSWER',
        },
    ];
}

fdescribe('CardAccordionFaqComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: CardAccordionFaqComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, CardAccordionFaqComponent],
            imports: [NoopAnimationsModule],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sbpro-card-accordion-faq')).toEqual(
            jasmine.anything()
        );
    });
});
