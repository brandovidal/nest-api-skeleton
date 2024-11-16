import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class ApiHttpService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string): Promise<T> {
    const response = await lastValueFrom(this.httpService.get(url))
    return response.data
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await lastValueFrom(this.httpService.post(url, data))
    return response.data
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await lastValueFrom(this.httpService.put(url, data))
    return response.data
  }

  async patch<T>(url: string, data: any): Promise<T> {
    const response = await lastValueFrom(this.httpService.patch(url, data))
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await lastValueFrom(this.httpService.delete(url))
    return response.data
  }
}
