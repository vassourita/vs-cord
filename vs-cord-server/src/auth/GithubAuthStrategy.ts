import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy as GithubStrategy, Profile } from 'passport-github'

import { User } from '../user/entities/User'

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(GithubStrategy, 'github') {
  public constructor(configService: ConfigService) {
    super({
      clientID: configService.get('github.clientId'),
      clientSecret: configService.get('github.clientSecret'),
      callbackURL: configService.get('github.callback')
    })
  }

  public async validate(githubAccessToken: string, githubRefreshToken: string, profile: Profile) {
    try {
      let user = await User.findOne({ where: { githubId: profile.id } })
      const data: Partial<User> = {
        githubAccessToken,
        githubId: profile.id,
        avatarUrl:
          profile.photos?.[0].value ||
          (profile._json as any).avatar_url ||
          '',
        username: profile.username
      }
      if (data.avatarUrl && data.avatarUrl.includes('?')) {
        let regexExec: RegExpExecArray
        const photoUrlTRegex = /(.+&t=)(\d+)/
        if (
          user?.avatarUrl &&
          user.avatarUrl.includes(data.avatarUrl) &&
          (regexExec = photoUrlTRegex.exec(user.avatarUrl)) !== null
        ) {
          const t = parseInt(regexExec[2])
          if (!Number.isNaN(t)) {
            data.avatarUrl = `${regexExec[1]}${t + 1}`
          }
        } else {
          data.avatarUrl += '&t=0'
        }
      }
      if (user) {
        await User.update(user.githubId, data)
      } else {
        data.name = profile.displayName
        user = await User.create(data).save()
      }
      return user
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
