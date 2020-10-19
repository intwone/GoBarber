import User from '../models/Users';

export default class UserMap {
  public static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      emai: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
