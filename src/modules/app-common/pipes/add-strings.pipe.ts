import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addStrings',
})
export class AddStrings implements PipeTransform {
    constructor() {}
    transform(stringA: string, stringB: string) {
        return parseInt(stringA, 10) + parseInt(stringB, 10);
    }
}
