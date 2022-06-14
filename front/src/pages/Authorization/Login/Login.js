import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Divider, FormHelperText, Link, TextField, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet-async'

import AuthenticationBase from '../AuthenticationBase'
import InputControl from '../../../components/molecules/InputControl'

import styles from '../styles'

const validationSchema = Yup.object().shape({
  username: Yup.string().max(50).required('Обязательно для заполнения'),
  password: Yup.string().required('Обязательно для заполнения'),
})

export default function Login({ onSubmit, submitError = '' }) {
  const formikProps = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => onSubmit({ username: values.username, password: values.password }),
  })

  const { handleSubmit, isSubmitting, dirty } = formikProps

  return (
    <AuthenticationBase>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <Box sx={styles.header}>
        <Typography variant="h4">Вход в систему</Typography>
      </Box>
      <Box sx={styles.form}>
        <form noValidate onSubmit={handleSubmit}>
          <InputControl field="username" formikProps={formikProps}>
            <TextField label="Введите логин" margin="normal" autoComplete="username" type="text" />
          </InputControl>
          <InputControl field="password" formikProps={formikProps}>
            <TextField label="Введите пароль" margin="normal" autoComplete="current-password" type="password" />
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
              Продолжить
            </Button>
          </Box>
        </form>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Link color="textSecondary" variant="body2" component={RouterLink} to="/registration">
        Создать новый аккаунт
      </Link>
    </AuthenticationBase>
  )
}

Login.propTypes = {
  /** Can display error under form */
  submitError: PropTypes.string,

  /** Called after the 'Log In' action */
  onSubmit: PropTypes.func.isRequired,
}
