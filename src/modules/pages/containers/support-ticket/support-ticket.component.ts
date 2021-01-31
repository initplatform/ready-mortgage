import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-support-ticket',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './support-ticket.component.html',
    styleUrls: ['support-ticket.component.scss'],
})
export class SupportTicketComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
