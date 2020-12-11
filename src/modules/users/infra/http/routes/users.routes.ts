import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();

  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const tool = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(tool);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
