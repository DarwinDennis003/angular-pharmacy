import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityMethodService {

  constructor() { }

  public almightyArrayFilter<T>(array:T[],property : keyof T , value : any) : any[]{
    const filteredArray = array.filter((x)=>x[property] === value)
    return filteredArray
  }

  public getUniquePropertyValues<T extends { [key: string]: any} , K extends keyof T>(array : T[] , property : K) : T[K][] {
    const uniqueSet = new Set(array.map(obj => obj[property]))
    const uniqueValues = Array.from(uniqueSet);
    return uniqueValues;
  }
      


}
