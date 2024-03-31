import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.get('authorization');
      const response = await axios.get('http://localhost/identity/auth/current-user', { headers: { Authorization: token } });
      const user = await response.data;
      if(user) {
        req.user = user;
      }
      next();
    } catch (error) {
      throw error;
    }
  }
}
