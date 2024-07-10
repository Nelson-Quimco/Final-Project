import { Request } from 'express';


interface RequestWithUser extends Request {
  user: {
    userId: number;
  };
}
