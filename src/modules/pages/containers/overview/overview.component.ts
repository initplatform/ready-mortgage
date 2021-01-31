import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-overview',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './overview.component.html',
    styleUrls: ['overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
