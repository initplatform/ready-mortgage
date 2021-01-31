import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-project',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './project.component.html',
    styleUrls: ['project.component.scss'],
})
export class ProjectComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
