import * as yup from 'yup'
import { round } from 'lodash'

import { getComparisonChar } from './util'

export const ElersTest = {
  shortName: 'Мотивация к избеганию неудач',
  color: '#0C7CD5',
  name: 'Тест Т.Элерса - Мотивация к избеганию неудач',
  description:
    'Тест предложен Т. Элесом (или Т.Элерсом), позволяет оценить уровень защиты личности, мотивации к избеганию неудач, страха перед несчастьем',
  instruction:
    'Вам предлагается список слов из 30 строк, по 3 слова в каждой строке. В каждой строке выберите только одно из трех слов, которое наиболее точно Вас характеризует, и пометьте его.',
  getValue: (value, fractionDigits = 0) => round((value * 100) / 30, fractionDigits),
  getResult: values => {
    let result = 0
    if (['Бдительный'].includes(values['1'])) result++
    if (['Кроткий', 'Робкий'].includes(values['2'])) result++
    if (['Осторожный', 'Пессимистичный'].includes(values['3'])) result++
    if (['Внимательный'].includes(values['4'])) result++
    if (['Трусливый'].includes(values['5'])) result++
    if (['Удалой'].includes(values['6'])) result++
    if (['Колеблющийся', 'Удалой'].includes(values['7'])) result++
    if (['Боязливый'].includes(values['8'])) result++
    if (['Незадумывающийся', 'Жеманный'].includes(values['9'])) result++
    if (['Добросовестный', 'Меланхоличный'].includes(values['10'])) result++
    if (['Сомневающийся'].includes(values['11'])) result++
    if (['Трусливый', 'Взволнованный'].includes(values['12'])) result++
    if (['Тихий', 'Боязливый'].includes(values['13'])) result++
    if (['Внимательный'].includes(values['14'])) result++
    if (['Рассудительный'].includes(values['15'])) result++
    if (['Осторожный', 'Предусмотрительный'].includes(values['16'])) result++
    if (['Робкий'].includes(values['17'])) result++
    if (['Малодушный'].includes(values['18'])) result++
    if (['Нерешительный'].includes(values['19'])) result++
    if (['Исполнительный', 'Преданный'].includes(values['20'])) result++
    if (['Предусмотрительный'].includes(values['21'])) result++
    if (['Укрощенный'].includes(values['22'])) result++
    if (['Терпеливый'].includes(values['23'])) result++
    if (['Разумный', 'Заботливый'].includes(values['24'])) result++
    if (['Предвидящий'].includes(values['25'])) result++
    if (['Пугливый'].includes(values['26'])) result++
    if (['Пессимистичный'].includes(values['27'])) result++
    if (['Осмотрительный', 'Рассудительный'].includes(values['28'])) result++
    if (['Боязливый'].includes(values['29'])) result++
    if (['Бдительный'].includes(values['30'])) result++

    return {
      result,
      description: `
    Мотивация к избеганию неудач:
     ${
       result <= 10
         ? 'Низкая мотивация к защите'
         : result >= 11 && result <= 16
         ? 'Средний уровень мотивации'
         : result >= 17 && result <= 20
         ? 'Высокий уровень мотивации'
         : 'Слишком высокий уровень мотивации к избеганию неудач, защите'
     }.

    Интерпретация результата:
    текст текст текст
    `,
    }
  },
  questions: [
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Смелый', 'Бдительный', 'Предприимчивый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Кроткий', 'Робкий', 'Упрямый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Осторожный', 'Решительный', 'Пессимистичный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Непостоянный', 'Бесцеремонный', 'Внимательный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Неумный', 'Трусливый', 'Недумающий'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Ловкий', 'Бойкий', 'Удалой'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Хладнокровный', 'Колеблющийся', 'Удалой'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Стремительный', 'Легкомысленный', 'Боязливый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Незадумывающийся', 'Жеманный', 'Непредусмотрительный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Оптимистичный', 'Добросовестный', 'Чуткий'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Меланхоличный', 'Сомневающийся', 'Неустойчивый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Трусливый', 'Небрежный', 'Взволнованный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Опрометчивый', 'Тихий', 'Боязливый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Внимательный', 'Неблагоразумный', 'Смелый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Рассудительный', 'Быстрый', 'Мужественный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Предприимчивый', 'Осторожный', 'Предусмотрительный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Взволнованный', 'Рассеянный', 'Робкий'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Малодушный', 'Неосторожный', 'Бесцеремонный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Пугливый', 'Нерешительный', 'Нервный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Исполнительный', 'Преданный', 'Нервный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Предусмотрительный', 'Бойкий', 'Отчаянный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Укрощенный', 'Безразличный', 'Небрежный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Осторожный', 'Беззаботный', 'Терпеливый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Разумный', 'Заботливый', 'Храбрый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Предвидящий', 'Неустрашимый', 'Добросовестный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Поспешный', 'Пугливый', 'Беззаботный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Рассеянный', 'Опрометчивый', 'Пессимистичный'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Осмотрительный', 'Рассудительный', 'Предприимчивый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Тихий', 'Неорганизованный', 'Боязливый'],
    },
    {
      type: 'radio',
      validation: yup.string().required('Обязательно для заполнения').nullable(),
      options: ['Оптимистичный', 'Бдительный', 'Беззаботный'],
    },
  ],
}

