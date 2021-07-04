import { postgresWrapper } from '../postgres-wrapper';
import { PasswordManager } from '../services/password-manager';

interface IUser {
  id: string;
  email: string;
  password: string | undefined;
  created: string;
  role: string;
}

class User {
  async findOneByEmail(email: string) {
    let users: Array<IUser> = [];

    try {
      users = await postgresWrapper.db('users').where({ email });
    } catch (err) {
      console.log(`Error getting users: ${err}`);
    }

    return users.length > 0 ? users[0] : null;
  }

  async findOne({ email }: { email: string }) {
    let users: Array<IUser> = [];

    try {
      users = await postgresWrapper.db('users').where({ email });
    } catch (err) {
      console.log(`Error getting users: ${err}`);
    }

    return users.length > 0 ? users[0] : null;
  }

  async build(email: string, password: string, role: string='student') {
    const hashedPassword = await PasswordManager.toHash(password);
    const trx = await postgresWrapper.db.transaction();

    let newUser;

    try {
      const data = await trx('users')
        .insert({
          email,
          password: hashedPassword,
          created: new Date().toUTCString(),
          role,
        })
        .returning('*');
      
      newUser = data[0];
      await trx.commit();
    } catch(err) {
      await trx.rollback();
    }

    return newUser;
  }
}

export const user = new User();
