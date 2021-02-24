import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-personal-loan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-personal-loan.component.html',
    styleUrls: ['debt-personal-loan.component.scss'],
})
export class DebtPersonalLoanComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
