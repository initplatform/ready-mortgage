import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FAQ } from '@common/models';
import { LoremIpsumService, UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-rental',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './rental.component.html',
    styleUrls: ['rental.component.scss'],
})
export class RentalComponent implements OnInit, AfterViewInit {
    faqs: FAQ[] = [
        {
            question: 'Is there a minimum number of nights?',
            answer: this.loremIpsumService.lorem(),
        },
        {
            question: 'How close is the nearest grocery store?',
            answer: this.loremIpsumService.lorem(),
        },
        {
            question: 'Is there a discount for longer term rental periods?',
            answer: this.loremIpsumService.lorem(),
        },
    ];
    constructor(
        private utilityService: UtilityService,
        private loremIpsumService: LoremIpsumService
    ) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.utilityService.AOS.init({
            disable: 'mobile',
            duration: 600,
            once: true,
        });
    }
}
