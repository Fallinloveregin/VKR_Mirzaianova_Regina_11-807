import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DatePicker } from '@mui/lab'
import { Box, Button, Divider, FormControl, FormHelperText, Link, TextField, Typography } from '@mui/material'

import AuthenticationBase from '../AuthenticationBase'
import Select from '../../../components/atoms/Select'
import InputControl from '../../../components/molecules/InputControl'

import styles from '../styles'

const validationSchema = Yup.object().shape({
  username: Yup.string().max(50).required('Обязательно для заполнения'),
  name: Yup.string().max(50).required('Обязательно для заполнения'),
  group: Yup.string().max(50).required('Обязательно для заполнения'),
  sex: Yup.string().max(1).required('Обязательно для заполнения'),
  birth: Yup.date().required('Обязательно для заполнения'),
  password: Yup.string().required('Обязательно для заполнения'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export default function Registration({ onSubmit, submitError = '' }) {
  const formikProps = useFormik({
    initialValues: {
      username: '',
      name: '',
      group: '',
      sex: '',
      birth: undefined,
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit,
  })

  const { setFieldValue, handleSubmit, isSubmitting, dirty } = formikProps

  return (
    <AuthenticationBase>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <Box sx={styles.header}>
        <Typography variant="h4">Регистрация</Typography>
      </Box>
      <Box sx={styles.form}>
        <form onSubmit={handleSubmit}>
          <InputControl field="username" formikProps={formikProps}>
            <TextField label="Введите логин" margin="normal" type="text" autoComplete="username" />
          </InputControl>
          <InputControl field="name" formikProps={formikProps}>
            <TextField label="Введите имя и фамилию" margin="normal" type="text" />
          </InputControl>
          <InputControl field="group" formikProps={formikProps}>
            <TextField label="Академическая группа" margin="normal" type="text" />
          </InputControl>
          <Box sx={{ display: 'inline-flex', alignItems: 'flex-start', width: '100%', gap: 1 }}>
            <FormControl fullWidth margin="normal">
              <DatePicker
                label="Дата рождения"
                value={formikProps.values.birth}
                onChange={newValue => setFieldValue('birth', newValue)}
                renderInput={params => <TextField {...params} />}
              />
            </FormControl>
            <InputControl field="sex" formikProps={formikProps}>
              <Select
                label="Пол"
                margin="normal"
                onChange={value => setFieldValue('sex', value)}
                options={[
                  { value: 'М', label: 'М' },
                  { value: 'Ж', label: 'Ж' },
                ]}
              />
            </InputControl>
          </Box>
          <InputControl field="password" formikProps={formikProps}>
            <TextField label="Введите пароль" margin="normal" type="password" autoComplete="new-password" />
          </InputControl>
          <InputControl field="passwordConfirm" formikProps={formikProps}>
            <TextField label="Введите пароль еще раз" margin="normal" type="password" autoComplete="new-password" />
          </InputControl>
          {submitError && (
            <Box sx={{ mt: 1 }}>
              <FormHelperText error data-testid="login-error">
                {submitError}
              </FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting || !dirty}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              data-testid="login-submit"
            >
              Создать
            </Button>
          </Box>
        </form>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Link color="textSecondary" variant="body2" component={RouterLink} to="/login">
        У меня уже есть аккаунт
      </Link>
    </AuthenticationBase>
  )
}
