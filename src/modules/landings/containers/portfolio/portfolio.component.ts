import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-portfolio',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './portfolio.component.html',
    styleUrls: ['portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
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
