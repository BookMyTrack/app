export class CurrencyFormatter {
  #formatter: Intl.NumberFormat;

  constructor(locale: string, private currency: string) {
    this.currency = currency;

    this.#formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });
  }

  format(value: number) {
    return this.#formatter.format(value);
  }

  set locale(locale: string) {
    this.#formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currency,
    });
  }
}
