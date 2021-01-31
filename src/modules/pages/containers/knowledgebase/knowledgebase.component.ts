import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FAQ } from '@common/models';
import { LoremIpsumService } from '@common/services';

@Component({
    selector: 'sbpro-knowledgebase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './knowledgebase.component.html',
    styleUrls: ['knowledgebase.component.scss'],
})
export class KnowledgebaseComponent implements OnInit {
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

    constructor(private loremIpsumService: LoremIpsumService) {}
    ngOnInit() {}
}
