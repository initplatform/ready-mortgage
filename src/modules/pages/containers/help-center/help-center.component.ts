import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-help-center',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './help-center.component.html',
    styleUrls: ['help-center.component.scss'],
})
export class HelpCenterComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
