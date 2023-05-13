interface ICreateUserTokenProps {
  userId: number;
  expiresDate: Date;
  refreshToken: string;
}

export { ICreateUserTokenProps };
