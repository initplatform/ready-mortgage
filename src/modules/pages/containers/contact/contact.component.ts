import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-contact',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact.component.html',
    styleUrls: ['contact.component.scss'],
})
export class ContactComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
