import db from './server/db/dbConnect';
import { readFileSync } from 'fs';
const loadSQLFile = (file: string): string => {
  return readFileSync(`server/db/scripts/seeds/${file}`, 'utf-8');
};

type Tables = {
  [key: string]: string;
};

type TruncateCommand = { truncateCommand: string };

export const reSeedDatabase = async (): Promise<void> => {
  try {
    if (process.env.DB_HOST !== '127.0.0.1' && process.env.DB_HOST !== 'localhost') {
      throw Error('DATABASE NOT POINTING TO 127.0.0.1');
    }

    // Load each table into an array
    const [truncateList]: [TruncateCommand[]] = (await db.query(
      `
          SELECT
            CONCAT('TRUNCATE TABLE ',TABLE_NAME,';') AS truncateCommand
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_SCHEMA = '${process.env.DATABASE}';
      `,
    )) as [TruncateCommand[]];

    await db.query(
      `
          USE ${process.env.DATABASE};
          SET FOREIGN_KEY_CHECKS=0;
          ${truncateList
            .map((a: TruncateCommand) => a.truncateCommand)
            .join('')
            .toString()}
          SET FOREIGN_KEY_CHECKS=1;
        `,
    );

    await db.query(Object.values(tables).join('').toString());
  } catch (e) {
    console.error('ReSeed Database ERROR', e);
  }
};
