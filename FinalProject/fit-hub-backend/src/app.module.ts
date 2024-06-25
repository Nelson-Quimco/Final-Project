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

@Module({
  imports: [
    UserAuthenticationModule,
    DashboardModule,
    FitnessTrackingModule,
    PostModule,
    CommentModule,
    UserProfileModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
