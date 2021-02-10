import { User } from '../../types/User';
import db from '../../db/dbConnect';

export async function updateUser(userId: number, user: Partial<User>, authToken: string): Promise<void> {
  try {
    const values = Object.keys(user)
      .map((column) => `${column} = :${column}`)
      .join(', ');
    const updateQuery = `UPDATE users SET ${values} WHERE id =:userId`;
    await db.execute(true, authToken, updateQuery, { userId, ...user });
  } catch (e) {
    throw new Error(`Could not update user. Reason: ${e as string}`);
  }
}
