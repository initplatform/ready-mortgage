import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-other',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-other.component.html',
    styleUrls: ['debt-other.component.scss'],
})
export class DebtOtherComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
