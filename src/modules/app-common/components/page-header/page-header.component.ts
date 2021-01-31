import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BorderType } from '@common/models';

@Component({
    selector: 'sbpro-page-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './page-header.component.html',
    styleUrls: ['page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
    @Input() headerClasses!: string;
    @Input() borderType!: BorderType;
    @Input() borderClasses = 'text-white';
    @Input() backgroundImage!: string;

    safeBackgroudImage!: SafeStyle;

    constructor(private domSanitizer: DomSanitizer) {}
    ngOnInit() {
        this.safeBackgroudImage = this.domSanitizer.bypassSecurityTrustStyle(this.backgroundImage);
    }
}
