import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  transform(value: number, code: string): any {
    const usForex: number = 161;
    const ukForex: number = 222;
    const caForex: number = 127;
    const euroForex: number = 195;

    let res;
    if (code == null) {
      res = `Rs ${(value).toFixed(2)}`;
      return res;
    }
    switch (code.toLowerCase()) {
      case "usd":
        res = `$ ${(value / usForex).toFixed(2)}`;
        break;
      case "uk":
        res = `£ ${(value / ukForex).toFixed(2)}`;
        break;
      case "cad":
        res = `CAD ${(value / caForex).toFixed(2)}`;
        break;
      case "euro":
        res = `EUR ${(value / euroForex).toFixed(2)}`;
        break;
      default:
        res = `Rs ${(value).toFixed(2)}`;
    }
    return res;
  }

}
