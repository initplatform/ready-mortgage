import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-team',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './team.component.html',
    styleUrls: ['team.component.scss'],
})
export class TeamComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
