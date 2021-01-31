import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Placement } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sbpro-dropdown',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dropdown.component.html',
    styleUrls: ['dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
    @Input() style: 'icon' | 'text' = 'icon';
    @Input() background!: string;
    @Input() color!: string;
    @Input() placement: Placement = 'bottom-left';
    @Input() classes!: string[];
    @Input() animation!: 'animated--fade-in' | 'animated--fade-in-up';

    customClasses: string[] = [];
    dropdownButtonClasses: string[] = [];
    dropdownMenuClasses: string[] = [];

    constructor() {}
    ngOnInit() {
        if (this.style === 'icon') {
            this.dropdownButtonClasses.push(...['sb-btn-icon', 'sb-btn-transparent-dark']);
            this.customClasses.push('no-caret');
        }
        if (this.background) {
            this.dropdownButtonClasses.push(this.background);
        }
        if (this.color) {
            this.dropdownButtonClasses.push(this.color);
        }
        if (this.classes) {
            this.customClasses.push(...this.classes);
        }
        if (this.animation) {
            this.dropdownMenuClasses.push(this.animation);
        }
    }
}
