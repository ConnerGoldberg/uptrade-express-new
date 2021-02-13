import db from '../../db/dbConnect';
import { LoginToken } from '../../types/LoginToken';

export async function getLoginTokenById(id: number): Promise<LoginToken> {
  try {
    const query = `SELECT id, token, user_id from login_tokens WHERE id = :id`;
    const [[loginToken]]: [[LoginToken]] = (await db.query(false, query, {
      id,
    })) as [[LoginToken]];
    return loginToken;
  } catch (e) {
    throw new Error(`Could not get token by ID. Reason: ${e as string}`);
  }
}

export async function getLoginTokenByUserId(id: number, authToken: string): Promise<LoginToken> {
  try {
    const columns = ['id', 'token', 'user_id'];
    const query = `SELECT ${columns.toString()} from login_tokens WHERE user_id =:id`;
    const [[loginToken]]: [[LoginToken]] = (await db.query(true, authToken, query, { id }, columns)) as [[LoginToken]];
    return loginToken;
  } catch (e) {
    throw new Error(`Could not get token by User ID. Reason: ${e as string}`);
  }
}

export async function getLoginTokenByToken(token: string): Promise<LoginToken> {
  try {
    const query = `SELECT id, token, user_id from login_tokens WHERE token = :token`;
    const [[loginToken]]: [[LoginToken]] = (await db.query(true, query, {
      token,
    })) as [[LoginToken]];
    return loginToken;
  } catch (e) {
    throw new Error(`Did not find token. Reason: ${e as string}`);
  }
}
