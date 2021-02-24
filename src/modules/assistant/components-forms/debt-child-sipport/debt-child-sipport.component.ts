import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-debt-child-sipport',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt-child-sipport.component.html',
    styleUrls: ['debt-child-sipport.component.scss'],
})
export class DebtChildSipportComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
