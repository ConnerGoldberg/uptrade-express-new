import db from '../../db/dbConnect';
import { RolePermission } from '../../types/RolePermission';

export async function getRoleByName(role: string): Promise<RolePermission> {
  try {
    const query = `SELECT id, role from roles = :role`;
    const [[rolePermission]]: [[RolePermission]] = (await db.query(query, {
      role,
    })) as [[RolePermission]];
    return rolePermission;
  } catch (e) {
    throw new Error(`Could not get token by ID. Reason: ${e as string}`);
  }
}
