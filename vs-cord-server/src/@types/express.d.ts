import { Profile as GithubProfile } from 'passport-github'

declare namespace Express {
  export interface User extends GithubProfile {
    id: string
  }
}
