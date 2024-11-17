import dayjs from 'dayjs'

import { Helper } from './global.helper'
import { FORMAT_DATE, FORMAT_DATE_TIME } from '../constants/date.constant'

export class DateEnhanced {
  readonly value: dayjs.Dayjs

  constructor(value?: string | Date | dayjs.Dayjs | null) {
    let date = value
    if (Helper.isEmpty(date)) {
      date = dayjs()
    }

    this.value = dayjs(date)
  }

  static parse(value?: string | Date | dayjs.Dayjs | null) {
    return dayjs(value ?? DateEnhanced.CURRENT_DATE)
  }

  static format(value?: string | Date | null, format?: string) {
    return DateEnhanced.parse(value).format(format)
  }

  static formatOrNull(value?: string | Date | null, format?: string) {
    return Helper.isEmpty(value) ? null : DateEnhanced.format(value, format)
  }

  static formatDate(value?: string | Date | null) {
    return DateEnhanced.parse(value).format(FORMAT_DATE)
  }

  static formatDateTime(value?: string | Date | null) {
    return DateEnhanced.parse(value).format(FORMAT_DATE_TIME)
  }

  static formatIsoString(value?: string | Date | null) {
    return DateEnhanced.parse(value).toISOString()
  }

  static compare(first: string | Date | dayjs.Dayjs | null, second: string | Date | dayjs.Dayjs | null) {
    return DateEnhanced.parse(first).diff(DateEnhanced.parse(second))
  }

  static get CURRENT_DATE() {
    return dayjs()
  }

  static get creation() {
    const date = dayjs()
    return {
      creationUnixDate: date.date(),
      creationDay: date.day(),
      creationMonth: date.month() + 1,
      creationYear: date.year()
    }
  }
}
