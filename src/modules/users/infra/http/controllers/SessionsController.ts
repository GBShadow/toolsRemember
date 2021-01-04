import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const userRepository = new UsersRepository();

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService(userRepository);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      return response.status(201).json({ user: classToClass(user), token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
