import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): string {
    return process.env.APP_VERSION;
  }
}
