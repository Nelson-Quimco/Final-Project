import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'fit-hub',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);

    if (!payload.userId || !payload.email) {
      throw new UnauthorizedException('Invalid token');
    }

    return { userId: payload.userId, email: payload.email };
  }
}