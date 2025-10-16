import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './server/database/models',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!
  }
});
