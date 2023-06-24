import { sign, verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { Inject, Service } from 'typedi';
import { AppError } from '@shared/errors/app.error';
import dayjs from 'dayjs';
import { IUsersTokensRepository } from '../repositories/interfaces/i-users-tokens.repository';

interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@Service()
class RefreshUserTokenUseCase {
  constructor(
    @Inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    let email: string | undefined;
    let sub: string | undefined;
    try {
      const data = verify(token, auth.secret_refresh_token, {
        algorithms: ['HS256'],
      }) as IPayLoad;

      email = data.email;
      sub = data.sub;
    } catch (error) {
      throw new AppError('JWT com formato inválido ou expirado.', 400);
    }

    if (!email || !sub) {
      throw new AppError('Houve um erro ao validar o JWT.');
    }

    const userId = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        +userId,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh token inexistente!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expiresDate = dayjs()
      .add(+auth.expires_refresh_token_days, 'days')
      .toDate();

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: userId,
      expiresIn: +auth.expires_refresh_token_days,
    });

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken,
      userId: +userId,
    });

    const newToken = sign(
      {},
      Buffer.from(auth.secret_token).toString('base64'),
      {
        subject: userId,
        expiresIn: auth.expires_in_token,
      }
    );

    return {
      token: newToken,
      refreshToken,
    };
  }
}

export { RefreshUserTokenUseCase };
