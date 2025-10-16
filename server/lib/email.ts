import { createTransport } from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import normalizeException from '~~/shared/utils/normalize-exception';

type SendMailFunction = (options: SendMailOptions) => Promise<{
  error: Error | null;
  data: SMTPTransport.SentMessageInfo | null;
}>;

export class EmailService {
  private transport: ReturnType<typeof createTransport>;
  private transportConfig: SMTPTransport.Options;
  constructor(config: SMTPTransport.Options) {
    this.transport = createTransport(config);
    this.transportConfig = config;
  }

  sendMail: SendMailFunction = async (options) => {
    if (!this.transport) {
      return {
        data: null,
        error: new Error('Missing transport')
      };
    }
    try {
      const result = await this.transport.sendMail(options);
      return {
        data: result,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: normalizeException(error)
      };
    }
  };

  getTransport = () => {
    return {
      transport: this.transport,
      config: this.transportConfig
    };
  };
}

export const { sendMail, getTransport } = new EmailService({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  service: process.env.EMAIL_SERVICE,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
