import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './grid.component.html',
    styleUrls: ['grid.component.scss'],
})
export class GridComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
