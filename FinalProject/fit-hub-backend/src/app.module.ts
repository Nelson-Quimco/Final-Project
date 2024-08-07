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
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
