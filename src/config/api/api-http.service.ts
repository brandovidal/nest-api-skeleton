import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class ApiHttpService {
  constructor(private readonly httpService: HttpService) {}

  async getData<T>(url: string): Promise<T> {
    const response = await lastValueFrom(this.httpService.get(url))
    return response.data
  }
}
