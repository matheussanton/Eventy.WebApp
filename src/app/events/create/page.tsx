'use client'

import '@/app/globals.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import { Header } from '@/app/Components/Header/Header';
import { Autocomplete, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateTimePicker } from '@mui/x-date-pickers';
import { getFormData } from './hooks/getFormData';
import {useRouter} from 'next/navigation';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export type User = {
    id: string;
    name: string;
    email: string;
}

export default function CreateEvent() {

  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);

  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);

  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  const [passwordConfirmValidationMessage, setPasswordConfirmValidationMessage] = useState("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

     const payload = getFormData(event, selectedParticipants);
     console.log(payload);

    // let formIsValid = validate(payload, {
    //   setNameValidationMessage,
    //   setEmailValidationMessage,
    //   setPasswordValidationMessage,
    //   setPasswordConfirmValidationMessage,
    //   setShowError
    // });
    // if(!formIsValid){
    //   return;
    // }

    await api.post('Events/v1', payload)
        .then(response => {
           console.log(response.data);
           router.push('/events');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    api.get('User/v1')
      .then(response => {
        setUsers(response.data);
      })
      .catch(() => {
        console.log('Erro');
      });
  }, []);

  return (
      <>
        <Header/>

        <div className="flex flex-col items-center justify-center mt-5 text-black font-bold">
                <h1 className="text-2xl">Criar Evento</h1>
        </div>

        <div className="w-fill mt-3">
                <div className="flex flex-col justify-center items-center text-black">
                    <Box component="form" className='container ' onSubmit={async (e) => await handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid container item xs={12}>
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
                            </Grid>
                            <Grid container item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        rows={3}
                                        inputProps={{ maxLength: 5000 }}
                                        id="description"
                                        label="Descrição"
                                        name="description"
                                        autoComplete="description"
                                        autoFocus
                                        error={showError && nameValidationMessage.length > 0}
                                        helperText={showError && nameValidationMessage.length > 0 ? nameValidationMessage : null}
                                    />
                            </Grid>
                            <Grid container item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker 
                                            label="Data Inicial"
                                            name="startDate"
                                            slotProps={{
                                                textField: {
                                                    helperText: '',
                                                },
                                            }}
                                            ampm={false}
                                            minDate={dayjs()}
                                            timezone="America/Sao_Paulo"
                                            format="DD/MM/YYYY HH:mm"
                                            sx={{width: '100%'}}
                                        />
                                </LocalizationProvider>
                            </Grid>
                            <Grid container item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker 
                                            label="Data Final"
                                            name="endDate"
                                            slotProps={{
                                                textField: {
                                                    helperText: '',
                                                },
                                            }}
                                            ampm={false}
                                            minDate={dayjs()}
                                            timezone="America/Sao_Paulo"
                                            format="DD/MM/YYYY HH:mm"
                                            sx={{width: '100%'}}
                                        />
                                </LocalizationProvider>
                            </Grid>
                             <Grid container item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="location"
                                    label="Local"
                                    id="location"
                                    error={showError && passwordValidationMessage.length > 0}
                                    helperText={showError && passwordValidationMessage.length > 0 ? passwordValidationMessage : null}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="googleMapsUrl"
                                    label="URL do Google Maps"
                                    id="googleMapsUrl"
                                    error={showError && passwordValidationMessage.length > 0}
                                    helperText={showError && passwordValidationMessage.length > 0 ? passwordValidationMessage : null}
                                />
                            </Grid>
                             <Grid container item xs={12}>
                                <Autocomplete
                                    multiple
                                    fullWidth
                                    id="tags-outlined"
                                    options={users}
                                    getOptionLabel={(user) => `${user.name} (${user.email})`}
                                    filterSelectedOptions
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Participantes"
                                        placeholder="Selecione os participantes"
                                    />
                                    )}
                                    noOptionsText={users.length === 0 ? 'Nenhum usuário encontrado' : 'Todos usuários foram selecionados'}
                                    onChange={(_, value) => setSelectedParticipants(value)}
                                />
                            </Grid>
                        </Grid>

                        <div className='w-full flex flex-row gap-5 items-center justify-end'>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'black', width: '150px',
                                    backgroundColor: 'rgb(209 213 219)', ":hover": { backgroundColor: 'rgb(229 231 235)' }}}
                                className='bg-gray-300 hover:bg-gray-200'
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: '150px' }}
                            >
                                Salvar
                            </Button>
                        </div>
                    </Box>
                </div>
        </div>
      </>
  );
}
