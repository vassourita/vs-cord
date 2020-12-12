import { UserEntity } from '../../dist/user/entities/UserEntity'

declare namespace Express {
  export interface User extends UserEntity {
  }
}
