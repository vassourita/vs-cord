import { Controller, Get } from '@nestjs/common'

@Controller('/users')
export class UserController {
  @Get('/')
  async index() {
    return {
      hello: 'world'
    }
  }
}
