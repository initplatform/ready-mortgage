import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-graphic-signup',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './graphic-signup.component.html',
    styleUrls: ['graphic-signup.component.scss'],
})
export class GraphicSignupComponent implements OnInit, AfterViewInit {
    constructor(private utilityService: UtilityService) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.utilityService.AOS.init({
            disable: 'mobile',
            duration: 600,
            once: true,
        });
    }
}
