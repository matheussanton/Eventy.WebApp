'use client'

import './globals.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Copyright from './Components/Copyright/Copyright';
import { api } from '@/services/api';

export default function SignIn() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    var payload = {
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log(payload);

    await api.post('Authentication/v1/authenticate', payload)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify({name: response.data.name, email: response.data.email}));
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
            Entrar
          </Typography>
          <Box component="form" onSubmit={async (e) => {await  handleSubmit(e)}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
  );
}
