// src/types/express/index.d.ts

import { User } from '../../models/User'; // ajuste o caminho e tipo conforme seu projeto

declare global {
  namespace Express {
    interface Request {
      user?: User; // ou o tipo que representa o payload do usuário (ex: JwtPayload)
    }
  }
}
