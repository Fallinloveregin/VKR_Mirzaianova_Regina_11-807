import { useEffect, useState } from 'react'
import { Box, Button, Collapse, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SaveIcon from '@mui/icons-material/Save'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { mapStringToJS, mapJStoString } from './util'

const templatesInitialState = {
  elers: 1,
  elers2: 1,
  shubert: 1,
  iljina: {
    knowledge: 1,
    profession: 1,
    diploma: 1,
  },
  zamfir: {
    VOM: 1,
    VPM: 1,
    VM: 1,
  },
}

export default function RecommendationForm({ recommendation, open, setOpen, onSubmit }) {
  const [templates, updateTemplates] = useState(templatesInitialState)

  const [name, setName] = useState(recommendation?.name ?? '')
  const [value, setValue] = useState(recommendation?.value ? mapJStoString(recommendation?.value) : '')
  const [error, setError] = useState(false)
  const [result, setResult] = useState('')

  function onCancel() {
    setOpen(false)
    updateTemplates(templatesInitialState)
    setName('')
    setValue('')
    setError(false)
    setResult('')
  }

  function onSave() {
    onSubmit({ name, value: mapStringToJS(value) })
    onCancel()
  }

  useEffect(() => {
    try {
      const code = mapStringToJS(value)

      // eslint-disable-next-line no-new-func
      const test = new Function(
        'неудачи',
        'достижения',
        'риск',
        'знания',
        'профессия',
        'диплом',
        'вом',
        'впм',
        'вм',
        code
      )
      const result = test(
        templates.elers,
        templates.elers2,
        templates.shubert,
        templates.iljina.knowledge,
        templates.iljina.profession,
        templates.iljina.diploma,
        templates.zamfir.VOM,
        templates.zamfir.VPM,
        templates.zamfir.VM
      )
      setError(false)
      setResult(result)
    } catch (e) {
      setError(true)
    }
  }, [templates, value])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
      {!recommendation && (
        <Collapse in={!open}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => setOpen(true)} endIcon={<AddCircleOutlineIcon />}>
              Добавить рекомендацию
            </Button>
          </Box>
        </Collapse>
      )}
      <Collapse in={open}>
        <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'pre-line' }}>
          {`
           - Для создания рекомендации по заданным параметрам вам необходимо ввести формулу в виде:
          Если (показатель тестирования  >/</= число И/ИЛИ/НЕ название тестирования >/</= число) тогда "текст рекомендации"

           - Список переменных:
          1. достижения - количество мотивации достижения по тесту"Мотивация достижения" Т. Элерса
          2. неудачи - количество мотивации избегания неудачи по тесту"Мотивация достижения" Т. Элерса
          3. риск - количество готовности к риску теста "готовность к риску" А. М. Шуберта
          4.1 знания - количество показателя "приобретение знаний" в тесте “Мотивация обучения в вузе” Т. Ильиной
          4.2 профессия - количество показателя "овладение профессии" в тесте “Мотивация обучения в вузе” Т. Ильиной
          4.3 диплом - количество показателя "получение диплома" в тесте “Мотивация обучения в вузе” Т. Ильиной
          5.1 ВМ - количество внешней отрицательной мотивации по тесту «Мотивация профессиональной деятельности» (методика К. Замфир в модификации А. А.Реана)
          5.2 ВПМ - количество внешней положительной мотивации по тесту «Мотивация профессиональной деятельности» (методика К. Замфир в модификации А. А.Реана)
          5.3 ВОМ - количество внутренней мотивации по тесту «Мотивация профессиональной деятельности» (методика К. Замфир в модификации А. А.Реана)

           - Пример:
          Если вам нужно создать рекомендацию для студентов, у которых показатель мотивации достижения > 30 или показатель внешней отрицательной мотивации < 40 с текстом "Нужно найти цель в жизни"
          Тогда формула будет выглядеть так
          Если (достижения > 30 ИЛИ ВОМ < 40) тогда "Нужно найти цель в жизни"
          `}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 1, py: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="неудачи"
              value={templates.elers}
              onChange={e => updateTemplates(t => ({ ...t, elers: Number.parseFloat(e.target.value) }))}
              size="small"
              type="number"
            />
            <TextField
              fullWidth
              label="достижения"
              value={templates.elers2}
              onChange={e => updateTemplates(t => ({ ...t, elers2: Number.parseFloat(e.target.value) }))}
              size="small"
              type="number"
            />
            <TextField
              fullWidth
              label="риск"
              value={templates.shubert}
              onChange={e => updateTemplates(t => ({ ...t, shubert: Number.parseFloat(e.target.value) }))}
              size="small"
              type="number"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="знания"
              value={templates.iljina.knowledge}
              onChange={e =>
                updateTemplates(t => ({
                  ...t,
                  iljina: {
                    ...t.iljina,
                    knowledge: Number.parseFloat(e.target.value),
                  },
                }))
              }
              size="small"
              type="number"
            />
            <TextField
              fullWidth
              label="профессия"
              value={templates.iljina.profession}
              onChange={e =>
                updateTemplates(t => ({
                  ...t,
                  iljina: {
                    ...t.iljina,
                    profession: Number.parseFloat(e.target.value),
                  },
                }))
              }
              size="small"
              type="number"
            />
            <TextField
              fullWidth
              label="диплом"
              value={templates.iljina.diploma}
              onChange={e =>
                updateTemplates(t => ({
                  ...t,
                  iljina: {
                    ...t.iljina,
                    diploma: Number.parseFloat(e.target.value),
                  },
                }))
              }
              size="small"
              type="number"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="ВОМ"
              value={templates.zamfir.VOM}
              onChange={e =>
                updateTemplates(t => ({
                  ...t,
                  zamfir: {
                    ...t.zamfir,
                    VOM: Number.parseFloat(e.target.value),
                  },
                }))
              }
              size="small"
              type="number"
            />
            <TextField
              fullWidth
              label="ВПМ"
              value={templates.zamfir.VPM}
              onChange={e =>
                updateTemplates(t => ({
                  ...t,
                  zamfir: {
                    ...t.zamfir,
                    VPM: Number.parseFloat(e.target.value),
                  },
                }))
              }
              size="small"
              type="number"
            />
            <TextField
              fullWidth
              label="ВМ"
              value={templates.zamfir.VM}
              onChange={e =>
                updateTemplates(t => ({
                  ...t,
                  zamfir: {
                    ...t.zamfir,
                    VM: Number.parseFloat(e.target.value),
                  },
                }))
              }
              size="small"
              type="number"
            />
          </Box>
        </Box>
        <TextField
          size="small"
          label="Название"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          size="small"
          label="Формула"
          helperText={!error && result ? `Результат исполнения: ${result}` : ''}
          error={error}
          fullWidth
          value={value}
          onChange={e => setValue(e.target.value)}
          multiline
          minRows={3}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, pt: 1 }}>
          <Button onClick={onSave} disabled={!name || error || !value} endIcon={<SaveIcon />}>
            Сохранить
          </Button>
          <Button onClick={onCancel} endIcon={<HighlightOffIcon />}>
            Отменить
          </Button>
        </Box>
      </Collapse>
    </Box>
  )
}
