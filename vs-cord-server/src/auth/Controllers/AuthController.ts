import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { GithubAuthGuard } from '../GithubAuthGuard'

@Controller('/auth')
export class AuthController {
  @Get('/github/callback')
  async callback(@Request() req) {
    console.log(req.query.code)
  }

  @Post('/github/webhooks')
  async webhooks(@Request() req) {
    console.log('body', req.body)
    console.log('query', req.query)
    console.log('headers', req.headers)
  }

  @UseGuards(GithubAuthGuard)
  @Get('/login')
  async login(@Request() req) {
    console.log(req)
  }
}
