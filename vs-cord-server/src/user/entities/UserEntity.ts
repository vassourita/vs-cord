import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  public id: number

  @Column()
  public login: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column({ name: 'avatar_url' })
  public avatarUrl: string

  @Column({ name: 'github_code' })
  public githubCode: string

  @Column({ name: 'github_access_token' })
  public githubAccessToken: string

  @Column({ name: 'github_refresh_token' })
  public githubRefreshToken: string

  @Column({ name: 'github_token_type' })
  public githubTokenType: string
}
