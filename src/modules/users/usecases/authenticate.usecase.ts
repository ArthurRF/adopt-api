import { AppError } from '@shared/errors/app.error';
import { Inject, Service } from 'typedi';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import dayjs from 'dayjs';
import { IUsersRepository } from '../repositories/interfaces/i-users.repository';
import { IUsersTokensRepository } from '../repositories/interfaces/i-users-tokens.repository';

interface IProps {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
  };
  token: string;
  refreshToken: string;
}

@Service()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @Inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IProps): Promise<IResponse> {
    const userFound = await this.usersRepository.findByEmail(email);
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!userFound) {
      throw new AppError('Usuário não encontrado.');
    }

    const passwordMatch = await compare(password, userFound.password);

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha incorretos.');
    }

    const token = sign({}, Buffer.from(secret_token).toString('base64'), {
      subject: userFound.id.toString(),
      expiresIn: expires_in_token,
    });

    const refreshToken = sign({ email }, secret_refresh_token, {
      subject: userFound.id.toString(),
      expiresIn: expires_in_refresh_token,
      algorithm: 'HS256',
    });

    const refreshTokenExpiresDate = dayjs()
      .add(+expires_refresh_token_days, 'days')
      .toDate();

    await this.usersTokensRepository.create({
      userId: userFound.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    const tokenReturn: IResponse = {
      token,
      refreshToken,
      user: {
        email: userFound.email,
      },
    };

    return tokenReturn;
  }
}
