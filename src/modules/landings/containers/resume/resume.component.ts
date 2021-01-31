import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-resume',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './resume.component.html',
    styleUrls: ['resume.component.scss'],
})
export class ResumeComponent implements OnInit, AfterViewInit {
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
