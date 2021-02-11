import { User } from '../../types/User';
import db from '../../db/dbConnect';
import { RolePermission } from '../../types/RolePermission';
import * as bcrypt from 'bcrypt';

export async function updateUser(userId: number, user: Partial<User>): Promise<void> {
  try {
    const values = Object.keys(user)
      .map((column) => `${column} = :${column}`)
      .join(', ');
    const updateQuery = `UPDATE users SET ${values} WHERE id =:userId`;
    await db.execute(updateQuery, { userId, ...user });
  } catch (e) {
    throw new Error(`Could not update user. Reason: ${e as string}`);
  }
}

export async function addUser(user: Partial<User>, role: string): Promise<void> {
  try {
    const query = `SELECT id as role_id, role from roles where role = :role`;
    const saltRounds = 10;
    const [[rolePermission]]: [[RolePermission]] = (await db.query(query, {
      role,
    })) as [[RolePermission]];

    console.log('rolePermission', rolePermission);
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(user.password, salt, async function (err, hash) {
        user.password = hash;
        user.role_id = rolePermission.role_id;
        const values = Object.keys(user)
          .map((column) => `${column} = :${column}`)
          .join(', ');
        console.log('values', values);
        const stmt = `INSERT users SET ${values}`;
        const results = await db.execute(stmt, { ...user }, (err, result) => {
          if (err) throw err;
        });
        const updatedUser: Partial<User> = user;
        updatedUser.id = results.insertId;
        updatedUser.password = '***';
        console.log(`User successfully added ${updatedUser}`);
      });
    });
  } catch (e) {
    throw new Error(`Could not add user. Reason: ${e as string}`);
  }
}
