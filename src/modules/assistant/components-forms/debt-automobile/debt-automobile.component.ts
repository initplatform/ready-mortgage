import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-automobile',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-automobile.component.html',
    styleUrls: ['debt-automobile.component.scss'],
})
export class DebtAutomobileComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
