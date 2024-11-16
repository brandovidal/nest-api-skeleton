import { Module, OnModuleInit } from '@nestjs/common'

import { ApiHttpService } from '@/config/api/api-http.service'
import { HttpModule, HttpService } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.register({
      timeout: 1000,
      maxRedirects: 2,
      baseURL: 'https://http.cat'
    })
  ],
  controllers: [],
  providers: [ApiHttpService]
})
export class ApiProviderModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  // Defining others configuration for our Axios instance
  onModuleInit() {
    this.httpService.axiosRef.defaults.headers.common['Accept'] = 'application/json'
  }
}
