import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, models } from '../database';
import { sendMail } from './email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: models.users,
      session: models.sessions,
      account: models.accounts,
      verification: models.verifications
    }
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false
      }
    },

    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        const { error } = await sendMail({
          from: {
            name: String(process.env.APP_NAME),
            address: String(process.env.EMAIL_USER)
          },
          to: user.email,
          subject: 'Approve email change',
          html: `Hi ${user.name}! <br> You are about to change your email to ${newEmail}. <br> Click the link to approve the change: ${url}`
        });

        if (error) throw error;
      }
    }
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url } /* request */) => {
      const { error } = await sendMail({
        from: {
          name: String(process.env.APP_NAME),
          address: String(process.env.EMAIL_USER)
        },
        to: user.email,
        subject: 'Reset your password',
        html: `Hi, ${user.name}! <br> Click the link to reset your password: ${url}`
      });

      if (error) throw error;
    }
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url } /* request */) => {
      const { error } = await sendMail({
        from: {
          name: String(process.env.APP_NAME),
          address: String(process.env.EMAIL_USER)
        },
        to: user.email,
        subject: 'Verify your email address',
        html: `Hi, ${user.name}! <br> Click the link to verify your email: ${url}`
      });

      if (error) throw error;
    }
  },

  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    }
  }
});
