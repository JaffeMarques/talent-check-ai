import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { ResumeModule } from './resume/resume.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: process.env.ENVIRONMENT == 'local',
      },
      loader: I18nJsonLoader,
      resolvers: [AcceptLanguageResolver],
    }),
    ResumeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
