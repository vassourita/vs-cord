import { Controller, Get, HttpService, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GithubAuthGuard } from '../../../dist/auth/GithubAuthGuard'

@Controller('/users')
export class UserController {
  public constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  @Get('/')
  @UseGuards(GithubAuthGuard)
  public async show() {
    return this.httpService.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/json'
      }
    })
  }
}
