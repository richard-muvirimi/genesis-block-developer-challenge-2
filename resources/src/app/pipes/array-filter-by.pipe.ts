import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'arrayFilterBy'
})
export class ArrayFilterByPipe<T extends { [key: string]: any }> implements PipeTransform {

    transform(list: T[], ...predicates: string[]): T[] {
        return list.filter((item: T): boolean => {
            return predicates.filter((predicate: string): boolean => {
                return item[predicate](item);
            }).length !== 0;
        });
    }

}
