import { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import {
  alpha,
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CheckIcon from '@mui/icons-material/Check'

import useDialog from '../../utils/useDialog'

const ResolveComponent = {
  boolean: BooleanQuestion,
  radio: RadioQuestion,
  rating: RatingQuestion,
}

export default function Survey({ data, onSubmit }) {
  const [start, setStart] = useState(dayjs())

  useEffect(() => {
    setStart(dayjs())
  }, [data])

  const validationSchema = useMemo(() => {
    return Yup.object().shape(
      data.questions.reduce((schema, question, i) => ({ ...schema, [`${i + 1}`]: question.validation }), {})
    )
  }, [data.questions])

  const initialValues = useMemo(() => {
    return data.questions.reduce(
      (schema, question, i) => ({ ...schema, [`${i + 1}`]: data.questionOptions?.defaultValue ?? null }),
      {}
    )
  }, [data])

  const showResult = useDialog({
    component: ResultModal,
    props: ({ item: description, close }) => ({
      description,
      onReject: () => close(),
    }),
  })

  const { values, errors, touched, setFieldValue, handleSubmit, isSubmitting, dirty } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const { result, description } = data.getResult(values)
      const duration = dayjs().diff(start, 'seconds')

      return onSubmit({ duration, result }).then(() => {
        resetForm()
        setStart(dayjs())
        showResult(description)
      })
    },
  })

  return (
    <>
      <Typography variant="h5" sx={{ py: 1 }}>
        {data.name}
      </Typography>
      <Divider />
      <Typography variant="body2" sx={{ py: 1 }}>
        {data.description}
      </Typography>
      <Typography variant="body2" sx={{ py: 2, whiteSpace: 'pre-wrap' }}>
        {data.instruction}
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.questions.map(({ type, ...question }, i) => {
            const index = (i + 1).toString()
            const Component = ResolveComponent[type]
            return (
              <Component
                key={index}
                i={index}
                question={question}
                options={data.questionOptions}
                value={values[index]}
                onChange={v => setFieldValue(`${index}`, v)}
                error={touched[index] && errors[index] ? errors[index] : ''}
              />
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting || !dirty}>
            Узнать Результат
          </LoadingButton>
        </Box>
      </form>
    </>
  )
}

function BooleanQuestion({ i, question, value, onChange, error }) {
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel>{`${i}. ${question.label || ''}`}</FormLabel>
      <RadioGroup row value={value} onChange={(e, v) => onChange(v)} sx={{ pl: 2 }}>
        <FormControlLabel value={true} control={<Radio size="small" />} label="Да" />
        <FormControlLabel value={false} control={<Radio size="small" />} label="Нет" />
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

function RadioQuestion({ i, question, value, onChange, error }) {
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel>{`${i}. ${question.label || ''}`}</FormLabel>
      <RadioGroup row value={value} onChange={(e, v) => onChange(v)} sx={{ pl: 2 }}>
        {question.options.map(s => (
          <FormControlLabel key={s} value={s} control={<Radio size="small" />} label={s} />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

function RatingQuestion({ i, question, value, onChange, options, error }) {
  const { min, max, marks } = options
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel>{`${i}. ${question.label || ''}`}</FormLabel>
      <Slider
        value={value}
        onChange={(e, v) => onChange(v)}
        min={min}
        max={max}
        valueLabelDisplay="off"
        marks={marks}
        sx={{ ml: 2 }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

const ResultModal = ({ open, description, onReject }) => {
  return (
    <Dialog open={open} onClose={onReject} fullWidth maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Avatar
          sx={{ backgroundColor: theme => alpha(theme.palette.success.main, 0.08), color: 'success.main', mb: 2 }}
        >
          <CheckIcon fontSize="small" />
        </Avatar>
        <Typography variant="h5">Тест пройден</Typography>
        <Typography align="center" color="textSecondary" sx={{ mt: 1, whiteSpace: 'pre-wrap' }} variant="body2">
          {description}
        </Typography>
        <Button fullWidth size="large" variant="contained" component={Link} to="/" sx={{ mt: 4 }}>
          Вернуться на главную
        </Button>
      </Box>
    </Dialog>
  )
}
