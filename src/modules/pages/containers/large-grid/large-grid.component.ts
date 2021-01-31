import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-large-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './large-grid.component.html',
    styleUrls: ['large-grid.component.scss'],
})
export class LargeGridComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
