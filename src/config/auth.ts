export default {
  secret_token: process.env.SECRET_TOKEN || '80e8101ee5edef24aa792d49c4982037',
  expires_in_token: process.env.EXPIRES_IN_TOKEN || '15m',
  secret_refresh_token:
    process.env.SECRET_REFRESH_TOKEN || 'fc43e77d6d9af11bbdf2490cf8444ecb',
  expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN || '30d',
  expires_refresh_token_days: process.env.EXPIRES_REFRESH_TOKEN_DAYS || 30,
};
