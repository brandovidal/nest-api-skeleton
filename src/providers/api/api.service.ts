import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getData(url: string): Promise<any> {
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
