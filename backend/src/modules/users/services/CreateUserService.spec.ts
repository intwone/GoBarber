import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'Cassio Oliveira Silva',
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with email alread existent', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'Cassio Oliveira Silva',
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    expect(
      createUser.execute({
        name: 'Cassio Oliveira Silva',
        email: 'cassiointw1993@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
