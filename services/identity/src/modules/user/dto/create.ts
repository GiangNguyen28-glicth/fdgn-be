import { User } from '@fdgn/share-domain';

export class CreateUserDTO implements Partial<User> {
  name?: string;
  email?: string;
  password?: string;
}
