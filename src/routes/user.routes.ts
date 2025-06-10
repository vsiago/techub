import { Router } from 'express';
import { createUser as createUserInTenant, getUsers as listUsersByTenant, updateUser, deleteUser } from '../controllers/user.controller';

import { authMiddleware, permitRoles } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, permitRoles('admin', 'manager'), createUserInTenant);
router.get('/', authMiddleware, permitRoles('admin', 'manager'), listUsersByTenant);
router.put('/:userId', authMiddleware, permitRoles('admin', 'manager'), updateUser);
router.delete('/:userId', authMiddleware, permitRoles('admin', 'manager'), deleteUser);


export default router;