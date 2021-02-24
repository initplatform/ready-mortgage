import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-alimony',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-alimony.component.html',
    styleUrls: ['debt-alimony.component.scss'],
})
export class DebtAlimonyComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
