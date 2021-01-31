import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-layout-landing',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-landing.component.html',
    styleUrls: ['layout-landing.component.scss'],
})
export class LayoutLandingComponent implements OnInit {
    @Input() footerClasses = 'bg-light footer-light';
    constructor() {}
    ngOnInit() {}
}
