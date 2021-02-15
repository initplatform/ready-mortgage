import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-income',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income.component.html',
    styleUrls: ['income.component.scss'],
})
export class IncomeComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