export const ShubertTest = {
  shortName: 'Диагностика степени готовности к риску',
  name: 'Методика диагностики степени готовности к риску Шуберта.',
  color: '#ba0cd5',
  description:
    'Методика диагностики степени готовности к риску Шуберта показывает вашу готовность рисковать и насколько ваш риск является необходимым и целесообразным. Тест Шуберта также выявит причины ваших ошибок в повседневной жизни и позволит подкорректировать стиль поведения для достижения большего успеха с меньшими затратами',
  instruction:
    'Оцените степень своей готовности совершить действия, о которых Вас спрашивают. При ответе на каждый из 25 вопросов поставьте соответствующий балл по следующей схеме:\n' +
    '2 балла – полностью согласен, полное «да»;\n' +
    '1 балл – больше «да», чем «нет»;\n' +
    '0 баллов – ни «да», ни «нет»,нечто среднее;\n' +
    '-1 балл – больше «нет», чем «да»;\n' +
    '-2 балла – полное «нет».',
  getValue: (value, fractionDigits = 0) => round(value + 50, fractionDigits),
  getResult: values => {
    const result = Object.values(values).reduce((sum, v) => sum + v, 0)

    return {
      result,
      description: `
    Степень готовности к риску:
     ${
       result < -30
         ? 'Вы слишком осторожны'
         : result >= -10 && result <= 10
         ? 'Вы можете рисковать в ситуации, если дело этого действительно требует'
         : result >= 20
         ? 'Вы склонны к чрезмерному риску'
         : 'Не определено'
     }.

    Интерпретация результата:
    текст текст текст
    `,
    }
  },
  questionOptions: {
    defaultValue: 0,
    min: -2,
    max: 2,
    marks: [
      { value: -2, label: '-2' },
      { value: -1, label: '-1' },
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
    ],
  },
  questions: [
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label:
        'Превысили бы Вы установленную скорость, чтобы быстрее оказать необходимую медицинскую помощь больному человеку?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Согласились бы Вы ради хорошего заработка участвовать в опасной и длительной экспедиции?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Стали бы Вы на пути убегающего опасного преступника?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы ехать на подножке товарного вагона при скорости более 100 км/ч?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Можете ли Вы на другой день после бессонной ночи нормально работать?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Стали бы Вы первым переходить холодную реку?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Одолжили бы Вы другу большую сумму денег, будучи не совсем уверенным, что он сможет Вам вернуть ее?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Вошли бы Вы вместе с укротителем в клетку со львами при его заверении, что это безопасно?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы под руководством опытного наставника залезть на высокую фабричную трубу?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы без тренировки взяться за управление парусной лодкой?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Рискнули бы Вы схватить за уздечку бегущую лошадь?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы, выпив пару литров пива, ехать на велосипеде?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы совершить прыжок с парашютом?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы при необходимости проехать без билета от Петербурга до Мурманска?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label:
        'Могли бы Вы отправиться в далекую поездку на автомобиле, если бы за рулем должен был сидеть Ваш знакомый, совсем недавно побывавший в тяжелом дорожном происшествии?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы прыгнуть с 10-метровой высоты на тент пожарной команды?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label:
        'Могли бы Вы, чтобы избавиться от затяжной болезни с постельным режимом, пойти на опасную для жизни операцию?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы спрыгнуть с подножки вагона при скорости движения 60 км/ч?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label:
        'Могли бы Вы в виде исключения вместе с шестью другими людьми подняться на лифте, рассчитанном только на 5 человек?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label:
        'Могли бы Вы за большое денежное вознаграждение перейти с завязанными глазами оживленный уличный перекресток?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Взялись бы Вы за опасную для жизни работу, если бы за нее хорошо платили?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы после 10 рюмок водки вычислять проценты?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label:
        'Могли бы Вы по указанию Вашего начальника взяться за высоковольтный провод, если бы он заверил Вас, что провод обесточен?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы после некоторых предварительных объяснений управлять вертолетом?',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Могли бы Вы, имея билеты, но без денег и продуктов, доехать из Москвы до Хабаровска?',
    },
  ],
}

