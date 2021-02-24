import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-student-loan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-student-loan.component.html',
    styleUrls: ['debt-student-loan.component.scss'],
})
export class DebtStudentLoanComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
