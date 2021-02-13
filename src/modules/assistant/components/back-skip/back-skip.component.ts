import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-back-skip',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './back-skip.component.html',
    styleUrls: ['back-skip.component.scss'],
})
export class BackSkipComponent implements OnInit {
    @Input() showSkip = false;
    constructor(private location: Location) {}
    ngOnInit() {}
    back() {
        this.location.back();
    }
}
