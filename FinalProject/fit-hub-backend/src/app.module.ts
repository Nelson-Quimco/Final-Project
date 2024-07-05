import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { FitnessTrackingModule } from './fitness-tracking/fitness-tracking.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserAuthenticationModule,
    DashboardModule,
    FitnessTrackingModule,
    PostModule,
    CommentModule,
    UserProfileModule,
    PrismaModule,
    PassportModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: 'your_jwt_secret',
    //   signOptions: { expiresIn: '60m' },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService], // JwtStrategy, JwtAuthGuard
})
export class AppModule {}
