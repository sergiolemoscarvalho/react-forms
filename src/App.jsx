import React, { Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Paper, Box, Grid, Container, TextField, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core'


import './App.css'

function App() {

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Informe seu nome completo'),
    username: Yup.string()
      .required('Informe seu nome de usuário')
      .min(6, 'O nome de usuário deve ter no mínimo 6 caracteres')
      .max(20, 'O nome de usuário não deve exceder 20 caracteres'),
    email: Yup.string()
      .required ('Informe seu e-mail')
      .email( 'Informe um e-mal válido'),
    password: Yup.string()
      .required ('Informe uma senha')
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(40, 'A senha não deve exceder 20 caracteres'),
    confirmPassword: Yup.string()
      .required('Confirme sua senha')
      .oneOf([Yup.ref('password'), null], 'As senhas não são iguais'),
      acceptTerms: Yup.bool().oneOf([true], 'É preciso aceitar os termos para dar continuidade')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors}
  } = useForm ({
    resolver: yupResolver (validationSchema)
  })
  
   const onSubmit = data => {
     console.log(JSON.stringify(data, null, 2))
   }
 

  return (
    <Fragment>
      <Container maxWidth="sm">
         <Paper variant='outline' elevation={12} className="padding-box">
        <Box px={10} py={2} mt={20}>
          <Typography variant='h6' align='center' margin='dense'>
            React Hook Form - Material UI - Validação
          </Typography>
          <Grid container spacing={1}>

           
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='fullname'
                name='fullname'
                label='Nome Completo'
                fullWidth
                margin='dense'
                {...register('fullname')}
                error={errors.fullname ? true : false}
                />
              <Typography variant='inherit' color='textSecondary'>
                {errors.fullname?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='username'
                label='Usuário'
                fullWidth
                margin='dense'
                {...register('username')}
                error={errors.username ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.username?.message}
              </Typography>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='email'
                name='email'
                label='E-mail'
                fullWidth
                margin='dense'
                {...register('email')}
                error={errors.email ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.email?.message}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='password'
                name='password'
                label='Senha'
                type='password'
                fullWidth
                margin='dense'
                {...register('password')}
                error={errors.password ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.password?.message}
              </Typography>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='confirmPassword'
                name='confirmPassword'
                label='Confirme a Senha'
                type='password'
                fullWidth
                margin='dense'
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.confirmPassword?.message}
              </Typography>

            </Grid>
           
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name='acceptTerms'
                    defaultValue='false'
                    inputRef={register()}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        color='primary'
                        onChange={ (e) => onChange(e.target.checked)}
                       
                        
                      />
                    )}
                    
                  />
                }
                label={
                  <Typography color={errors.acceptTerms ? 'error' : 'inherit'} >
                    Eu li e concordo com os termos.
                  </Typography>
                }
              />
              <br />
              <Typography variant='inherit' color='textSecondary'>
                {errors.acceptTerms ? '(' + errors.acceptTerms.message + ')' : ''}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit(onSubmit)}
            >
              Registro
            </Button>
          </Box>
        </Box>
      </Paper>
      </Container>

     
    </Fragment>
   
  )
}

export default App
