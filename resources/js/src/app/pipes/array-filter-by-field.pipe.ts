import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'arrayFilterByField'
})
export class ArrayFilterByFieldPipe<T extends { [key: string]: any }> implements PipeTransform {

    transform(list: T[], filter: string, fields: string[]): T[] {
        return list.filter((item: T) => {
            return filter.length === 0 || fields.filter((field: string): boolean => {
                return filter.toString() === item[field].toString();
            }).length !== 0;
        });
    }

}
