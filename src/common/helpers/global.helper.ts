import _isEmpty from 'just-is-empty'

export type NO_OP_TYPE = () => void

export class Helper {
  static readonly NO_OP: NO_OP_TYPE = () => {}

  static isEmpty(value: unknown) {
    if (typeof value === 'number') {
      return _isEmpty(String(value))
    }

    return _isEmpty(value as string)
  }

  static isOptional(value: unknown) {
    return typeof value === 'undefined' || value === null
  }
}
