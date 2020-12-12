import { Controller, Get, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('/users')
export class UserController {
  public constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  @Get('/')
  public async show() {
    return this.httpService.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/json'
      }
    })
  }
}
