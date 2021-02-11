import { User } from '../../types/User';
import db from '../../db/dbConnect';

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const columns = ['id', 'username', 'password', 'email', 'verified'];
    const getUserInformationQuery = `SELECT ${columns.toString()} from users where email =:email`;
    const [[userInformationQueryResponse]]: [[User]] = (await db.execute(getUserInformationQuery, { email })) as [
      [User],
    ];

    return userInformationQueryResponse;
  } catch (e) {
    console.error('EXCEPTION: getUserByEmail() -  ', e);
    throw e;
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    const columns = ['id', 'username', 'password', 'email', 'verified'];
    const getUserInformationQuery = `SELECT ${columns.toString()} from users where id =:id`;
    const [[userInformationQueryResponse]]: [[User]] = (await db.execute(getUserInformationQuery, { id })) as [[User]];
    return userInformationQueryResponse;
  } catch (e) {
    console.error('EXCEPTION: getUserByEmail() -  ', e);
    throw e;
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const getUserInformationQuery = `SELECT id, username, email, verified, profileimg, role_id from users`;
    const [userInformationQueryResponse]: [[User]] = (await db.execute(getUserInformationQuery)) as [[User]];
    return userInformationQueryResponse;
  } catch (e) {
    console.error('EXCEPTION: getUsers() -  ', e);
    throw e;
  }
}
