'use client'

import '../globals.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Copyright from '../Components/Copyright/Copyright';
import FloatingButton from '../Components/FloatingButton/FloatingButton';
import { api } from '@/services/api';

export default function SignIn() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let password = data.get('password');
    let passwordConfirm = data.get('passwordConfirm');
    if(password !== passwordConfirm) return alert('As senhas não coincidem!'); // TODO: Mudar para um snackbar ou toast do Material-UI

    var payload = {
      name: data.get('name'),
      email: data.get('email'),
      password: password,
      passwordConfirm: passwordConfirm,
    }

    console.log(payload);

    await api.post('User/v1', payload)
        .then(response => {
           console.log(response.data);
      })
      .catch(() => {
        console.log('Erro na autenticação');
      });
  };

  return (
      <div  className='flex flex-col justify-center items-center h-[100vh] w-[100vw] text-black'>
        <Box className="flex flex-col items-center justify-center m-4 md:w-[500px]">
          <Image src="/logo.svg" alt="Eventy Logo" width={216} height={48} />
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" onSubmit={async (e) => await handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirme sua senha"
              type="password"
              id="passwordConfirm"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        <FloatingButton path='/' text='Voltar ao Login' />
      </div>
  );
}
