import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-credit-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-credit-cards.component.html',
    styleUrls: ['debt-credit-cards.component.scss'],
})
export class DebtCreditCardsComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
