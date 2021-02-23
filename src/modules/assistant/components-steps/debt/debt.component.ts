import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt.component.html',
    styleUrls: ['debt.component.scss'],
})
export class DebtComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
