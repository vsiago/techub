import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user.tenantId;
    const users = await userService.getUsersByTenant(tenantId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user.tenantId;
    const userData = req.body;
    const newUser = await userService.createUser(tenantId, userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user.tenantId;
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUser(tenantId, userId, updateData);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user.tenantId;
    const userId = req.params.id;
    await userService.deleteUser(tenantId, userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar usuário' });
  }
};
