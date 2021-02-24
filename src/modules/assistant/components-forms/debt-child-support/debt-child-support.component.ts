import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-child-support',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-child-support.component.html',
    styleUrls: ['debt-child-support.component.scss'],
})
export class DebtChildSupportComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
