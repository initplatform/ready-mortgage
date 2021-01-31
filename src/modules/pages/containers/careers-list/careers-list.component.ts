import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-careers-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './careers-list.component.html',
    styleUrls: ['careers-list.component.scss'],
})
export class CareersListComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
