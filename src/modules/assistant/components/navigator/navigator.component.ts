import { Location } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'rdm-navigator',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './navigator.component.html',
    styleUrls: ['navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
    @Input() showSkip = false;
    @Input() showContinue = true;
    @Input() continueEnabled = true;
    @Output() continue = new EventEmitter<void>();
    constructor(private location: Location) {}
    ngOnInit() {}
    back() {
        this.location.back();
    }
    _continue() {
        if (!this.continueEnabled) {
            return;
        }
        this.continue.emit();
    }
}