export const IljinaTest = {
  shortName: 'Мотивация обучения в вузе',
  color: '#FF9800',
  name: 'Методика изучения мотивации обучения в вузе Т.И.Ильиной',
  description:
    'При создании данной методики автор использовала ряд других известных методик. В ней имеются три шкалы: «Приобретение знаний» (стремление к приобретению знаний, любознательность); «Овладение профессии» (стремление овладеть профессиональными знаниями и сформировать профессионально важные качества); «Получение диплома» (стремление приобрести диплом при формальном усвоении знаний, стремление к поиску обходных путей при сдаче экзаменов и зачетов). В опросник, для маскировки, автор методики включила ряд фоновых утверждений, которые в дальнейшем не обрабатываются.',
  instruction:
    'Вам предлагается ряд утверждений. Если Вы согласны с высказыванием, то отметье "Да", если не согласны - "Нет".',
  getValue: (value, fractionDigits = 0) => {
    return {
      knowledge: round((value.knowledge * 100) / 12.6, fractionDigits),
      profession: round((value.profession * 100) / 10, fractionDigits),
      diploma: round((value.diploma * 100) / 10, fractionDigits),
    }
  },
  getResult: values => {
    const knowledge =
      values['4'] === 'true'
        ? 3.6
        : 0 + values['17'] === 'true'
        ? 3.6
        : 0 + values['26'] === 'true'
        ? 2.4
        : 0 + values['28'] === 'false'
        ? 1.2
        : 0 + values['42'] === 'false'
        ? 1.8
        : 0
    const profession =
      values['9'] === 'true'
        ? 1
        : 0 + values['31'] === 'true'
        ? 2
        : 0 + values['33'] === 'true'
        ? 2
        : 0 + values['43'] === 'true'
        ? 3
        : 0 + values['48'] === 'true'
        ? 1
        : 0 + values['49'] === 'true'
        ? 1
        : 0
    const diploma =
      values['24'] === 'true'
        ? 2.5
        : 0 + values['35'] === 'true'
        ? 1.5
        : 0 + values['38'] === 'true'
        ? 1.5
        : 0 + values['44'] === 'true'
        ? 1
        : 0 + values['11'] === 'false'
        ? 3.5
        : 0

    return {
      result: { knowledge, profession, diploma },
      description: `
    Шкала «Приобретение знаний» - ${knowledge} б.
    Шкала «Овладение профессией» - ${profession} б.
    Шкала «Получение диплома» - ${diploma} б.

    Интерпретация результата:
    текст текст текст
    `,
    }
  },
  questions: [
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Лучшая атмосфера занятий – атмосфера свободных высказываний.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Обычно я работаю с большим напряжением.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'У меня редко бывают головные боли после пережитых волнений и неприятностей.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я самостоятельно изучаю ряд предметов, по моему мнению, необходимых для моей будущей профессии.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Какое из присущих вам качеств вы выше всего цените? Напишите ответ рядом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я считаю, что жизнь нужно посвятить выбранной профессии.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я испытываю удовольствие от рассмотрения на занятии трудных проблем.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я не вижу смысла в большинстве работ, которые мы делаем в вузе.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Большое удовлетворение мне дает рассказ знакомым о моей будущей профессии.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label:
        'Я весьма средний студент, никогда не буду вполне хорошим, а поэтому нет смысла прилагать усилия, чтобы стать лучше.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я считаю, что в наше время не обязательно иметь высшее образование.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я твердо уверен в правильности выбора профессии.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'От каких из присущих вам качеств вы бы хотели избавиться? Напишите ответ рядом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'При удобном случае я использую на экзаменах подсобные материалы (конспекты, шпаргалки).',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Самое замечательное время жизни – студенческие годы.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'У меня чрезвычайно беспокойный и прерывистый сон.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я считаю, что для полного овладения профессией все учебные дисциплины нужно изучать одинаково глубоко.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'При возможности я поступил бы в другой вуз.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я обычно вначале берусь за более легкие задачи, а более трудные оставляю на потом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Для меня было трудно при выборе профессии остановиться на одной из них.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я могу спокойно спать после любых неприятностей.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я твердо уверен, что моя профессия дает мне моральное удовлетворение и материальный достаток в жизни.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мне кажется, что мои друзья способны учиться лучше, чем я.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Для меня очень важно иметь диплом о высшем образовании.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Из неких практических соображений для меня это самый удобный вуз.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'У меня достаточно силы воли, чтобы учиться без напоминания администрации.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Жизнь для меня почти всегда связана с необычайным напряжением.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Экзамены нужно сдавать, тратя минимум усилий.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Есть много вузов, в которых я мог бы учиться с не меньшим интересом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Какое из присущих вам качеств больше всего мешает учиться? Напиши ответ рядом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я очень увлекающийся человек, но все мои увлечения так или иначе связаны с будущей профессией.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Беспокойство об экзамене или работе, которая не выполнена в срок, часто мешает мне спать.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Высокая зарплата после окончания вуза для меня не главное.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мне нужно быть в хорошем расположении духа, чтобы поддержать общее решение группы.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я вынужден был поступить в вуз, чтобы занять желаемое положение в обществе, избежать службы в армии.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я учу материал, чтобы стать профессионалом, а не для экзамена.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мои родители хорошие профессионалы, и я хочу быть на них похожим.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Для продвижения по службе мне необходимо иметь высшее образование.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Какое из ваших качеств помогает вам учиться? Напишите ответ рядом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label:
        'Мне очень трудно заставить себя изучать как следует дисциплины, прямо не относящиеся к моей будущей специальности.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Меня весьма тревожат возможные неудачи.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Лучше всего я занимаюсь, когда меня периодически стимулируют, подстегивают.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мой выбор данного вуза окончателен.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мои друзья имеют высшее образование, и я не хочу отставать от них.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Чтобы убедить в чем – либо группу, мне приходиться самому работать очень интенсивно.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'У меня обычно ровное и хорошее настроение.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Меня привлекает удобство, чистота, легкость будущей профессии.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'До поступления в вуз я давно интересовался этой профессией, много читал о ней.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Профессия, которую я получаю, самая важная и перспективная.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мои знания об этой профессии были достаточны для уверенного выбора.',
    },
  ],
}

