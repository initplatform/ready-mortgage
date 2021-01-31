import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-message-center',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './message-center.component.html',
    styleUrls: ['message-center.component.scss'],
})
export class MessageCenterComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
