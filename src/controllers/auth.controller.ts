import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Login falhou' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await authService.register(userData);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Cadastro falhou' });
  }
};
