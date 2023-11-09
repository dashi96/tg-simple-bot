import { Context as ContextTelegraf } from 'telegraf'

export enum ContextSessionType {
  MENU = 'menu',
  SECTION = 'section',
  SUBSECTION = 'subsection'
}

export interface Context extends ContextTelegraf {
  session: {
    type?: ContextSessionType
    sectionNumber?: string
    subsectionNumber?: string
  }
}
