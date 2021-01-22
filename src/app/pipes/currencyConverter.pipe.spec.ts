import { CurrencyConverterPipe } from './CurrencyConverter.pipe';

describe('MoneyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
