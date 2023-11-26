import User from '@entities/user.entity';

declare namespace Express {
  interface Request {
    user?: Pick<User, 'id' | 'name' | 'email'>;
  }
}
