import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-assistant',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './assistant.component.html',
    styleUrls: ['assistant.component.scss'],
})
export class AssistantComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
