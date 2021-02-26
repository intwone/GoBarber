import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Cassio Oliveira Silva',
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with email alread existent', async () => {
    await createUser.execute({
      name: 'Cassio Oliveira Silva',
      email: 'cassiointw1993@gmail.com',
      password: '123',
    });

    await expect(
      createUser.execute({
        name: 'Cassio Oliveira Silva',
        email: 'cassiointw1993@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
