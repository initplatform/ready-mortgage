import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-income-rental',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income-rental.component.html',
    styleUrls: ['income-rental.component.scss'],
})
export class IncomeRentalComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
