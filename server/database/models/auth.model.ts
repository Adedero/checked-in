import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './partials.model';

// User table
export const users = table('user', {
  ...id,
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  emailVerified: t.integer({ mode: 'boolean' }).notNull().default(false),
  image: t.text(),
  role: t
    .text({ enum: ['admin', 'user'] })
    .notNull()
    .default('user'),
  ...timestamps
});

// Session Table
export const sessions = table('session', {
  ...id,
  userId: t
    .text()
    .notNull()
    .references(() => users.id),
  token: t.text().notNull(),
  expiresAt: t.integer({ mode: 'timestamp' }).notNull(),
  ipAddress: t.text(),
  userAgent: t.text(),
  ...timestamps
});

// Account Table
export const accounts = table('account', {
  ...id,
  userId: t
    .text()
    .notNull()
    .references(() => users.id),
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  accessToken: t.text(),
  refreshToken: t.text(),
  accessTokenExpiresAt: t.integer({ mode: 'timestamp' }),
  refreshTokenExpiresAt: t.integer({ mode: 'timestamp' }),
  scope: t.text(),
  idToken: t.text(),
  password: t.text(),
  ...timestamps
});

// Verification Table
export const verifications = table('verification', {
  ...id,
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.integer({ mode: 'timestamp' }).notNull(),
  ...timestamps
});
