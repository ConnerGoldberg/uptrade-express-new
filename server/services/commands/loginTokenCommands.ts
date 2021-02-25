import db from '../../db/dbConnect';
import { LoginToken } from '../../types/LoginToken';

export async function addLoginToken(loginToken: Partial<LoginToken>): Promise<void> {
  try {
    const values = Object.keys(loginToken)
      .map((column) => `${column} = :${column}`)
      .join(', ');
    const insertTokenCommand = `INSERT login_tokens SET ${values}`;
    await db.execute(insertTokenCommand, { ...loginToken });
  } catch (e) {
    throw new Error(`Could not add login token. Reason: ${e as string}`);
  }
}

export async function removeLoginTokenByUserId(userId: number): Promise<void> {
  try {
    console.log('removing token for user', userId);
    const removeTokenCommand = `DELETE from login_tokens where user_id =:userId`;
    await db.execute(removeTokenCommand, { userId });
  } catch (e) {
    throw new Error(`Could not remove login token. Reason: ${e as string}`);
  }
}
