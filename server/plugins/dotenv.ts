import * as dotenv from 'dotenv';

export default defineNitroPlugin(() => {
  dotenv.config({ quiet: true });
});
