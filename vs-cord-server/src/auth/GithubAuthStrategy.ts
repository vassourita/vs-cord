import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy as GithubStrategy, Profile } from 'passport-github'

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(GithubStrategy, 'github') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('github.clientId'),
      clientSecret: config.get('github.clientSecret'),
      callbackURL: config.get('github.callback')
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile
  }
}
