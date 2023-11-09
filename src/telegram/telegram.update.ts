import { Telegraf } from 'telegraf'
import { Action, InjectBot, Start, Update } from 'nestjs-telegraf'
import { Context, ContextSessionType } from './context.interface'
import {
  actionButtons,
  menuButtons,
  sectionButtons,
  subsectionButtons
} from './telegram.buttons'

@Update()
export class TelegramUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Вы запустили бота!', actionButtons())
  }

  @Action('menu')
  async showMenu(ctx: Context) {
    ctx.session.type = ContextSessionType.MENU

    await ctx.reply('Меню', menuButtons())
  }

  @Action(/\bsection\w+/)
  async showSection(ctx: Context) {
    ctx.session.type = ContextSessionType.SECTION
    ctx.session.sectionNumber =
      ctx.update['callback_query']['data'].split('_')[1]

    await ctx.reply(`Раздел ${ctx.session.sectionNumber}`, sectionButtons())
  }

  @Action(/\bsubsection\w+/)
  async showPartitionOne(ctx: Context) {
    ctx.session.type = ContextSessionType.SUBSECTION
    ctx.session.subsectionNumber =
      ctx.update['callback_query']['data'].split('_')[1]

    await ctx.reply(
      `Раздел ${ctx.session.sectionNumber} Подраздел ${ctx.session.subsectionNumber}`,
      subsectionButtons()
    )
  }

  @Action('back')
  async goBack(ctx: Context) {
    switch (ctx.session.type) {
      case 'subsection':
        ctx.session.type = ContextSessionType.SECTION
        await ctx.reply(`Раздел ${ctx.session.sectionNumber}`, sectionButtons())
        break
      case 'section':
        await ctx.reply('Меню', menuButtons())
        break
    }
  }
}
