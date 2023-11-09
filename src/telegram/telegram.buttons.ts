import { Markup } from 'telegraf'

function actionButtons() {
  return Markup.inlineKeyboard([Markup.button.callback('Меню', 'menu')])
}

function menuButtons() {
  return Markup.inlineKeyboard(
    new Array(10)
      .fill(0)
      .map((_, i) =>
        Markup.button.callback(`Раздел ${i + 1}`, `section_${i + 1}`)
      ),
    {
      columns: 2
    }
  )
}

function sectionButtons() {
  return Markup.inlineKeyboard(
    [
      ...new Array(4)
        .fill(0)
        .map((_, i) =>
          Markup.button.callback(`Подраздел ${i + 1}`, `subsection_${i + 1}`)
        ),
      Markup.button.callback('Назад', 'back')
    ],
    {
      columns: 2
    }
  )
}

function subsectionButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Назад', 'back'),
      Markup.button.callback('Меню', 'menu')
    ],
    {
      columns: 2
    }
  )
}

export { actionButtons, menuButtons, sectionButtons, subsectionButtons }
