import _isEmpty from 'just-is-empty'
import _pick from 'just-pick'
import _omit from 'just-omit'

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

  static pick(value: unknown, ...keys: string[]): any {
    return _pick(value, keys as never[])
  }

  static omit(value: object, ...keys: string[]): any {
    return _omit(value, keys as never[])
  }
}