export const Elers2Test = {
  shortName: 'Мотивация к успеху',
  color: '#4CAF50',
  name: 'Методика диагностики личности на мотивацию к успеху Т. Элерса',
  description:
    'При диагностике личности на выявление мотивации к успеху Элерс исходил из положения: Личность, у которой преобладает мотивация к успеху, предпочитает средний или низкий уровень риска. Ей свойственно избегать высокого риска. При сильной мотивации к успеху, надежды на успех обычно скромнее, чем при слабой мотивации к успеху, однако такие люди много работают для достижения успеха, стремятся к успеху.',
  instruction:
    'Вам предлагается ряд утверждений. Если Вы согласны с высказыванием, то отметье "Да", если не согласны - "Нет".',
  getValue: (value, fractionDigits = 0) => round((value * 100) / 30, fractionDigits),
  getResult: values => {
    const yes = [
      '2',
      '3',
      '4',
      '5',
      '7',
      '8',
      '9',
      '10',
      '14',
      '15',
      '16',
      '17',
      '21',
      '22',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '32',
      '37',
      '41',
    ]
    const no = ['6', '13', '18', '20', '24', '31', '36', '38', '39']
    const result =
      yes.reduce((acc, q) => acc + (values[q] === 'true' ? 1 : 0), 0) +
      no.reduce((acc, q) => acc + (values[q] === 'false' ? 1 : 0), 0)

    return {
      result,
      description: `
    Уровень мотивации к достижению успеха:
     ${
       result < 11
         ? 'Низкая мотивация к успеху'
         : result >= 11 && result <= 16
         ? 'Средний уровень мотивации'
         : result >= 17 && result <= 20
         ? 'Умеренно высокий уровень мотивации'
         : 'Слишком высокий уровень мотивации к успеху'
     }.

    Интерпретация результата:
    текст текст текст
    `,
    }
  },
  questions: [
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если между двумя вариантами есть выбор, его лучше сделать быстрее, чем откладывать на потом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если замечаю, что не могу на все 100% выполнить задание, я легко раздражаюсь.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Когда я работаю, это выглядит так, будто я ставлю на карту все.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если возникает проблемная ситуация, чаще всего я принимаю решение одним из последних.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если два дня подряд у меня нет дела, я теряю покой.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'В некоторые дни мои успехи ниже средних.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я более требователен к себе, чем к другим.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я доброжелательнее других.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label:
        'Если я отказываюсь от сложного задания, впоследствии сурово осуждаю себя, так как знаю, что в нем я добился бы успеха.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'В процессе работы я нуждаюсь в небольших паузах для отдыха.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Усердие — это не основная моя черта.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мои достижения в работе не всегда одинаковы.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Другая работа привлекает меня больше той, которой я занят.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Порицание стимулирует меня сильнее похвалы.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Знаю, что коллеги считают меня деловым человеком.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Преодоление препятствий способствует тому, что мои решения становятся более категоричными.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'На моем честолюбии легко сыграть.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если я работаю без вдохновения, это обычно заметно.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Выполняя работу, я не рассчитываю на помощь других.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Иногда я откладываю на завтра то, что должен сделать сегодня.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Нужно полагаться только на самого себя.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'В жизни немного вещей важнее денег.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если мне предстоит выполнить важное задание, я никогда не думаю ни о чем другом.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Я менее честолюбив, чем многие другие.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'В конце отпуска я обычно радуюсь, что скоро выйду на работу.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если я расположен к работе, делаю ее лучше и квалифицированнее, чем другие.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мне проще и легче общаться с людьми, способными упорно работать.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Когда у меня нет работы, мне не по себе.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Ответственную работу мне приходится выполнять чаще других.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если мне приходится принимать решение, стараюсь делать это как можно лучше.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Иногда друзья считают меня ленивым.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Мои успехи в какой-то мере зависят от коллег.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Противодействовать воле руководителя бессмысленно.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Иногда не знаешь, какую работу придется выполнять.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если у меня что-то не ладится, я становлюсь нетерпеливым.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Обычно я обращаю мало внимания на свои достижения.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если я работаю вместе с другими, моя работа более результативна, чем у других.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Не довожу до конца многое, за что берусь.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Завидую людям, не загруженным работой.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Не завидую тем, кто стремится к власти и положению.',
    },
    {
      type: 'boolean',
      validation: yup.boolean().required('Обязательно для заполнения').nullable(),
      label: 'Если я уверен, что стою на правильном пути, для доказательства своей правоты пойду на крайние меры.',
    },
  ],
}

