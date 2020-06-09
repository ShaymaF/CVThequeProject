import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, term: string): any {

    // si on ne fait pas filtrage la liste de users sera afficher telque elle est *****
    if (term === undefined) {
      return value;
    }
    console.log(term);
    console.log(value); // ('' + item.phone) pour le comprendre comme string et il faut nommer les attributs comme dans BDD//
    return value.filter(item => item.name.includes(term) );
  }
}
