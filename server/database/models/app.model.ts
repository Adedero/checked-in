import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { id, timestamps } from './partials.model';
import { users } from './auth.model';

// Group table
export const groups = table('group', {
  ...id,
  name: t.text().notNull(),
  description: t.text(),
  image: t.text(),
  maxMembers: t.integer().notNull().default(10_000),
  requiresApproval: t.integer({ mode: 'boolean' }).notNull().default(false),
  data: t.text({ mode: 'json' }).$type<Record<string, unknown>>(),
  creatorId: t
    .text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps
});

// Group relations
export const groupRelations = relations(groups, ({ one, many }) => ({
  creator: one(users, {
    fields: [groups.creatorId],
    references: [users.id]
  }),
  members: many(groupMembers)
}));

// Group member table
export const groupMembers = table(
  'group_member',
  {
    ...id,
    groupId: t
      .text()
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    userId: t
      .text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    data: t.text({ mode: 'json' }).$type<Record<string, unknown>>(),
    ...timestamps
  },
  (table) => [
    t.uniqueIndex('group_id_user_id_unique').on(table.groupId, table.userId)
  ]
);

// Group memeber relations
export const groupMemberRelations = relations(groupMembers, ({ one }) => ({
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id]
  }),
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id]
  })
}));

export const attendances = table('attendance', {
  ...id,
  groupId: t.text().references(() => groups.id, { onDelete: 'cascade' }),
  memberId: t.text().references(() => groupMembers.id, { onDelete: 'cascade' }),
  ...timestamps
});
