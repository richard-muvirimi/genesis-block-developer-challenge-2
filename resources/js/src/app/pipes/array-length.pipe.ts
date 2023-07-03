import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'arrayLength'
})
export class ArrayLengthPipe<T> implements PipeTransform {

    transform(list: T[]): number {
        return list?.length || 0;
    }

}
