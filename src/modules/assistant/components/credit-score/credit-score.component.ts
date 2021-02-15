import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-credit-score',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './credit-score.component.html',
    styleUrls: ['credit-score.component.scss'],
})
export class CreditScoreComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
