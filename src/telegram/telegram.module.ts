import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { ConfigService } from '@nestjs/config'
import { TelegramUpdate } from './telegram.update'
import * as LocalSession from 'telegraf-session-local'

const session = new LocalSession({ database: 'session_db.json' })

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        middlewares: [session.middleware()],
        token: configService.get('TELEGRAM_BOT_TOKEN')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [TelegramUpdate]
})
export class TelegramModule {}
