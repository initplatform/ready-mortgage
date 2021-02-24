import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-rent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-rent.component.html',
    styleUrls: ['debt-rent.component.scss'],
})
export class DebtRentComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
