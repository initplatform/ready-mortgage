import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-time-share',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-time-share.component.html',
    styleUrls: ['debt-time-share.component.scss'],
})
export class DebtTimeShareComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
