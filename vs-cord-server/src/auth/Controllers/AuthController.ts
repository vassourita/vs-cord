import { Controller, Get, HttpService, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Request as ExpressRequest } from 'express'
import { map } from 'rxjs/operators'

import { GithubAuthGuard } from '../GithubAuthGuard'

@Controller('/auth')
export class AuthController {
  public constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  @Get('/github/callback')
  public async callback(@Request() req: ExpressRequest) {
    const { code } = req.query

    if (!code) {
      throw new UnauthorizedException()
    }

    return this.httpService.post('https://github.com/login/oauth/access_token', {
      client_id: this.config.get('github.clientId'),
      client_secret: this.config.get('github.clientSecret'),
      code
    }, {
      headers: {
        Accept: 'application/json'
      }
    }).pipe(
      map(response => response.data)
    )
  }

  @Post('/github/webhooks')
  public async webhooks(@Request() req) {
    console.log('body', req.body)
    console.log('query', req.query)
    console.log('headers', req.headers)
  }

  @Get('/login')
  @UseGuards(GithubAuthGuard)
  public async login() {
  }
}
