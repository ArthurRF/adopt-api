import { PrismaClient } from '@prisma/client';

const options = {};

if (process.env.LOG_ENV && JSON.parse(process.env.LOG_ENV)) {
  Object.assign(options, {
    log: ['query'],
  });
}

const prisma = new PrismaClient(options);

export default prisma;