export const ZamfirTest = {
  shortName: 'Мотивация профессиональной деятельности',
  color: '#d50c23',
  name: 'Мотивация профессиональной деятельности (методика К. Замфир в модификации А. А. Реана)',
  description:
    'Методика может применяться для диагностики мотивации профессиональной деятельности, в том числе мотивации профессиональнопедагогической деятельности. В основу положена концепция о внутренней и внешней мотивации. Напомним, что о внутренней мотивации следует говорить, когда для личности имеет значение деятельность сама по себе. Если же в основе мотивации профессиональной деятельности лежит стремление к удовлетворению иных потребностей, внешних по отношению к содержанию самой деятельности (мотивы социального престижа, зарплаты и т.д.), то в данном случае принято говорить о внешней мотивации. Сами внешние мотивы дифференцируются на внешние положительные и внешние отрицательные. Внешние положительные мотивы, несомненно, более эффективны и более желательны со всех точек зрения, чем внешние отрицательные мотивы',
  instruction:
    'Прочитайте нижеперечисленные мотивы профессиональной деятельности и дайте оценку их значимости для Вас по пятибалльной шкале:\n' +
    '1 балл – в очень незначительной мере;\n' +
    '2 балла – в незначительной мере;\n' +
    '3 балла – в не большой, но и не малой мере;\n' +
    '4 балла – в большой мере;\n' +
    '5 баллов – в очень большой мере.\n',
  getValue: (value, fractionDigits = 0) => {
    return {
      VM: round((value.VM * 100) / 5, fractionDigits),
      VPM: round((value.VPM * 100) / 5, fractionDigits),
      VOM: round((value.VOM * 100) / 5, fractionDigits),
    }
  },
  getResult: values => {
    const VM = (values['6'] + values['7']) / 2
    const VPM = (values['1'] + values['2'] + values['5']) / 3
    const VOM = (values['3'] + values['4']) / 2
    return {
      result: { VM, VPM, VOM },
      description: `
Показатель внутренней мотивации (ВМ) - ${VM}
Показатель внешней положительной мотивации (ВПМ) - ${VPM}
Показатель внешней отрицательной мотивации (ВОМ) - ${VOM}

ВМ ${getComparisonChar(VM, VPM)} ВПМ ${getComparisonChar(VPM, VOM)} ВОМ

Интерпретация результата:
текст текст текст
`,
    }
  },
  questionOptions: {
    defaultValue: 3,
    min: 1,
    max: 5,
    marks: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
    ],
  },
  questions: [
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Денежный заработок.',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Стремление к продвижению по службе.',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Стремление избежать критики со стороны руководителя или коллег.',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Стремление избежать возможных наказаний или неприятностей.',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Потребность в достижении социального престижа и уважения со стороны других.',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Удовлетворение от самого процесса и результата работы.',
    },
    {
      type: 'rating',
      validation: yup.number().required('Обязательно для заполнения').nullable(),
      label: 'Возможность наиболее полной самореализации именно в данной деятельности.',
    },
  ],
}

export const SurveysEnum = {
  elers2: Elers2Test,
  iljina: IljinaTest,
  elers: ElersTest,
  zamfir: ZamfirTest,
  shubert: ShubertTest,
}
