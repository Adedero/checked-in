import * as t from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { ulid } from 'ulid';

export const id = {
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => ulid())
};

export const timestamps = {
  createdAt: t
    .integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s','now'))`),

  updatedAt: t
    .integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s','now'))`)
};
