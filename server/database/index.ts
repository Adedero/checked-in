import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { accounts, sessions, users, verifications } from './models/auth.model';
import { groups } from './models/app.model';

const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db = drizzle({ client });

export const models = {
  /* Auth models */
  users,
  sessions,
  accounts,
  verifications,
  /* App models */
  groups
};
