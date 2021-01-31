import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-position-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './position-details.component.html',
    styleUrls: ['position-details.component.scss'],
})
export class PositionDetailsComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
