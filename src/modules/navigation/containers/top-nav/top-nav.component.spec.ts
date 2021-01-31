import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from '@common/services';
import { NavigationService } from '@modules/navigation/services';
import { NavigationServiceStub, UtilityServiceStub } from '@testing/stubs';

import { TopNavComponent } from './top-nav.component';

@Component({
    template: `
        <sb-top-nav [someInput]="someInput" (someFunction)="someFunction($event)"></sb-top-nav>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('TopNavComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: TopNavComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let navigationService: NavigationService;
    let utilityService: UtilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, TopNavComponent],
            imports: [NoopAnimationsModule],
            providers: [
                { provide: NavigationService, useValue: NavigationServiceStub },
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

        navigationService = TestBed.inject(NavigationService);
        utilityService = TestBed.inject(UtilityService);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-top-nav')).toEqual(jasmine.anything());
    });
    it('should toggleSideNav', () => {
        spyOn(navigationService, 'toggleSideNav').and.callThrough();
        component.toggleSideNav();
        expect(navigationService.toggleSideNav).toHaveBeenCalled();
    });
});
