'use client'

import '@/app/globals.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { api } from '@/services/api';
import { useContext, useEffect, useState } from 'react';
import { Header } from '@/app/Components/Header/Header';
import { Autocomplete, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateTimePicker } from '@mui/x-date-pickers';
import { getFormData } from './hooks/getFormData';
import {useRouter, useSearchParams} from 'next/navigation';
import { validate, validateDates } from './hooks/formValidation';
import { toast } from 'react-toastify';
import {LoadingContext} from "../../../contexts/LoadingContext";
import Loading from '../../Components/Loading/Loading';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export type User = {
    id: string;
    name: string;
    email: string;
}

export default function CreateEvent() {

  const searchParams = useSearchParams()
  const id = searchParams.get('id') ?? '';
  const router = useRouter();

  const { isLoading, setIsLoading }: any = useContext(LoadingContext);

  const [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<dayjs.Dayjs>();
  const [endDate, setEndDate] = useState<dayjs.Dayjs>();
  const [location, setLocation] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);

  const [users, setUsers] = useState<User[]>([]);


  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const [descriptionValidationMessage, setDescriptionValidationMessage] = useState("");
  const [locationValidationMessage, setLocationValidationMessage] = useState("");


  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    let dateValidationMessage = validateDates(event);
    if(dateValidationMessage.length > 0){
      toast.error(dateValidationMessage);
      setIsLoading(false);
      return;
    }

    const payload = getFormData(event, selectedParticipants);

    let formIsValid = validate(payload, {
      setNameValidationMessage,
      setDescriptionValidationMessage,
      setLocationValidationMessage,
      setShowError
    });
    
    if(!formIsValid){
      setIsLoading(false);
      return;
    }

    await api.post('Events/v1', payload)
        .then(response => {
           router.push('/events');
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);
    toast.success("Evento criado com sucesso!");
  };

  useEffect(() => {

    if(localStorage === undefined) return;

    setIsLoading(true);

    var loggedUser = JSON.parse(localStorage.getItem('user') ?? "");

    if(id !== '')
    {
        api.get(`Events/v1/`+id)
        .then(response => {
            fillForm(response.data);
        })
        .catch(() => {
            console.log('Erro');
        });
    }

    api.get('User/v1')
      .then(response => {
        let users = response.data?.filter((user : User) => user.id !== loggedUser.id)
        setUsers(users);
      })
      .catch(() => {
        console.log('Erro');
      });

    setIsLoading(false);
  }, []);

  const fillForm = (event) => {
    setEvent(event);

    setName(event.name);
    setDescription(event.description);
    setStartDate(dayjs(event.startDate));
    setEndDate(dayjs(event.endDate));
    setLocation(event.location);
    setGoogleMapsUrl(event.googleMapsUrl);
    setSelectedParticipants(event.participants);
  }

  return (
      <>
        {isLoading && <Loading/>}
        
        <Header/>

        <div className="flex flex-col items-center justify-center mt-5 text-black font-bold">
                <h1 className="text-2xl">{event?.isOwner != false ? 'Criar' : 'Visualizar'} Evento</h1>
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={event?.isOwner == false}
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
                                        error={showError && descriptionValidationMessage.length > 0}
                                        helperText={showError && descriptionValidationMessage.length > 0 ? descriptionValidationMessage : null}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        disabled={event?.isOwner == false}
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
                                            value={startDate}
                                            onChange={(value) => setStartDate(value)}
                                            disabled={event?.isOwner == false}
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
                                            value={endDate}
                                            onChange={(value) => setEndDate(value)}
                                            disabled={event?.isOwner == false}
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
                                    error={showError && locationValidationMessage.length > 0}
                                    helperText={showError && locationValidationMessage.length > 0 ? locationValidationMessage : null}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    disabled={event?.isOwner == false}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="googleMapsUrl"
                                    label="URL do Google Maps"
                                    id="googleMapsUrl"
                                    value={googleMapsUrl}
                                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                                    disabled={event?.isOwner == false}
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
                                    value={selectedParticipants}
                                    onChange={(_, value) => setSelectedParticipants(value)}
                                    disabled={event?.isOwner == false}
                                />
                            </Grid>
                        </Grid>

                        <div className='w-full flex flex-row gap-5 items-center justify-end'>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'black', width: '150px',
                                    backgroundColor: 'rgb(209 213 219)', ":hover": { backgroundColor: 'rgb(229 231 235)' }}}
                                className='bg-gray-300 hover:bg-gray-200'
                                href='/events'
                            >
                                {event?.isOwner != false ? 'Cancelar' : 'Voltar'}
                            </Button>
                            
                            {event?.isOwner != false &&
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: '150px' }}
                                >
                                    Salvar
                                </Button>
                            }
                        </div>
                    </Box>
                </div>
        </div>
      </>
  );
}
