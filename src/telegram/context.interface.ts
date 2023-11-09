import { Context as ContextTelegraf } from 'telegraf'

export interface Context extends ContextTelegraf {
  session: {
    type?: 'menu' | 'section' | 'subsection'
    sectionNumber?: string
    subsectionNumber?: string
  }
}
