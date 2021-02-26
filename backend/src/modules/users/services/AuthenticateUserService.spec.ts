import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Cassio Oliveira Silva',
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    const session = await authenticateUser.execute({
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'cassiointw1993@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with password incorrect', async () => {
    await fakeUserRepository.create({
      name: 'Cassio Oliveira Silva',
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    await expect(
      authenticateUser.execute({
        email: 'cassiointw1993@gmail.com',
        password: 'wrong-passoword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
