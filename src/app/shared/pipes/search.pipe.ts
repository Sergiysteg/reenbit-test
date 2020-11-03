import { Pipe, PipeTransform } from '@angular/core';
import { IPerson } from '../interfaces/person.interface';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IPerson>, search: string): Array<IPerson> {
    if (!search) {
      return value.sort((a, b) => {
        const aTime = a.messages[a.messages.length - 1].date.getTime();
        const bTime = b.messages[b.messages.length - 1].date.getTime();
        return (bTime - aTime);
      })
    }
    if (!value) {
      return null;
    }
    return value.filter(obj => {
      if(obj.firstName.toLowerCase().includes(search.toLowerCase()) || obj.lastName.toLowerCase().includes(search.toLowerCase())){
        return true;
      }
    })
  }

}
