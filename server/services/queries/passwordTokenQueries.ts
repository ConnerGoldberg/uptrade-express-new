import db from '../../db/dbConnect';
import { PasswordToken } from '../../types/PasswordToken';

export async function getPasswordTokenById(id: number): Promise<PasswordToken> {
  try {
    const query = `SELECT id, token, user_id from password_tokens WHERE id = :id`;
    const [[PasswordToken]]: [[PasswordToken]] = (await db.query(false, query, {
      id,
    })) as [[PasswordToken]];
    return PasswordToken;
  } catch (e) {
    throw new Error(`Could not get token by ID. Reason: ${e as string}`);
  }
}

export async function getPasswordTokenByUserId(id: number, authToken: string): Promise<PasswordToken> {
  try {
    const columns = ['id', 'token', 'user_id'];
    const query = `SELECT ${columns.toString()} from password_tokens WHERE user_id =:id`;
    const [[PasswordToken]]: [[PasswordToken]] = (await db.query(true, authToken, query, { id }, columns)) as [
      [PasswordToken],
    ];
    return PasswordToken;
  } catch (e) {
    throw new Error(`Could not get token by User ID. Reason: ${e as string}`);
  }
}

export async function getPasswordTokenByToken(token: string): Promise<PasswordToken> {
  try {
    const query = `SELECT id, token, user_id from password_tokens WHERE token = :token`;
    const [[PasswordToken]]: [[PasswordToken]] = (await db.query(true, query, {
      token,
    })) as [[PasswordToken]];
    return PasswordToken;
  } catch (e) {
    throw new Error(`Did not find token. Reason: ${e as string}`);
  }
}
