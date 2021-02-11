import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-purpose',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './purpose.component.html',
    styleUrls: ['purpose.component.scss'],
})
export class PurposeComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
