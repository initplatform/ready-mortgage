import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChildren,
} from '@angular/core';
import { FAQ } from '@common/models';

@Component({
    selector: 'sbpro-card-accordion-faq',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card-accordion-faq.component.html',
    styleUrls: ['card-accordion-faq.component.scss'],
})
export class CardAccordionFaqComponent implements OnInit, AfterViewInit {
    @ViewChildren('collapsibleSection') collapsibleSections!: ElementRef<HTMLDivElement>[];
    @Input() faqs!: FAQ[];
    @Input() oneAtATime = true;
    @Input() header = false;
    divElements!: HTMLDivElement[];
    collapsed: boolean[] = [];

    constructor(public changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {}
    ngAfterViewInit() {
        this.divElements = this.collapsibleSections.map(section => section.nativeElement);
        for (const divIndex in this.divElements) {
            this.divElements[divIndex].addEventListener('transitionend', event => {
                if (!this.collapsed[divIndex]) {
                    this.divElements[divIndex].style.height = '';
                }
            });
        }
        for (const index in this.divElements) {
            if (index !== '0') {
                this.divElements[index].style.height = 0 + 'px';
                this.collapsed[index] = true;
            }
        }
        this.collapsed[0] = false;
        this.changeDetectorRef.detectChanges();
    }

    toggle(index: number) {
        if (this.collapsed[index]) {
            return this._expand(index);
        } else {
            return this._collapse(index);
        }
    }

    _collapse(index: number) {
        const navHeight = this.divElements[index].scrollHeight;
        const elementTransition = this.divElements[index].style.transition;
        this.divElements[index].style.transition = '';
        requestAnimationFrame(() => {
            this.divElements[index].style.height = navHeight + 'px';
            this.divElements[index].style.transition = elementTransition;
            requestAnimationFrame(() => {
                this.divElements[index].style.height = 0 + 'px';
                this.collapsed[index] = true;
                this.changeDetectorRef.detectChanges();
            });
        });
    }

    _expand(index: number) {
        this.divElements[index].style.height = this.divElements[index].scrollHeight + 'px';
        this.collapsed[index] = false;
        if (this.oneAtATime) {
            for (const collapsedIndex in this.collapsed) {
                if (!this.collapsed[collapsedIndex] && parseInt(collapsedIndex, 10) !== index) {
                    this._collapse(parseInt(collapsedIndex, 10));
                }
            }
        }
        this.changeDetectorRef.markForCheck();
    }
}
