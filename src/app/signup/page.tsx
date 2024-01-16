'use client'

import '../globals.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Copyright from '../Components/Copyright/Copyright';
import FloatingButton from '../Components/FloatingButton/FloatingButton';
import { api } from '@/services/api';
import { SignupFormType } from './types/SignupFormType';
import { useState } from 'react';
import { getFormData } from './hooks/getFormData';
import { validate } from './hooks/validation';
import { toast } from 'react-toastify';

export default function SignIn() {

  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  const [passwordConfirmValidationMessage, setPasswordConfirmValidationMessage] = useState("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = getFormData(event);
    let formIsValid = validate(payload, {
      setNameValidationMessage,
      setEmailValidationMessage,
      setPasswordValidationMessage,
      setPasswordConfirmValidationMessage,
      setShowError
    });
    if(!formIsValid){
      return;
    }

    await api.post('User/v1', payload)
        .then(response => {
          toast.success(response.data[0]?.message ?? 'Usuário cadastrado com sucesso!');
          return;
      })
      .catch((e) => {
        var responseData = e.response.data[0];
        var message = responseData?.message ?? 'Erro ao cadastrar usuário';
        toast.error(message);

        if(responseData.key == 'Email'){
          setEmailValidationMessage(message);
          setShowError(true);
        }
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
              error={showError && nameValidationMessage.length > 0}
              helperText={showError && nameValidationMessage.length > 0 ? nameValidationMessage : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirme sua senha"
              type="password"
              id="passwordConfirm"
              autoComplete="current-password"
              error={showError && passwordConfirmValidationMessage.length > 0}
              helperText={showError && passwordConfirmValidationMessage.length > 0 ? passwordConfirmValidationMessage : null}
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
