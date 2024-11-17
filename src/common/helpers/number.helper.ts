export class NumberEnhaced {
  static format(value: number) {
    return NumberEnhaced.parse(new Intl.NumberFormat('es-PE').format(value))
  }

  static parse(value: unknown) {
    return Number(value)
  }

  static aproximateToNumber(first: number, second: number) {
    return Math.ceil(first / second)
  }
}
