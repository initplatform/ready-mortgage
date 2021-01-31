import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-multi-purpose',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './multi-purpose.component.html',
    styleUrls: ['multi-purpose.component.scss'],
})
export class MultiPurposeComponent implements OnInit, AfterViewInit {
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
