import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepoitory {
  generate(user_id: string): Promise<UserToken>;
}
