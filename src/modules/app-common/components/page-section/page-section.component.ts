import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BorderType } from '@common/models';

@Component({
    selector: 'sbpro-page-section',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './page-section.component.html',
    styleUrls: ['page-section.component.scss'],
})
export class PageSectionComponent implements OnInit {
    @Input() sectionClasses!: string;
    @Input() borderType!: BorderType;
    @Input() borderClasses = 'text-white';
    @Input() backgroundImage!: string;

    safeBackgroudImage!: SafeStyle;

    constructor(private domSanitizer: DomSanitizer) {}
    ngOnInit() {
        this.safeBackgroudImage = this.domSanitizer.bypassSecurityTrustStyle(this.backgroundImage);
    }
}
