'use client'

import './globals.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Copyright from './Components/Copyright/Copyright';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { useState } from 'react';

type LoginFormType = {
  email: string | null;
  password: string | null;
};


export default function SignIn() {

  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    var payload : LoginFormType = {
      email: data.get('email')?.toString() ?? "",
      password: data.get('password')?.toString() ?? "",
    }

    let formIsValid = validate(payload);
    if(!formIsValid){
      return;
    }

    await api.post('Authentication/v1/authenticate', payload)
        .then(response => {
          if(typeof window === 'undefined') return;
          
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify({name: response.data.name, email: response.data.email}));
      })
      .catch(e => {
        let data : any = e?.response?.data;
        let errorMessage = data[0]?.message ?? 'Erro';

        toast.error(errorMessage);
      });
  };

  const validateEmail = (email : any) : boolean => {

    if(!email || email.length == 0) {
      setEmailValidationMessage("Email é obrigatório");
      return false;
    }
    
    if(!email.includes('@')) {
      setEmailValidationMessage("Email inválido");
      return false;
    }

    setEmailValidationMessage("");
    return true;
  }

  const validatePassowrd = (password : any) : boolean => {
    
    if(!password || password.length == 0) {
      setPasswordValidationMessage("Senha é obrigatória");
      return false;
    }

    setPasswordValidationMessage("");
    return true;
  }

  const validate = (payload : LoginFormType) : boolean  => {

    var isEmailValid = validateEmail(payload?.email);
    var isPasswordValid = validatePassowrd(payload?.password);

    if(!isEmailValid || !isPasswordValid){
      setShowError(true);
      return false;
    };

    return true;
  }

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
              error={showError && emailValidationMessage.length > 0}
              helperText={showError && emailValidationMessage.length > 0 ? emailValidationMessage : null}
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
              error={showError && passwordValidationMessage.length > 0}
              helperText={showError && passwordValidationMessage.length > 0 ? passwordValidationMessage : null}
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
