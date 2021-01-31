import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-directory',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './directory.component.html',
    styleUrls: ['directory.component.scss'],
})
export class DirectoryComponent implements OnInit, AfterViewInit {
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
